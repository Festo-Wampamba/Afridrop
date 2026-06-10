import { getPendingApprovals } from '../actions';
import { approveQuotation, rejectQuotation } from '../approval-actions';
import { Inbox } from 'lucide-react';
import { SubmitButton } from '@/components/dashboard/SubmitButton';

function fmtUGX(amount: number | null) {
  if (amount === null) return '—';
  return `UGX ${amount.toLocaleString('en-UG')}`;
}

function fmtDate(date: Date | null) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function ApprovalsPage() {
  const pending = await getPendingApprovals();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
          <p className="text-sm text-gray-500 mt-1">Quotations requiring your decision</p>
        </div>
        {pending.length > 0 && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            {pending.length} pending
          </span>
        )}
      </div>

      {pending.length === 0 ? (
        <div className="bg-white rounded-xl border shadow-sm p-16 flex flex-col items-center text-center gap-3">
          <Inbox size={40} className="text-gray-300" />
          <p className="text-lg font-semibold text-gray-900">All clear</p>
          <p className="text-sm text-gray-400">No quotations are waiting for approval right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((q) => (
            <div key={q.id} className="bg-white rounded-xl border shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Details */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-gray-400">{q.quotationNumber}</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        q.status === 'reviewed'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>
                  <p className="text-base font-semibold text-gray-900">{q.customerName}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{q.projectDescription}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 pt-1">
                    {q.location && <span>📍 {q.location}</span>}
                    <span>Submitted {fmtDate(q.createdAt)}</span>
                  </div>
                </div>

                {/* Amount + actions */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <p className="text-lg font-bold text-gray-900">{fmtUGX(q.totalAmount)}</p>
                  <div className="flex gap-2">
                    <form action={approveQuotation}>
                      <input type="hidden" name="quotationId" value={q.id} />
                      <SubmitButton
                        label="Approve"
                        pendingLabel="Approving…"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/50 disabled:opacity-60"
                      />
                    </form>
                    <form action={rejectQuotation}>
                      <input type="hidden" name="quotationId" value={q.id} />
                      <SubmitButton
                        label="Reject"
                        pendingLabel="Rejecting…"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-white border border-red-300 text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-60"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
