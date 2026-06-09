import Link from 'next/link';
import { Users, UserCheck, ClipboardList, BadgeCheck, ArrowRight } from 'lucide-react';
import { getManagerData } from './actions';

const clientStatusColors: Record<string, string> = {
  lead: 'bg-amber-100 text-amber-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-700',
};

function StatCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: number;
  icon: typeof Users;
  tint: string;
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center gap-4">
      <div className={`h-11 w-11 rounded-lg flex items-center justify-center ${tint}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default async function ManagerDashboardPage() {
  const { clients, requests, stats } = await getManagerData();
  const clientByUserId = new Map(clients.filter((c) => c.userId).map((c) => [c.userId!, c]));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Assigned Clients" value={stats.totalClients} icon={Users} tint="bg-blue-50 text-blue-600" />
        <StatCard label="Active Clients" value={stats.activeClients} icon={UserCheck} tint="bg-green-50 text-green-600" />
        <StatCard label="Pending Requests" value={stats.pendingRequests} icon={ClipboardList} tint="bg-amber-50 text-amber-600" />
        <StatCard label="Awaiting Verification" value={stats.unverified} icon={BadgeCheck} tint="bg-teal-50 text-teal-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Clients</h2>
            <Link href="/manager/clients" className="text-sm text-[#009FCE] hover:underline flex items-center gap-1">
              Manage <ArrowRight size={14} />
            </Link>
          </div>
          {clients.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-gray-400">No clients assigned to you yet.</p>
          ) : (
            <ul className="divide-y">
              {clients.slice(0, 6).map((c) => (
                <li key={c.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 truncate">{c.city ?? c.email ?? '—'}</p>
                  </div>
                  <span className={`shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${clientStatusColors[c.status] ?? 'bg-gray-100 text-gray-700'}`}>
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Requests</h2>
            <Link href="/manager/jobs" className="text-sm text-[#009FCE] hover:underline flex items-center gap-1">
              Jobs <ArrowRight size={14} />
            </Link>
          </div>
          {requests.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-gray-400">No service requests yet.</p>
          ) : (
            <ul className="divide-y">
              {requests.slice(0, 6).map((r) => {
                const client = r.customerId ? clientByUserId.get(r.customerId) : null;
                const status = r.status ?? 'pending';
                return (
                  <li key={r.id} className="px-5 py-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{client?.name ?? r.customerName ?? 'Client'}</p>
                    <p className="text-xs text-gray-500 mt-0.5 capitalize">{status.replace('_', ' ')}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
