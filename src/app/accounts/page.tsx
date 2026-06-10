import { getCashPosition, getReceivables, getJobStatusSummary } from './actions';
import { ComingSoon } from '@/components/dashboard/ComingSoon';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';

function ugx(n: number) {
  return `UGX ${n.toLocaleString('en-UG')}`;
}

function methodLabel(method: string) {
  const MAP: Record<string, string> = {
    flutterwave_mobile: 'Mobile Money',
    flutterwave_card: 'Card (Flutterwave)',
    bank_transfer: 'Bank Transfer',
    cash: 'Cash',
  };
  return MAP[method] ?? method;
}

function statusBadge(status: string) {
  const classes: Record<string, string> = {
    assigned: 'bg-blue-50 text-blue-700',
    in_progress: 'bg-amber-50 text-amber-700',
    completed: 'bg-green-50 text-green-700',
    verified: 'bg-emerald-50 text-emerald-700',
  };
  const labels: Record<string, string> = {
    assigned: 'Assigned',
    in_progress: 'In Progress',
    completed: 'Completed',
    verified: 'Verified',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[status] ?? 'bg-gray-100 text-gray-700'}`}>
      {labels[status] ?? status}
    </span>
  );
}

export default async function AccountsPage() {
  const [cash, receivables, jobSummary] = await Promise.all([
    getCashPosition(),
    getReceivables(),
    getJobStatusSummary(),
  ]);

  const totalReceivables =
    receivables.pendingOrders.reduce((s, r) => s + r.total, 0) +
    receivables.receivableQuotations.reduce((s, r) => s + (r.totalAmount ?? 0), 0);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Accounts Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Cash position, receivables, and job status — read-only view.</p>
      </div>

      {/* Cash cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border shadow-sm p-6 flex items-start gap-4">
          <div className="flex-shrink-0 rounded-full bg-[#009FCE]/10 p-3">
            <TrendingUp className="text-[#009FCE]" size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Collected This Month</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{ugx(cash.collectedThisMonth)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6 flex items-start gap-4">
          <div className="flex-shrink-0 rounded-full bg-amber-50 p-3">
            <Clock className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Pending Payments</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{ugx(cash.pendingTotal)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{cash.pendingCount} transaction{cash.pendingCount !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6 flex items-start gap-4">
          <div className="flex-shrink-0 rounded-full bg-green-50 p-3">
            <DollarSign className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">All-time Collected</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{ugx(cash.collectedAllTime)}</p>
          </div>
        </div>
      </div>

      {/* Payment method breakdown */}
      {cash.byMethod.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-semibold text-gray-900">Payment Method Breakdown (Collected)</h3>
          </div>
          <div className="divide-y">
            {cash.byMethod
              .sort((a, b) => b.total - a.total)
              .map((row) => {
                const pct = cash.collectedAllTime > 0
                  ? Math.round((row.total / cash.collectedAllTime) * 100)
                  : 0;
                return (
                  <div key={row.method} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm font-medium text-gray-700">{methodLabel(row.method)}</span>
                      <span className="text-xs text-gray-400 hidden sm:inline">{pct}%</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{ugx(row.total)}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Receivables */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Receivables</h3>
          <span className="text-sm font-semibold text-[#009FCE]">{ugx(totalReceivables)}</span>
        </div>

        {/* Pending orders */}
        {receivables.pendingOrders.length > 0 && (
          <>
            <div className="px-6 py-2 bg-gray-50 border-b">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Pending Orders ({receivables.pendingOrders.length})
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Order #</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {receivables.pendingOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm font-mono text-gray-700">{o.orderNumber}</td>
                      <td className="px-6 py-3">
                        <p className="text-sm text-gray-900">{o.customerName}</p>
                        <p className="text-xs text-gray-400">{o.customerEmail}</p>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500">
                        {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900 text-right">{ugx(o.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Approved quotations */}
        {receivables.receivableQuotations.length > 0 && (
          <>
            <div className="px-6 py-2 bg-gray-50 border-b border-t">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Approved Quotations ({receivables.receivableQuotations.length})
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Quotation #</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {receivables.receivableQuotations.map((q) => (
                    <tr key={q.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm font-mono text-gray-700">{q.quotationNumber}</td>
                      <td className="px-6 py-3">
                        <p className="text-sm text-gray-900">{q.customerName}</p>
                        <p className="text-xs text-gray-400">{q.customerEmail}</p>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          q.status === 'converted' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700'
                        }`}>
                          {q.status === 'converted' ? 'Converted' : 'Approved'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500">
                        {q.createdAt ? new Date(q.createdAt).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900 text-right">
                        {q.totalAmount != null ? ugx(q.totalAmount) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {receivables.pendingOrders.length === 0 && receivables.receivableQuotations.length === 0 && (
          <div className="p-12 text-center text-sm text-gray-400">No outstanding receivables</div>
        )}
      </div>

      {/* Job status summary strip */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-900">Active Job Status</h3>
          <p className="text-xs text-gray-500 mt-0.5">Operational view — read-only</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0">
          {jobSummary.map((item) => (
            <div key={item.status} className="px-6 py-5 flex flex-col gap-2">
              {statusBadge(item.status)}
              <p className="text-3xl font-bold text-gray-900">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coming soon modules */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Coming Soon</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ComingSoon module="Invoices" description="Generate and manage client invoices." />
          <ComingSoon module="Expenses" description="Track and categorise operational expenses." />
          <ComingSoon module="Payroll" description="Staff payroll processing and reports." />
        </div>
      </div>
    </div>
  );
}
