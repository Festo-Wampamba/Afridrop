'use server';

import { db } from '@/db';
import { technicianReports } from '@/db/schema/reports';
import { users } from '@/db/schema/auth';
import { quotations } from '@/db/schema/quotations';
import { alias } from 'drizzle-orm/pg-core';
import { and, desc, eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const techUsers = alias(users, 'tech_users');
const revUsers = alias(users, 'rev_users');

export async function getTeamReports() {
  await requireRole(['manager', 'director', 'super_admin']);

  return db
    .select({
      id: technicianReports.id,
      title: technicianReports.title,
      content: technicianReports.content,
      undoneItems: technicianReports.undoneItems,
      status: technicianReports.status,
      submittedAt: technicianReports.submittedAt,
      reviewedAt: technicianReports.reviewedAt,
      reviewNote: technicianReports.reviewNote,
      jobId: technicianReports.jobId,
      techFirstName: techUsers.firstName,
      techLastName: techUsers.lastName,
      jobQuotationNumber: quotations.quotationNumber,
      jobCustomerName: quotations.customerName,
      reviewerFirstName: revUsers.firstName,
      reviewerLastName: revUsers.lastName,
    })
    .from(technicianReports)
    .leftJoin(techUsers, eq(technicianReports.technicianId, techUsers.id))
    .leftJoin(quotations, eq(technicianReports.jobId, quotations.id))
    .leftJoin(revUsers, eq(technicianReports.reviewedBy, revUsers.id))
    .where(inArray(technicianReports.status as any, ['submitted', 'reviewed']))
    .orderBy(desc(technicianReports.submittedAt));
}

export async function markReportReviewed(formData: FormData) {
  const session = await requireRole(['manager', 'director', 'super_admin']);

  const reportId = (formData.get('reportId') as string)?.trim();
  if (!reportId || !UUID_RE.test(reportId)) throw new Error('Invalid report id');

  const reviewNote = ((formData.get('reviewNote') as string) ?? '').trim().slice(0, 1000) || null;

  const updated = await db
    .update(technicianReports)
    .set({
      status: 'reviewed',
      reviewedBy: session.user.id,
      reviewedAt: new Date(),
      reviewNote,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(technicianReports.id, reportId),
        eq(technicianReports.status, 'submitted'),
      ),
    )
    .returning({ id: technicianReports.id });

  if (updated.length === 0) {
    throw new Error('Report is not awaiting review');
  }

  revalidatePath('/manager/reports');
}
