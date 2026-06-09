import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { isNull } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';
import { getJobs, getActiveAttendants } from '@/lib/work';
import { JobsBoard } from '@/components/dashboard/JobsBoard';

export default async function AdminJobsPage() {
  await requireRole(['admin', 'super_admin']);

  const [jobs, attendants, clientRows] = await Promise.all([
    getJobs(null),
    getActiveAttendants(),
    db.select({ userId: clients.userId, name: clients.name }).from(clients).where(isNull(clients.deletedAt)),
  ]);

  const clientNameByUserId = new Map<string, string>();
  for (const r of clientRows) if (r.userId) clientNameByUserId.set(r.userId, r.name);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Service Requests</h2>
        <p className="text-gray-500 text-sm mt-1">Assign attendants, track progress, and verify completed work across all clients.</p>
      </div>
      <JobsBoard jobs={jobs} attendants={attendants} clientNameByUserId={clientNameByUserId} path="/admin/jobs" />
    </div>
  );
}
