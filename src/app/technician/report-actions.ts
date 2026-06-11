'use server';

import { db } from '@/db';
import { technicianReports } from '@/db/schema/reports';
import { quotations } from '@/db/schema/quotations';
import { and, desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getMyReports() {
  const session = await requireRole(['technician']);
  return db
    .select()
    .from(technicianReports)
    .where(eq(technicianReports.technicianId, session.user.id))
    .orderBy(desc(technicianReports.createdAt));
}

export async function createReport(formData: FormData) {
  const session = await requireRole(['technician']);

  const title = (formData.get('title') as string)?.trim();
  const content = (formData.get('content') as string)?.trim();
  const undoneItems = (formData.get('undoneItems') as string)?.trim() || null;
  const jobIdRaw = (formData.get('jobId') as string)?.trim() || null;

  if (!title) throw new Error('Title is required');
  if (!content) throw new Error('Content is required');

  let jobId: string | null = null;
  if (jobIdRaw) {
    if (!UUID_RE.test(jobIdRaw)) throw new Error('Invalid job id');
    // Verify the job is assigned to this technician.
    const job = await db.query.quotations.findFirst({
      where: and(eq(quotations.id, jobIdRaw), eq(quotations.assignedTo, session.user.id)),
      columns: { id: true },
    });
    if (!job) throw new Error('Job not found or not assigned to you');
    jobId = jobIdRaw;
  }

  await db.insert(technicianReports).values({
    technicianId: session.user.id,
    jobId,
    title,
    content,
    undoneItems,
    status: 'draft',
  });

  revalidatePath('/technician/reports');
}

export async function updateReport(formData: FormData) {
  const session = await requireRole(['technician']);

  const reportId = (formData.get('reportId') as string)?.trim();
  const title = (formData.get('title') as string)?.trim();
  const content = (formData.get('content') as string)?.trim();
  const undoneItems = (formData.get('undoneItems') as string)?.trim() || null;

  if (!reportId || !UUID_RE.test(reportId)) throw new Error('Invalid report id');
  if (!title) throw new Error('Title is required');
  if (!content) throw new Error('Content is required');

  const updated = await db
    .update(technicianReports)
    .set({ title, content, undoneItems, updatedAt: new Date() })
    .where(
      and(
        eq(technicianReports.id, reportId),
        eq(technicianReports.technicianId, session.user.id),
        eq(technicianReports.status, 'draft'),
      ),
    )
    .returning({ id: technicianReports.id });

  if (updated.length === 0) {
    throw new Error('Report not found, not yours, or no longer a draft');
  }

  revalidatePath('/technician/reports');
}

export async function submitReport(formData: FormData) {
  const session = await requireRole(['technician']);

  const reportId = (formData.get('reportId') as string)?.trim();
  if (!reportId || !UUID_RE.test(reportId)) throw new Error('Invalid report id');

  const updated = await db
    .update(technicianReports)
    .set({ status: 'submitted', submittedAt: new Date(), updatedAt: new Date() })
    .where(
      and(
        eq(technicianReports.id, reportId),
        eq(technicianReports.technicianId, session.user.id),
        eq(technicianReports.status, 'draft'),
      ),
    )
    .returning({ id: technicianReports.id });

  if (updated.length === 0) {
    throw new Error('Report not found, not yours, or already submitted');
  }

  revalidatePath('/technician/reports');
}
