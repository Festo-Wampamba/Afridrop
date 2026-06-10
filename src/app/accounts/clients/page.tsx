import { getClientListReadonly } from '../actions';

function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: 'bg-green-50 text-green-700',
    lead: 'bg-blue-50 text-blue-700',
    inactive: 'bg-gray-100 text-gray-500',
  };
  const labels: Record<string, string> = {
    active: 'Active',
    lead: 'Lead',
    inactive: 'Inactive',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}
    >
      {labels[status] ?? status}
    </span>
  );
}

export default async function AccountsClientsPage() {
  const clientList = await getClientListReadonly();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
        <p className="text-gray-500 text-sm mt-1">
          {clientList.length} client{clientList.length !== 1 ? 's' : ''} — read-only view
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {clientList.length === 0 ? (
          <div className="p-16 text-center text-sm text-gray-400">No clients on record yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Contact
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    City
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {clientList.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{c.name}</td>
                    <td className="px-6 py-3">
                      {c.email && <p className="text-sm text-gray-700">{c.email}</p>}
                      {c.phone && <p className="text-xs text-gray-400">{c.phone}</p>}
                      {!c.email && !c.phone && <span className="text-sm text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{c.city ?? '—'}</td>
                    <td className="px-6 py-3">{statusBadge(c.status)}</td>
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
