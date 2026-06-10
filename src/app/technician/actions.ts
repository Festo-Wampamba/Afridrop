'use server';

import { db } from '@/db';
import { quotations } from '@/db/schema/quotations';
import { clients } from '@/db/schema/clients';
import { and, asc, eq, gte, inArray, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Safe columns — NO money columns (no totalAmount, no estimatedBudget).
const SAFE_COLS = {
  id: quotations.id,
  quotationNumber: quotations.quotationNumber,
  customerName: quotations.customerName,
  projectDescription: quotations.projectDescription,
  location: quotations.location,
  status: quotations.status,
  createdAt: quotations.createdAt,
  updatedAt: quotations.updatedAt,
  // Client contact info (from LEFT JOIN)
  clientPhone: clients.phone,
  clientAddress: clients.address,
  clientCity: clients.city,
};

// Active work queue: assigned or in-progress jobs for this technician, oldest first.
export async function getMyJobs() {
  const session = await requireRole(['technician']);

  return db
    .select(SAFE_COLS)
    .from(quotations)
    .leftJoin(clients, eq(quotations.customerId, clients.userId))
    .where(
      and(
        eq(quotations.assignedTo, session.user.id),
        inArray(quotations.status as any, ['assigned', 'in_progress']),
        isNull(quotations.deletedAt),
      ),
    )
    .orderBy(asc(quotations.createdAt));
}

// Jobs completed or verified by this technician today.
export async function getMyCompletedToday() {
  const session = await requireRole(['technician']);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return db
    .select(SAFE_COLS)
    .from(quotations)
    .leftJoin(clients, eq(quotations.customerId, clients.userId))
    .where(
      and(
        eq(quotations.assignedTo, session.user.id),
        inArray(quotations.status as any, ['completed', 'verified']),
        gte(quotations.updatedAt, todayStart),
        isNull(quotations.deletedAt),
      ),
    )
    .orderBy(asc(quotations.updatedAt));
}

// Allowed transitions for technicians only.
const ALLOWED_TRANSITIONS: Record<string, string> = {
  assigned: 'in_progress',
  in_progress: 'completed',
};

// Advance a job's status. Only the assigned technician can move their own jobs.
export async function updateMyJobStatus(formData: FormData) {
  const session = await requireRole(['technician']);

  const jobId = formData.get('jobId') as string;
  const currentStatus = formData.get('currentStatus') as string;

  if (!jobId || !UUID_RE.test(jobId)) throw new Error('Invalid job id');

  const nextStatus = ALLOWED_TRANSITIONS[currentStatus];
  if (!nextStatus) throw new Error('Transition not allowed');

  const updated = await db
    .update(quotations)
    .set({ status: nextStatus, updatedAt: new Date() })
    .where(
      and(
        eq(quotations.id, jobId),
        eq(quotations.assignedTo, session.user.id),
        eq(quotations.status as any, currentStatus),
      ),
    )
    .returning({ id: quotations.id });

  if (updated.length === 0) {
    throw new Error('Job not found or status has changed — please refresh.');
  }

  revalidatePath('/technician');
}
