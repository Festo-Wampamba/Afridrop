import { db } from '@/db';
import { users, sessions, auditLogs } from '@/db/schema';
import { and, count, eq, gt, isNull } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';
import Link from 'next/link';
import { Users, Monitor, Database, UserPlus, KeyRound, Shield } from 'lucide-react';
import { RoleBarChart } from '@/components/admin/RoleBarChart';
import { format } from 'date-fns';

export default async function AdminOverview() {
  await requireRole(['super_admin']);

  const now = new Date();

  const [
    [activeUsersRow],
    [liveSessionsRow],
    roleRows,
    recentLogs,
    dbHealthy,
  ] = await Promise.all([
    db.select({ value: count() }).from(users).where(and(eq(users.isActive, true), isNull(users.deletedAt))),
    db.select({ value: count() }).from(sessions).where(gt(sessions.expiresAt, now)),
    // Count users grouped by role (exclude super_admin)
    db
      .select({ role: users.role, value: count() })
      .from(users)
      .where(isNull(users.deletedAt))
      .groupBy(users.role),
    // Latest 8 audit log rows with optional user join
    db.query.auditLogs.findMany({
      orderBy: (t, { desc }) => [desc(t.createdAt)],
      limit: 8,
      with: { user: { columns: { firstName: true, lastName: true, email: true } } },
    }),
    db.select({ value: count() }).from(users).limit(1).then(() => true).catch(() => false),
  ]);

  const roleData = roleRows
    .filter((r) => r.role !== 'super_admin')
    .map((r) => ({ role: r.role ?? 'unknown', count: Number(r.value) }))
    .sort((a, b) => b.count - a.count);

  const stats = [
    {
      label: 'Active Users',
      value: activeUsersRow.value,
      icon: Users,
      color: 'bg-[#009FCE]',
      href: '/admin/users',
    },
    {
      label: 'Live Sessions',
      value: liveSessionsRow.value,
      icon: Monitor,
      color: 'bg-[#00477A]',
      href: '/admin/audit',
    },
    {
      label: 'Database',
      value: dbHealthy ? 'Healthy' : 'Error',
      icon: Database,
      color: dbHealthy ? 'bg-green-500' : 'bg-red-500',
      href: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
          <p className="text-gray-500 text-sm mt-1">System health &amp; user management</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#009FCE]/10 text-[#00477A] border border-[#009FCE]/30">
          Super Admin
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const card = (
            <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                </div>
              </div>
            </div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href} className="group">
              {card}
            </Link>
          ) : (
            <div key={stat.label}>{card}</div>
          );
        })}
      </div>

      {/* Middle row: Users by Role + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users by Role bar chart */}
        <div className="md:col-span-2 bg-white rounded-xl border p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Users by Role</h3>
          {roleData.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">No user data yet</p>
          ) : (
            <RoleBarChart data={roleData} />
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/admin/users?action=create"
              className="flex items-center gap-3 w-full px-4 py-3 bg-[#009FCE] text-white text-sm font-medium rounded-lg hover:bg-[#0089b5] transition"
            >
              <UserPlus size={18} />
              Create User
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
            >
              <KeyRound size={18} />
              Reset Password
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
            >
              <Shield size={18} />
              Manage Roles
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Audit Logs */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Audit Logs</h3>
          <Link href="/admin/audit" className="text-sm text-[#009FCE] hover:text-[#00477A]">
            View all →
          </Link>
        </div>
        {recentLogs.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">No audit events yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Resource</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentLogs.map((log) => (
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
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {log.createdAt ? format(new Date(log.createdAt), 'MMM d, HH:mm') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
