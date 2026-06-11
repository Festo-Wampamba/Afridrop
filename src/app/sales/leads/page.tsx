import { getLeads } from '../actions';
import { updateLeadStatus } from '../lead-actions';
import { SubmitButton } from '@/components/dashboard/SubmitButton';
import { Users } from 'lucide-react';

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Leads</h2>
        <p className="text-sm text-gray-500 mt-1">
          Prospective clients — mark won to convert to active, or lost to close.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <Users size={40} className="text-slate-300" />
            <p className="text-base font-medium text-slate-500">No leads yet</p>
            <p className="text-sm text-slate-400">New leads will appear here when clients are added with status &quot;lead&quot;.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">City</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Created</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div>{lead.email ?? '—'}</div>
                      {lead.phone && <div className="text-xs text-slate-400">{lead.phone}</div>}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{lead.city ?? '—'}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-UG') : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Mark Won → active */}
                        <form action={updateLeadStatus}>
                          <input type="hidden" name="leadId" value={lead.id} />
                          <input type="hidden" name="newStatus" value="active" />
                          <SubmitButton
                            label="Mark Won"
                            pendingLabel="Saving…"
                            className="inline-flex items-center rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
                          />
                        </form>
                        {/* Mark Lost → inactive */}
                        <form action={updateLeadStatus}>
                          <input type="hidden" name="leadId" value={lead.id} />
                          <input type="hidden" name="newStatus" value="inactive" />
                          <SubmitButton
                            label="Mark Lost"
                            pendingLabel="Saving…"
                            className="inline-flex items-center rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-300 disabled:opacity-50 transition-colors"
                          />
                        </form>
                      </div>
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
