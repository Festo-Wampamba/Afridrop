'use server';

import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { quotations } from '@/db/schema/quotations';
import { and, desc, eq, inArray, isNull } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';

// All manager-scoped data: the clients assigned to this manager and the
// service requests (quotations) belonging to those clients' portal accounts.
export async function getManagerData() {
  const session = await requireRole(['manager']);
  const managerId = session.user.id;

  const assignedClients = await db
    .select()
    .from(clients)
    .where(and(eq(clients.assignedManagerId, managerId), isNull(clients.deletedAt)))
    .orderBy(desc(clients.createdAt));

  // Map linked portal accounts → their service requests.
  const linkedUserIds = assignedClients
    .map((c) => c.userId)
    .filter((id): id is string => Boolean(id));

  const requests = linkedUserIds.length
    ? await db
        .select()
        .from(quotations)
        .where(and(inArray(quotations.customerId, linkedUserIds), isNull(quotations.deletedAt)))
        .orderBy(desc(quotations.createdAt))
    : [];

  const activeClients = assignedClients.filter((c) => c.status === 'active').length;
  const pendingRequests = requests.filter(
    (r) => r.status === 'pending' || r.status === 'in_progress'
  ).length;

  return {
    clients: assignedClients,
    requests,
    stats: {
      totalClients: assignedClients.length,
      activeClients,
      pendingRequests,
    },
  };
}
