import { Users, UserCheck, ClipboardList } from 'lucide-react';
import { getManagerData } from './actions';

const clientStatusColors: Record<string, string> = {
  lead: 'bg-amber-100 text-amber-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-700',
};

const requestStatusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-600',
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

  // Resolve each request's client name via the linked portal account.
  const clientByUserId = new Map(clients.filter((c) => c.userId).map((c) => [c.userId!, c]));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Assigned Clients" value={stats.totalClients} icon={Users} tint="bg-blue-50 text-blue-600" />
        <StatCard label="Active Clients" value={stats.activeClients} icon={UserCheck} tint="bg-green-50 text-green-600" />
        <StatCard label="Pending Requests" value={stats.pendingRequests} icon={ClipboardList} tint="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned clients */}
        <section className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="font-semibold text-gray-900">My Clients</h2>
          </div>
          {clients.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-gray-400">No clients assigned to you yet.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.email ?? '—'}</p>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">{c.city ?? '—'}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${clientStatusColors[c.status] ?? 'bg-gray-100 text-gray-700'}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Recent service requests */}
        <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Service Requests</h2>
          </div>
          {requests.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-gray-400">No service requests from your clients.</p>
          ) : (
            <ul className="divide-y">
              {requests.slice(0, 8).map((r) => {
                const client = r.customerId ? clientByUserId.get(r.customerId) : null;
                const status = r.status ?? 'pending';
                return (
                  <li key={r.id} className="px-5 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {client?.name ?? r.customerName ?? 'Client'}
                      </span>
                      <span className={`shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${requestStatusColors[status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{r.projectDescription ?? r.quotationNumber}</p>
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
