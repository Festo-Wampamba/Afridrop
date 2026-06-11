import { getAllQuotations } from '../actions';
import {
  setQuotationStatus,
  updateQuotation,
  createQuotation,
} from '../approval-actions';
import { SubmitButton } from '@/components/dashboard/SubmitButton';

// Director-allowed transitions per current status
const TRANSITIONS: Record<string, { label: string; status: string; style: string }[]> = {
  pending: [
    { label: 'Approve', status: 'approved', style: 'bg-green-600 text-white hover:bg-green-700' },
    { label: 'Reject', status: 'rejected', style: 'border border-red-300 text-red-600 hover:bg-red-50' },
    { label: 'Hold', status: 'on_hold', style: 'border border-amber-400 text-amber-700 hover:bg-amber-50' },
    { label: 'Cancel', status: 'cancelled', style: 'border border-gray-300 text-gray-600 hover:bg-gray-50' },
  ],
  reviewed: [
    { label: 'Approve', status: 'approved', style: 'bg-green-600 text-white hover:bg-green-700' },
    { label: 'Reject', status: 'rejected', style: 'border border-red-300 text-red-600 hover:bg-red-50' },
    { label: 'Hold', status: 'on_hold', style: 'border border-amber-400 text-amber-700 hover:bg-amber-50' },
    { label: 'Cancel', status: 'cancelled', style: 'border border-gray-300 text-gray-600 hover:bg-gray-50' },
  ],
  on_hold: [
    { label: 'Approve', status: 'approved', style: 'bg-green-600 text-white hover:bg-green-700' },
    { label: 'Reject', status: 'rejected', style: 'border border-red-300 text-red-600 hover:bg-red-50' },
    { label: 'Reopen', status: 'pending', style: 'border border-blue-300 text-blue-700 hover:bg-blue-50' },
    { label: 'Cancel', status: 'cancelled', style: 'border border-gray-300 text-gray-600 hover:bg-gray-50' },
  ],
  approved: [
    { label: 'Hold', status: 'on_hold', style: 'border border-amber-400 text-amber-700 hover:bg-amber-50' },
    { label: 'Cancel', status: 'cancelled', style: 'border border-gray-300 text-gray-600 hover:bg-gray-50' },
  ],
  rejected: [
    { label: 'Reopen', status: 'pending', style: 'border border-blue-300 text-blue-700 hover:bg-blue-50' },
  ],
  assigned: [
    { label: 'Cancel', status: 'cancelled', style: 'border border-gray-300 text-gray-600 hover:bg-gray-50' },
  ],
  in_progress: [
    { label: 'Cancel', status: 'cancelled', style: 'border border-gray-300 text-gray-600 hover:bg-gray-50' },
  ],
};

function statusBadge(status: string | null) {
  const s = status ?? 'pending';
  const map: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    reviewed: 'bg-purple-100 text-purple-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    on_hold: 'bg-amber-200 text-amber-900',
    cancelled: 'bg-gray-100 text-gray-600',
    assigned: 'bg-indigo-100 text-indigo-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-teal-100 text-teal-800',
    verified: 'bg-green-200 text-green-900',
    converted: 'bg-cyan-100 text-cyan-800',
  };
  const label: Record<string, string> = {
    pending: 'Pending',
    reviewed: 'Reviewed',
    approved: 'Approved',
    rejected: 'Rejected',
    on_hold: 'On Hold',
    cancelled: 'Cancelled',
    assigned: 'Assigned',
    in_progress: 'In Progress',
    completed: 'Completed',
    verified: 'Verified',
    converted: 'Converted',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[s] ?? 'bg-gray-100 text-gray-600'}`}>
      {label[s] ?? s}
    </span>
  );
}

function fmtUGX(amount: number | null) {
  if (amount === null) return '—';
  return `UGX ${amount.toLocaleString('en-UG')}`;
}

function fmtDate(date: Date | null | string) {
  if (!date) return '—';
  return new Date(date as string).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function DirectorQuotationsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; edit?: string; new?: string }>;
}) {
  const params = await searchParams;
  const editId = params.edit ?? null;
  const showNew = params.new === '1';
  const errorMsg = params.error ?? null;

  const allQuotations = await getAllQuotations();
  const editQuotation = editId ? allQuotations.find((q) => q.id === editId) ?? null : null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quotation Management</h2>
          <p className="text-sm text-gray-500 mt-1">Create, edit, and manage the full lifecycle of all quotations.</p>
        </div>
        <a
          href="/director/quotations?new=1"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00477A] text-white text-sm font-medium rounded-lg hover:bg-[#002B4A] transition"
        >
          + New Quotation
        </a>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      {/* New Quotation form */}
      {showNew && (
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900">New Quotation</h3>
          <form action={createQuotation} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">Customer Name *</label>
              <input name="customerName" required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">Customer Email</label>
              <input name="customerEmail" type="email" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-medium text-gray-600">Project Description *</label>
              <textarea name="projectDescription" required rows={3} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">Location</label>
              <input name="location" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">Total Amount (UGX)</label>
              <input name="totalAmount" type="number" min="0" step="0.01" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">Valid Until</label>
              <input name="validUntil" type="date" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-medium text-gray-600">Notes</label>
              <textarea name="notes" rows={2} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <SubmitButton
                label="Create Quotation"
                pendingLabel="Creating…"
                className="px-5 py-2 bg-[#00477A] text-white text-sm font-medium rounded-lg hover:bg-[#002B4A] transition disabled:opacity-60"
              />
              <a href="/director/quotations" className="px-5 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </a>
            </div>
          </form>
        </div>
      )}

      {/* Edit panel */}
      {editQuotation && (
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900">Edit Quotation — {editQuotation.quotationNumber}</h3>
          <form action={updateQuotation} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="hidden" name="quotationId" value={editQuotation.id} />
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-medium text-gray-600">Project Description</label>
              <textarea name="projectDescription" rows={3} defaultValue={editQuotation.projectDescription} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">Location</label>
              <input name="location" defaultValue={editQuotation.location ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">Total Amount (UGX)</label>
              <input name="totalAmount" type="number" min="0" step="0.01" defaultValue={editQuotation.totalAmount ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">Valid Until</label>
              <input name="validUntil" type="date" defaultValue={editQuotation.validUntil ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-medium text-gray-600">Notes</label>
              <textarea name="notes" rows={2} defaultValue={editQuotation.notes ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <SubmitButton
                label="Save Changes"
                pendingLabel="Saving…"
                className="px-5 py-2 bg-[#00477A] text-white text-sm font-medium rounded-lg hover:bg-[#002B4A] transition disabled:opacity-60"
              />
              <a href="/director/quotations" className="px-5 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </a>
            </div>
          </form>
        </div>
      )}

      {/* Quotations table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {allQuotations.length === 0 ? (
          <p className="text-sm text-slate-400 px-6 py-12 text-center">No quotations yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Number</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Description</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Created</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allQuotations.map((q) => {
                  const transitions = TRANSITIONS[q.status ?? 'pending'] ?? [];
                  return (
                    <tr key={q.id} className="hover:bg-slate-50 transition-colors align-top">
                      <td className="px-4 py-3 font-mono text-xs text-slate-600 whitespace-nowrap">{q.quotationNumber}</td>
                      <td className="px-4 py-3 text-slate-900 whitespace-nowrap">
                        <p className="font-medium">{q.customerName}</p>
                        <p className="text-xs text-slate-400">{q.customerEmail}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600 hidden md:table-cell max-w-xs">
                        <p className="line-clamp-2 text-xs">{q.projectDescription}</p>
                        {q.location && <p className="text-xs text-slate-400 mt-0.5">📍 {q.location}</p>}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap hidden sm:table-cell">
                        {fmtUGX(q.totalAmount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{statusBadge(q.status)}</td>
                      <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap hidden lg:table-cell">{fmtDate(q.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {/* Edit link */}
                          <a
                            href={`/director/quotations?edit=${q.id}`}
                            className="px-2.5 py-1 text-xs font-medium rounded-md border border-[#00477A] text-[#00477A] hover:bg-slate-50 transition"
                          >
                            Edit
                          </a>
                          {/* Status transitions */}
                          {transitions.map((t) => (
                            <form key={t.status} action={setQuotationStatus}>
                              <input type="hidden" name="quotationId" value={q.id} />
                              <input type="hidden" name="targetStatus" value={t.status} />
                              <SubmitButton
                                label={t.label}
                                pendingLabel="…"
                                className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${t.style} disabled:opacity-60`}
                              />
                            </form>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
