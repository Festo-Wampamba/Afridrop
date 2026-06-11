'use server';

import { db } from '@/db';
import { payments } from '@/db/schema/payments';
import { orders } from '@/db/schema/orders';
import { quotations } from '@/db/schema/quotations';
import { users } from '@/db/schema/auth';
import { clients } from '@/db/schema/clients';
import { count, eq, inArray, isNull, sum, and, desc, gte, sql } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';

const PAGE_SIZE = 25;

// First-of-current-month midnight in Africa/Kampala (EAT, UTC+3).
function eatMonthStart(): Date {
  const nowEAT = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Kampala' }).format(new Date());
  // nowEAT is "YYYY-MM-DD"; replace day with "01"
  const [year, month] = nowEAT.split('-');
  return new Date(`${year}-${month}-01T00:00:00+03:00`);
}

// ── Cash Position ─────────────────────────────────────────────────────────
export async function getCashPosition() {
  await requireRole(['accountant', 'super_admin', 'director']);

  const monthStart = eatMonthStart();

  const [
    collectedThisMonthRow,
    collectedAllTimeRow,
    pendingRow,
    byMethodRows,
    monthlyRows,
  ] = await Promise.all([
    // Collected this month (completed payments since EAT month start)
    db
      .select({ total: sum(payments.amount) })
      .from(payments)
      .where(and(eq(payments.status, 'completed'), gte(payments.createdAt, monthStart)))
      .then((rows) => rows[0]),

    // All-time collected
    db
      .select({ total: sum(payments.amount) })
      .from(payments)
      .where(eq(payments.status, 'completed'))
      .then((rows) => rows[0]),

    // Pending payments: sum + count
    db
      .select({ total: sum(payments.amount), qty: count() })
      .from(payments)
      .where(eq(payments.status, 'pending'))
      .then((rows) => rows[0]),

    // Breakdown by payment method (completed only)
    db
      .select({ method: payments.paymentMethod, total: sum(payments.amount) })
      .from(payments)
      .where(eq(payments.status, 'completed'))
      .groupBy(payments.paymentMethod),

    // Monthly collected last 6 months
    db
      .select({
        month: sql<string>`to_char(${payments.createdAt}, 'Mon YYYY')`,
        monthSort: sql<string>`to_char(${payments.createdAt}, 'YYYY-MM')`,
        total: sum(payments.amount),
      })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'completed'),
          gte(
            payments.createdAt,
            (() => {
              const d = new Date();
              d.setMonth(d.getMonth() - 5);
              d.setDate(1);
              d.setHours(0, 0, 0, 0);
              return d;
            })(),
          ),
        ),
      )
      .groupBy(
        sql`to_char(${payments.createdAt}, 'Mon YYYY')`,
        sql`to_char(${payments.createdAt}, 'YYYY-MM')`,
      )
      .orderBy(sql`to_char(${payments.createdAt}, 'YYYY-MM')`),
  ]);

  return {
    collectedThisMonth: Number(collectedThisMonthRow?.total ?? 0),
    collectedAllTime: Number(collectedAllTimeRow?.total ?? 0),
    pendingTotal: Number(pendingRow?.total ?? 0),
    pendingCount: Number(pendingRow?.qty ?? 0),
    byMethod: byMethodRows.map((r) => ({
      method: r.method,
      total: Number(r.total ?? 0),
    })),
    monthlyCollected: monthlyRows.map((r) => ({
      month: r.month,
      total: Number(r.total ?? 0),
    })),
  };
}

const VALID_STATUSES = ['pending', 'completed', 'failed', 'refunded'] as const;
const VALID_METHODS = ['flutterwave_mobile', 'flutterwave_card', 'bank_transfer', 'cash'] as const;

type PaymentFilters = { status?: string; method?: string };

// ── Payments (paginated) ──────────────────────────────────────────────────
export async function getPayments(page: number, filters: PaymentFilters = {}) {
  await requireRole(['accountant', 'super_admin', 'director']);

  // Validate filter values against allow-lists; ignore invalid values
  const statusFilter = VALID_STATUSES.includes(filters.status as (typeof VALID_STATUSES)[number])
    ? (filters.status as (typeof VALID_STATUSES)[number])
    : undefined;
  const methodFilter = VALID_METHODS.includes(filters.method as (typeof VALID_METHODS)[number])
    ? (filters.method as (typeof VALID_METHODS)[number])
    : undefined;

  const whereConditions = and(
    statusFilter ? eq(payments.status, statusFilter) : undefined,
    methodFilter ? eq(payments.paymentMethod, methodFilter) : undefined,
  );

  // Compute totalPages from count first, then clamp page at both ends
  const countRow = await db
    .select({ value: count() })
    .from(payments)
    .where(whereConditions)
    .then((r) => r[0]);

  const totalPages = Math.max(1, Math.ceil(Number(countRow.value) / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const offset = (safePage - 1) * PAGE_SIZE;

  const rows = await db
    .select({
      id: payments.id,
      amount: payments.amount,
      status: payments.status,
      paymentMethod: payments.paymentMethod,
      transactionId: payments.transactionId,
      createdAt: payments.createdAt,
      // Customer via payments.userId → users
      customerName: users.name,
      customerEmail: users.email,
      // Order reference
      orderNumber: orders.orderNumber,
    })
    .from(payments)
    .where(whereConditions)
    .leftJoin(users, eq(payments.userId, users.id))
    .leftJoin(orders, eq(payments.orderId, orders.id))
    .orderBy(desc(payments.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  return {
    total: Number(countRow.value),
    totalPages,
    page: safePage,
    rows: rows.map((r) => ({
      ...r,
      amount: Number(r.amount),
    })),
  };
}

// ── Receivables ───────────────────────────────────────────────────────────
export async function getReceivables() {
  await requireRole(['accountant', 'super_admin', 'director']);

  const [pendingOrders, receivableQuotations] = await Promise.all([
    // Orders where payment is still pending
    db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        customerName: orders.customerName,
        customerEmail: orders.customerEmail,
        total: orders.total,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(and(isNull(orders.deletedAt), eq(orders.paymentStatus, 'pending')))
      .orderBy(desc(orders.createdAt)),

    // Approved / converted quotations as receivable candidates
    db
      .select({
        id: quotations.id,
        quotationNumber: quotations.quotationNumber,
        customerName: quotations.customerName,
        customerEmail: quotations.customerEmail,
        totalAmount: quotations.totalAmount,
        status: quotations.status,
        createdAt: quotations.createdAt,
      })
      .from(quotations)
      .where(
        and(
          isNull(quotations.deletedAt),
          inArray(quotations.status as any, ['approved', 'converted']),
        ),
      )
      .orderBy(desc(quotations.createdAt)),
  ]);

  return {
    pendingOrders: pendingOrders.map((r) => ({
      ...r,
      total: Number(r.total),
    })),
    receivableQuotations: receivableQuotations.map((r) => ({
      ...r,
      totalAmount: r.totalAmount ? Number(r.totalAmount) : null,
    })),
  };
}

// ── Client List (read-only) ───────────────────────────────────────────────
export async function getClientListReadonly() {
  await requireRole(['accountant', 'super_admin', 'director']);

  return db
    .select({
      id: clients.id,
      name: clients.name,
      email: clients.email,
      phone: clients.phone,
      city: clients.city,
      status: clients.status,
    })
    .from(clients)
    .where(isNull(clients.deletedAt))
    .orderBy(clients.name);
}

// ── Job Status Summary ────────────────────────────────────────────────────
export async function getJobStatusSummary() {
  await requireRole(['accountant', 'super_admin', 'director']);

  const JOB_STATUSES = ['assigned', 'in_progress', 'completed', 'verified'] as const;

  const rows = await db
    .select({ status: quotations.status, value: count() })
    .from(quotations)
    .where(
      and(
        isNull(quotations.deletedAt),
        inArray(quotations.status as any, [...JOB_STATUSES]),
      ),
    )
    .groupBy(quotations.status);

  const byStatus: Record<string, number> = {};
  for (const r of rows) {
    byStatus[r.status ?? ''] = Number(r.value);
  }

  return JOB_STATUSES.map((s) => ({ status: s, count: byStatus[s] ?? 0 }));
}
