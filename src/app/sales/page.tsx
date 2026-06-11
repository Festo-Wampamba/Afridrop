import Link from 'next/link';
import { getSalesOverview, getRecentQuotations } from './actions';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ComingSoon } from '@/components/dashboard/ComingSoon';
import { TrendingUp, Users, CheckCircle, XCircle, Clock, Eye, RefreshCw } from 'lucide-react';

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  href,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent: string;
  href?: string;
}) {
  const inner = (
    <div className="bg-white rounded-xl border shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`p-2.5 rounded-lg ${accent}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{inner}</Link>;
  }
  return inner;
}

function statusLabel(status: string | null): string {
  switch (status) {
    case 'pending': return 'Pending';
    case 'reviewed': return 'Reviewed';
    case 'approved': return 'Approved';
    case 'rejected': return 'Rejected';
    case 'converted': return 'Converted';
    case 'assigned': return 'Assigned';
    case 'in_progress': return 'In Progress';
    case 'completed': return 'Completed';
    case 'verified': return 'Verified';
    case 'cancelled': return 'Cancelled';
    default: return status ?? '—';
  }
}

function statusBadgeClass(status: string | null): string {
  switch (status) {
    case 'pending': return 'bg-amber-100 text-amber-800';
    case 'reviewed': return 'bg-blue-100 text-blue-800';
    case 'approved': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    case 'converted': return 'bg-[#009FCE]/15 text-[#00477A]';
    default: return 'bg-slate-100 text-slate-700';
  }
}

export default async function SalesPage() {
  const [overview, recentQuotations] = await Promise.all([
    getSalesOverview(),
    getRecentQuotations(),
  ]);

  const { pipeline, conversionRate, leadsCount, monthlyRevenue } = overview;

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sales Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Pipeline, leads, and revenue at a glance.</p>
      </div>

      {/* Pipeline stage cards */}
      <section>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Pipeline Stages</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard label="Pending" value={pipeline.pending} icon={Clock} accent="bg-amber-500" />
          <StatCard label="Reviewed" value={pipeline.reviewed} icon={Eye} accent="bg-blue-500" />
          <StatCard label="Approved" value={pipeline.approved} icon={CheckCircle} accent="bg-green-600" />
          <StatCard label="Converted" value={pipeline.converted} icon={RefreshCw} accent="bg-[#009FCE]" />
          <StatCard label="Rejected" value={pipeline.rejected} icon={XCircle} accent="bg-red-500" />
        </div>
      </section>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          label="Conversion Rate"
          value={`${conversionRate}%`}
          sub="(approved + converted) / all approval statuses"
          icon={TrendingUp}
          accent="bg-[#00477A]"
        />
        <StatCard
          label="Active Leads"
          value={leadsCount}
          sub="Click to manage leads"
          icon={Users}
          accent="bg-[#009FCE]"
          href="/sales/leads"
        />
      </div>

      {/* Monthly revenue chart */}
      <section className="bg-white rounded-xl border shadow-sm p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Monthly Revenue (last 6 months)</h3>
        {monthlyRevenue.length > 0 ? (
          <RevenueChart data={monthlyRevenue} />
        ) : (
          <p className="text-sm text-slate-400 py-8 text-center">No completed payments in the last 6 months.</p>
        )}
        <p className="text-xs text-slate-400 mt-3">Read-only view from completed payments.</p>
      </section>

      {/* Recent Quotations */}
      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-sm font-semibold text-slate-700">Recent Quotations</h3>
        </div>
        {recentQuotations.length === 0 ? (
          <p className="text-sm text-slate-400 px-6 py-8 text-center">No quotations yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Number</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentQuotations.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 font-mono text-slate-700">{q.quotationNumber}</td>
                    <td className="px-6 py-3 text-slate-900">{q.customerName}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass(q.status)}`}>
                        {statusLabel(q.status)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-slate-700">
                      {q.totalAmount != null ? `UGX ${q.totalAmount.toLocaleString('en-UG')}` : '—'}
                    </td>
                    <td className="px-6 py-3 text-slate-500">
                      {q.createdAt ? new Date(q.createdAt).toLocaleDateString('en-UG') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Coming soon */}
      <ComingSoon
        module="Pipeline stages & lead sources"
        description="Visual pipeline board and lead source attribution will be available in a later phase."
      />
    </div>
  );
}
