'use server';

import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { quotations } from '@/db/schema/quotations';
import { payments } from '@/db/schema/payments';
import { orders } from '@/db/schema/orders';
import { users } from '@/db/schema/auth';
import { count, eq, inArray, isNull, sum, and, desc, gte, sql } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';

// ── Company Overview ───────────────────────────────────────────────────────
export async function getCompanyOverview() {
  await requireRole(['director', 'super_admin']);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const [
    revenueRow,
    monthlyRevenue,
    jobsByStatus,
    [ordersRow],
    clientsByStatus,
  ] = await Promise.all([
    // Total revenue from completed payments
    db
      .select({ total: sum(payments.amount) })
      .from(payments)
      .where(eq(payments.status, 'completed'))
      .then((rows) => rows[0]),

    // Monthly revenue last 6 months
    db
      .select({
        month: sql<string>`to_char(${payments.createdAt}, 'Mon YYYY')`,
        monthSort: sql<string>`to_char(${payments.createdAt}, 'YYYY-MM')`,
        total: sum(payments.amount),
      })
      .from(payments)
      .where(and(eq(payments.status, 'completed'), gte(payments.createdAt, sixMonthsAgo)))
      .groupBy(
        sql`to_char(${payments.createdAt}, 'Mon YYYY')`,
        sql`to_char(${payments.createdAt}, 'YYYY-MM')`,
      )
      .orderBy(sql`to_char(${payments.createdAt}, 'YYYY-MM')`),

    // Active jobs count by status (job lifecycle statuses)
    db
      .select({ status: quotations.status, value: count() })
      .from(quotations)
      .where(
        and(
          isNull(quotations.deletedAt),
          inArray(quotations.status as any, [
            'pending', 'assigned', 'in_progress', 'completed', 'verified', 'cancelled',
          ]),
        ),
      )
      .groupBy(quotations.status),

    // Total orders
    db.select({ value: count() }).from(orders).where(isNull(orders.deletedAt)),

    // Clients grouped by status
    db
      .select({ status: clients.status, value: count() })
      .from(clients)
      .where(isNull(clients.deletedAt))
      .groupBy(clients.status),
  ]);

  return {
    totalRevenue: Number(revenueRow?.total ?? 0),
    monthlyRevenue: monthlyRevenue.map((r) => ({
      month: r.month,
      total: Number(r.total ?? 0),
    })),
    jobsByStatus: jobsByStatus.map((r) => ({
      status: r.status ?? 'unknown',
      count: Number(r.value),
    })),
    totalOrders: Number(ordersRow.value),
    clientsByStatus: clientsByStatus.map((r) => ({
      status: r.status,
      count: Number(r.value),
    })),
  };
}

// ── Department Performance ─────────────────────────────────────────────────
export async function getDepartmentPerformance() {
  await requireRole(['director', 'super_admin']);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const [technicianJobs, conversionRows, ordersPerMonth] = await Promise.all([
    // Per-technician completed job counts
    db
      .select({
        technicianId: quotations.assignedTo,
        firstName: users.firstName,
        lastName: users.lastName,
        completedCount: count(),
      })
      .from(quotations)
      .innerJoin(users, eq(quotations.assignedTo, users.id))
      .where(
        and(
          isNull(quotations.deletedAt),
          inArray(quotations.status as any, ['completed', 'verified']),
        ),
      )
      .groupBy(quotations.assignedTo, users.firstName, users.lastName),

    // Quotation conversion rate: approved+converted vs total
    db
      .select({ status: quotations.status, value: count() })
      .from(quotations)
      .where(isNull(quotations.deletedAt))
      .groupBy(quotations.status),

    // Orders per month last 6 months
    db
      .select({
        month: sql<string>`to_char(${orders.createdAt}, 'Mon YYYY')`,
        monthSort: sql<string>`to_char(${orders.createdAt}, 'YYYY-MM')`,
        value: count(),
      })
      .from(orders)
      .where(and(isNull(orders.deletedAt), gte(orders.createdAt, sixMonthsAgo)))
      .groupBy(
        sql`to_char(${orders.createdAt}, 'Mon YYYY')`,
        sql`to_char(${orders.createdAt}, 'YYYY-MM')`,
      )
      .orderBy(sql`to_char(${orders.createdAt}, 'YYYY-MM')`),
  ]);

  const totalQuotations = conversionRows.reduce((sum, r) => sum + Number(r.value), 0);
  const converted = conversionRows
    .filter((r) => r.status === 'approved' || r.status === 'converted')
    .reduce((sum, r) => sum + Number(r.value), 0);
  const conversionRate = totalQuotations > 0 ? Math.round((converted / totalQuotations) * 100) : 0;

  return {
    technicianPerformance: technicianJobs.map((r) => ({
      technicianId: r.technicianId,
      name: `${r.firstName} ${r.lastName}`.trim(),
      completedJobs: Number(r.completedCount),
    })),
    conversionRate,
    totalQuotations,
    converted,
    ordersPerMonth: ordersPerMonth.map((r) => ({
      month: r.month,
      count: Number(r.value),
    })),
  };
}

// ── Pending Approvals ──────────────────────────────────────────────────────
export async function getPendingApprovals() {
  await requireRole(['director', 'super_admin']);

  const rows = await db
    .select({
      id: quotations.id,
      quotationNumber: quotations.quotationNumber,
      customerName: quotations.customerName,
      projectDescription: quotations.projectDescription,
      location: quotations.location,
      totalAmount: quotations.totalAmount,
      status: quotations.status,
      createdAt: quotations.createdAt,
    })
    .from(quotations)
    .where(
      and(
        isNull(quotations.deletedAt),
        inArray(quotations.status as any, ['pending', 'reviewed']),
      ),
    )
    .orderBy(desc(quotations.createdAt));

  return rows.map((r) => ({
    ...r,
    totalAmount: r.totalAmount ? Number(r.totalAmount) : null,
  }));
}
