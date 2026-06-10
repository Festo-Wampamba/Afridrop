'use server';

import { db } from '@/db';
import { quotations } from '@/db/schema/quotations';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';

// Jobs assigned to this technician (quotations.assignedTo).
export async function getTechnicianData() {
  const session = await requireRole(['technician']);

  const jobs = await db
    .select()
    .from(quotations)
    .where(and(eq(quotations.assignedTo, session.user.id), isNull(quotations.deletedAt)))
    .orderBy(desc(quotations.createdAt));

  return {
    jobs,
    stats: {
      pending: jobs.filter((j) => j.status === 'pending' || j.status === 'in_progress').length,
      completed: jobs.filter((j) => j.status === 'completed').length,
    },
  };
}
