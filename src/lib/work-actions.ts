'use server';

import { db } from '@/db';
import { quotations } from '@/db/schema/quotations';
import { clients } from '@/db/schema/clients';
import { messages } from '@/db/schema/messages';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';
import { scopedCustomerIds, JOB_STATUSES, type JobStatus } from '@/lib/work';

const WORK_ROLES = ['manager', 'super_admin'];

function revalidate(formData: FormData) {
  const path = (formData.get('_path') as string) || '/manager';
  revalidatePath(path);
}

// Ensure a manager only touches jobs belonging to their assigned clients.
// Admin/super_admin pass through (scope === null).
async function assertJobInScope(
  session: Awaited<ReturnType<typeof requireRole>>,
  jobCustomerId: string | null,
) {
  const scope = await scopedCustomerIds(session);
  if (scope === null) return;
  if (!jobCustomerId || !scope.includes(jobCustomerId)) {
    throw new Error('Forbidden: job outside your client scope');
  }
}

async function loadJob(jobId: string) {
  const job = await db.query.quotations.findFirst({ where: eq(quotations.id, jobId) });
  if (!job) throw new Error('Job not found');
  return job;
}

export async function assignAttendant(formData: FormData) {
  const session = await requireRole(WORK_ROLES);
  const jobId = formData.get('jobId') as string;
  const attendantId = (formData.get('attendantId') as string) || null;

  const job = await loadJob(jobId);
  await assertJobInScope(session, job.customerId);

  await db
    .update(quotations)
    .set({
      assignedTo: attendantId,
      // Assigning advances an untouched job to "assigned"; unassigning resets.
      status: attendantId ? (job.status === 'pending' ? 'assigned' : job.status) : 'pending',
      updatedAt: new Date(),
    })
    .where(eq(quotations.id, jobId));

  revalidate(formData);
}

export async function setJobStatus(formData: FormData) {
  const session = await requireRole(WORK_ROLES);
  const jobId = formData.get('jobId') as string;
  const status = formData.get('status') as JobStatus;
  if (!JOB_STATUSES.includes(status)) throw new Error('Invalid status');

  const job = await loadJob(jobId);
  await assertJobInScope(session, job.customerId);

  await db.update(quotations).set({ status, updatedAt: new Date() }).where(eq(quotations.id, jobId));
  revalidate(formData);
}

// Manager/admin sign-off that completed work is verified.
export async function verifyJob(formData: FormData) {
  const session = await requireRole(WORK_ROLES);
  const jobId = formData.get('jobId') as string;

  const job = await loadJob(jobId);
  await assertJobInScope(session, job.customerId);

  await db.update(quotations).set({ status: 'verified', updatedAt: new Date() }).where(eq(quotations.id, jobId));
  revalidate(formData);
}

export async function updateClientStatus(formData: FormData) {
  const session = await requireRole(WORK_ROLES);
  const clientId = formData.get('clientId') as string;
  const status = formData.get('status') as string;

  // Managers may only update clients assigned to them.
  const scope = await scopedCustomerIds(session);
  const where =
    scope === null
      ? eq(clients.id, clientId)
      : and(eq(clients.id, clientId), eq(clients.assignedManagerId, session.user.id));

  await db.update(clients).set({ status, updatedAt: new Date() }).where(where);
  revalidate(formData);
}

// Staff → client message (outbound). Scope-checked for managers.
export async function sendStaffMessage(formData: FormData) {
  const session = await requireRole(WORK_ROLES);
  const userId = formData.get('userId') as string;
  const content = (formData.get('content') as string)?.trim();
  const subject = ((formData.get('subject') as string) || 'Message from Afridrop').trim();
  if (!content) return;

  const scope = await scopedCustomerIds(session);
  if (scope !== null && !scope.includes(userId)) {
    throw new Error('Forbidden: recipient outside your client scope');
  }

  await db.insert(messages).values({
    userId,
    subject,
    content,
    direction: 'outbound',
    isRead: false,
    status: 'sent',
  });

  revalidate(formData);
}
