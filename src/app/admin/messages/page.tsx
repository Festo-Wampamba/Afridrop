import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { isNull } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';
import { getThreads } from '@/lib/work';
import { MessagesPanel } from '@/components/dashboard/MessagesPanel';

export default async function AdminMessagesPage() {
  await requireRole(['super_admin']);

  const [threadsMap, clientRows] = await Promise.all([
    getThreads(null),
    db.select({ userId: clients.userId, name: clients.name }).from(clients).where(isNull(clients.deletedAt)),
  ]);

  const clientNameByUserId = new Map<string, string>();
  for (const r of clientRows) if (r.userId) clientNameByUserId.set(r.userId, r.name);

  const threads = Array.from(threadsMap.entries()).map(([userId, t]) => ({
    userId,
    name: clientNameByUserId.get(userId) ?? t.latest.subject,
    latest: t.latest,
    unread: t.unread,
    count: t.count,
  }));

  const recipients = clientRows
    .filter((c) => c.userId)
    .map((c) => ({ userId: c.userId as string, name: c.name }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <p className="text-gray-500 text-sm mt-1">Communicate with clients across the platform.</p>
      </div>
      <MessagesPanel threads={threads} recipients={recipients} path="/admin/messages" />
    </div>
  );
}
