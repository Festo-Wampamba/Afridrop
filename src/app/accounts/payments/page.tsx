import { getPayments } from '../actions';
import Link from 'next/link';

const PAGE_SIZE = 25;

function ugx(n: number) {
  return `UGX ${n.toLocaleString('en-UG')}`;
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    completed: 'bg-green-50 text-green-700',
    pending: 'bg-amber-50 text-amber-700',
    failed: 'bg-red-50 text-red-700',
    refunded: 'bg-purple-50 text-purple-700',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

function methodLabel(method: string) {
  const MAP: Record<string, string> = {
    flutterwave_mobile: 'Mobile Money',
    flutterwave_card: 'Card',
    bank_transfer: 'Bank Transfer',
    cash: 'Cash',
  };
  return MAP[method] ?? method;
}

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);

  const { total, totalPages, rows } = await getPayments(page);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
        <p className="text-gray-500 text-sm mt-1">{total} total payment{total !== 1 ? 's' : ''}</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {rows.length === 0 ? (
          <div className="p-16 text-center text-sm text-gray-400">No payments recorded yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Method</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Reference</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString('en-UG', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="px-6 py-3">
                      <p className="text-sm text-gray-900">{p.customerName ?? '—'}</p>
                      {p.customerEmail && (
                        <p className="text-xs text-gray-400">{p.customerEmail}</p>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700">{methodLabel(p.paymentMethod)}</td>
                    <td className="px-6 py-3">{statusBadge(p.status ?? 'pending')}</td>
                    <td className="px-6 py-3 text-xs font-mono text-gray-400">
                      {p.orderNumber ? (
                        <span title="Order number">{p.orderNumber}</span>
                      ) : p.transactionId ? (
                        <span title="Transaction ID">{p.transactionId.slice(0, 16)}{p.transactionId.length > 16 ? '…' : ''}</span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900 text-right whitespace-nowrap">
                      {ugx(p.amount)}
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
                href={`/accounts/payments?page=${page - 1}`}
                className="px-4 py-2 text-sm font-medium bg-white border rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                ← Prev
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/accounts/payments?page=${page + 1}`}
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
