import { db } from '@/db';
import { auditLogs } from '@/db/schema';
import { count, desc } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';
import Link from 'next/link';
import { format } from 'date-fns';

const PAGE_SIZE = 25;

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requireRole(['super_admin']);

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const [[totalRow], logs] = await Promise.all([
    db.select({ value: count() }).from(auditLogs),
    db.query.auditLogs.findMany({
      orderBy: [desc(auditLogs.createdAt)],
      limit: PAGE_SIZE,
      offset,
      with: { user: { columns: { firstName: true, lastName: true, email: true } } },
    }),
  ]);

  const total = Number(totalRow.value);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
        <p className="text-gray-500 text-sm mt-1">{total} total events</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-16 text-center text-sm text-gray-400">No audit events yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Resource Type</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Resource ID</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">IP Address</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-700">
                      {log.user
                        ? `${log.user.firstName} ${log.user.lastName}`
                        : log.userId
                          ? <span className="font-mono text-xs text-gray-400">{log.userId.slice(0, 8)}…</span>
                          : '—'}
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.resourceType}</td>
                    <td className="px-6 py-3 text-xs font-mono text-gray-400">
                      {log.resourceId ? log.resourceId.slice(0, 8) + '…' : '—'}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">{log.ipAddress ?? '—'}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {log.createdAt ? format(new Date(log.createdAt), 'MMM d yyyy, HH:mm') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/audit?page=${page - 1}`}
                className="px-4 py-2 text-sm font-medium bg-white border rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                ← Prev
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/audit?page=${page + 1}`}
                className="px-4 py-2 text-sm font-medium bg-white border rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
