'use server';

import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { quotations } from '@/db/schema/quotations';
import { and, desc, eq, inArray, isNull } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';
import { scopedCustomerIds, getJobs, getActiveTechnicians, getThreads } from '@/lib/work';

// ── Overview ──────────────────────────────────────────────────────────────
export async function getManagerData() {
  const session = await requireRole(['manager', 'super_admin']);
  const managerId = session.user.id;

  const assignedClients = await db
    .select()
    .from(clients)
    .where(and(eq(clients.assignedManagerId, managerId), isNull(clients.deletedAt)))
    .orderBy(desc(clients.createdAt));

  const linkedUserIds = assignedClients.map((c) => c.userId).filter((id): id is string => Boolean(id));

  const requests = linkedUserIds.length
    ? await db
        .select()
        .from(quotations)
        .where(and(inArray(quotations.customerId, linkedUserIds), isNull(quotations.deletedAt)))
        .orderBy(desc(quotations.createdAt))
    : [];

  return {
    clients: assignedClients,
    requests,
    stats: {
      totalClients: assignedClients.length,
      activeClients: assignedClients.filter((c) => c.status === 'active').length,
      pendingRequests: requests.filter((r) => r.status === 'pending' || r.status === 'in_progress').length,
      unverified: requests.filter((r) => r.status === 'completed').length,
    },
  };
}

// ── Clients ───────────────────────────────────────────────────────────────
export async function getManagerClients() {
  const session = await requireRole(['manager', 'super_admin']);
  return db
    .select()
    .from(clients)
    .where(and(eq(clients.assignedManagerId, session.user.id), isNull(clients.deletedAt)))
    .orderBy(desc(clients.createdAt));
}

// ── Jobs ──────────────────────────────────────────────────────────────────
export async function getManagerJobsView() {
  const session = await requireRole(['manager', 'super_admin']);
  const scope = await scopedCustomerIds(session);
  const [jobs, attendants] = await Promise.all([getJobs(scope), getActiveTechnicians()]);
  const clientNameByUserId = await clientNameMap(session.user.id);
  return { jobs, attendants, clientNameByUserId };
}

// ── Team (technicians + progress) ─────────────────────────────────────────
export async function getManagerTeam() {
  const session = await requireRole(['manager', 'super_admin']);
  const scope = await scopedCustomerIds(session);
  const [attendants, jobs] = await Promise.all([getActiveTechnicians(), getJobs(scope)]);

  return attendants.map((a) => {
    const theirs = jobs.filter((r) => r.job.assignedTo === a.id);
    return {
      ...a,
      total: theirs.length,
      active: theirs.filter((r) => r.job.status === 'assigned' || r.job.status === 'in_progress').length,
      completed: theirs.filter((r) => r.job.status === 'completed').length,
      verified: theirs.filter((r) => r.job.status === 'verified').length,
    };
  });
}

// ── Messages ──────────────────────────────────────────────────────────────
export async function getManagerMessagesView() {
  const session = await requireRole(['manager', 'super_admin']);
  const scope = await scopedCustomerIds(session);
  const threadsMap = await getThreads(scope);
  const clientNameByUserId = await clientNameMap(session.user.id);

  const threads = Array.from(threadsMap.entries()).map(([userId, t]) => ({
    userId,
    name: clientNameByUserId.get(userId) ?? t.latest.subject,
    latest: t.latest,
    unread: t.unread,
    count: t.count,
  }));

  // Clients with a portal account can receive messages.
  const recipients = (await getManagerClients())
    .filter((c) => c.userId)
    .map((c) => ({ userId: c.userId as string, name: c.name }));

  return { threads, recipients };
}

// Map a manager's assigned client portal-account IDs → client display name.
async function clientNameMap(managerId: string) {
  const rows = await db
    .select({ userId: clients.userId, name: clients.name })
    .from(clients)
    .where(and(eq(clients.assignedManagerId, managerId), isNull(clients.deletedAt)));
  const map = new Map<string, string>();
  for (const r of rows) if (r.userId) map.set(r.userId, r.name);
  return map;
}
