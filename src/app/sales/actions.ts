'use server';

import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { quotations } from '@/db/schema/quotations';
import { payments } from '@/db/schema/payments';
import { count, eq, inArray, isNull, sum, and, desc, gte, sql } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';

const APPROVAL_STATUSES = ['pending', 'reviewed', 'approved', 'rejected', 'converted'] as const;

// ── Sales Overview ──────────────────────────────────────────────────────────
export async function getSalesOverview() {
  await requireRole(['sales_manager', 'super_admin', 'director']);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const [pipelineCounts, leadsRow, monthlyRevenue] = await Promise.all([
    // Pipeline counts for approval statuses only
    db
      .select({ status: quotations.status, value: count() })
      .from(quotations)
      .where(
        and(
          isNull(quotations.deletedAt),
          inArray(quotations.status as any, [...APPROVAL_STATUSES]),
        ),
      )
      .groupBy(quotations.status),

    // Leads count
    db
      .select({ value: count() })
      .from(clients)
      .where(and(isNull(clients.deletedAt), eq(clients.status, 'lead')))
      .then((rows) => rows[0]),

    // Monthly revenue last 6 months (read-only)
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
  ]);

  // Build pipeline map
  const byStatus: Record<string, number> = {};
  for (const r of pipelineCounts) {
    byStatus[r.status ?? ''] = Number(r.value);
  }

  const pending = byStatus['pending'] ?? 0;
  const reviewed = byStatus['reviewed'] ?? 0;
  const approved = byStatus['approved'] ?? 0;
  const rejected = byStatus['rejected'] ?? 0;
  const converted = byStatus['converted'] ?? 0;
  const total = pending + reviewed + approved + rejected + converted;
  // Denominator: approval-workflow statuses only — intentionally excludes job-lifecycle rows (director reports use all quotations)
  const conversionRate = total > 0 ? Math.round(((approved + converted) / total) * 100) : 0;

  return {
    pipeline: { pending, reviewed, approved, rejected, converted },
    conversionRate,
    totalPipelineQuotations: total,
    leadsCount: Number(leadsRow?.value ?? 0),
    monthlyRevenue: monthlyRevenue.map((r) => ({
      month: r.month,
      total: Number(r.total ?? 0),
    })),
  };
}

// ── Leads ───────────────────────────────────────────────────────────────────
export async function getLeads() {
  await requireRole(['sales_manager', 'super_admin', 'director']);

  const rows = await db
    .select({
      id: clients.id,
      name: clients.name,
      email: clients.email,
      phone: clients.phone,
      city: clients.city,
      createdAt: clients.createdAt,
    })
    .from(clients)
    .where(and(isNull(clients.deletedAt), eq(clients.status, 'lead')))
    .orderBy(desc(clients.createdAt));

  return rows;
}

// ── Recent Quotations ────────────────────────────────────────────────────────
export async function getRecentQuotations() {
  await requireRole(['sales_manager', 'super_admin', 'director']);

  const rows = await db
    .select({
      id: quotations.id,
      quotationNumber: quotations.quotationNumber,
      customerName: quotations.customerName,
      status: quotations.status,
      totalAmount: quotations.totalAmount,
      createdAt: quotations.createdAt,
    })
    .from(quotations)
    .where(and(isNull(quotations.deletedAt), inArray(quotations.status as any, [...APPROVAL_STATUSES])))
    .orderBy(desc(quotations.createdAt))
    .limit(10);

  return rows.map((r) => ({
    ...r,
    totalAmount: r.totalAmount ? Number(r.totalAmount) : null,
  }));
}
