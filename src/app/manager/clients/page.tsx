import { getManagerClients } from '../actions';
import { updateClientStatus } from '@/lib/work-actions';

const CLIENT_STATUSES = ['lead', 'active', 'inactive'];

export default async function ManagerClientsPage() {
  const clients = await getManagerClients();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Clients</h2>
        <p className="text-sm text-gray-500 mt-1">{clients.length} assigned</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {clients.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-gray-400">No clients assigned to you yet.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">City</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Portal</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-gray-900">{c.name}</p>
                    {c.poolType && <p className="text-xs text-gray-500 capitalize">{c.poolType} pool</p>}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    <p>{c.email ?? '—'}</p>
                    <p className="text-xs text-gray-400">{c.phone ?? ''}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{c.city ?? '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${c.userId ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.userId ? 'Linked' : 'None'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <form action={updateClientStatus} className="flex items-center gap-2">
                      <input type="hidden" name="clientId" value={c.id} />
                      <input type="hidden" name="_path" value="/manager/clients" />
                      <label htmlFor={`status-${c.id}`} className="sr-only">Status for {c.name}</label>
                      <select
                        id={`status-${c.id}`}
                        name="status"
                        defaultValue={c.status}
                        className="px-2.5 py-1.5 border rounded-lg text-sm capitalize focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]"
                      >
                        {CLIENT_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button type="submit" className="px-3 py-1.5 bg-[#00477A] text-white text-xs font-medium rounded-lg hover:bg-[#002B4A] transition">
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
