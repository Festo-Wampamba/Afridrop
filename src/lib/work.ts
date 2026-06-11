import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { quotations } from '@/db/schema/quotations';
import { users } from '@/db/schema/auth';
import { messages } from '@/db/schema/messages';
import { and, desc, eq, inArray, isNull } from 'drizzle-orm';
import type { Session } from '@/lib/auth';

// Job lifecycle (stored in quotations.status, a free varchar — no enum/migration).
export const JOB_STATUSES = ['pending', 'assigned', 'in_progress', 'completed', 'verified', 'cancelled'] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const JOB_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  assigned: 'bg-indigo-100 text-indigo-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-teal-100 text-teal-800',
  verified: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-600',
};

type Role = 'super_admin' | 'director' | 'manager' | 'sales_manager' | 'accountant' | 'receptionist' | 'technician' | 'customer';

function roleOf(session: Session): Role {
  return (session.user as { role?: Role }).role ?? 'customer';
}

// The portal-account user IDs a manager is responsible for (their assigned
// clients). super_admin returns null = full access (no scope filter).
export async function scopedCustomerIds(session: Session): Promise<string[] | null> {
  const role = roleOf(session);
  if (role === 'super_admin' || role === 'director' || role === 'sales_manager') return null;

  const rows = await db
    .select({ userId: clients.userId })
    .from(clients)
    .where(and(eq(clients.assignedManagerId, session.user.id), isNull(clients.deletedAt)));

  return rows.map((r) => r.userId).filter((id): id is string => Boolean(id));
}

export async function getActiveTechnicians() {
  return db
    .select({ id: users.id, firstName: users.firstName, lastName: users.lastName, email: users.email })
    .from(users)
    .where(and(eq(users.role, 'technician'), isNull(users.deletedAt)));
}

// Jobs visible to the current scope, with the assignee joined in.
export async function getJobs(scope: string[] | null) {
  if (scope && scope.length === 0) return [];

  const base = db
    .select({
      job: quotations,
      assignee: { id: users.id, firstName: users.firstName, lastName: users.lastName },
    })
    .from(quotations)
    .leftJoin(users, eq(quotations.assignedTo, users.id))
    .orderBy(desc(quotations.createdAt));

  const rows = scope
    ? await base.where(and(inArray(quotations.customerId, scope), isNull(quotations.deletedAt)))
    : await base.where(isNull(quotations.deletedAt));

  return rows;
}

// Message threads grouped by the client user, newest first.
type MessageRow = typeof messages.$inferSelect;
type Thread = { latest: MessageRow; unread: number; count: number };

export async function getThreads(scope: string[] | null): Promise<Map<string, Thread>> {
  const byUser = new Map<string, Thread>();
  if (scope && scope.length === 0) return byUser;

  const rows = scope
    ? await db
        .select()
        .from(messages)
        .where(inArray(messages.userId, scope))
        .orderBy(desc(messages.createdAt))
    : await db.select().from(messages).orderBy(desc(messages.createdAt));

  // Group by userId → latest message + unread count.
  for (const m of rows) {
    const entry = byUser.get(m.userId);
    if (!entry) {
      byUser.set(m.userId, { latest: m, unread: m.isRead ? 0 : 1, count: 1 });
    } else {
      entry.count += 1;
      if (!m.isRead) entry.unread += 1;
    }
  }
  return byUser;
}
