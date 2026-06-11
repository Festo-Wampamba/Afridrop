import Link from 'next/link';
import { TrendingUp, Briefcase, ShoppingCart, Users, CheckSquare } from 'lucide-react';
import { getCompanyOverview, getPendingApprovals } from './actions';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ComingSoon } from '@/components/dashboard/ComingSoon';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  assigned: 'bg-indigo-100 text-indigo-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-teal-100 text-teal-800',
  verified: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-600',
  // approval-workflow statuses
  reviewed: 'bg-purple-100 text-purple-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  converted: 'bg-cyan-100 text-cyan-800',
};

function fmtUGX(amount: number) {
  return `UGX ${amount.toLocaleString('en-UG')}`;
}

export default async function DirectorPage() {
  const [overview, pendingApprovals] = await Promise.all([
    getCompanyOverview(),
    getPendingApprovals(),
  ]);

  const activeClients = overview.clientsByStatus
    .filter((c) => c.status === 'active')
    .reduce((sum, c) => sum + c.count, 0);

  const activeJobs = overview.jobsByStatus
    .filter((j) => j.status === 'assigned' || j.status === 'in_progress')
    .reduce((sum, j) => sum + j.count, 0);

  const stats = [
    {
      label: 'Total Revenue',
      value: fmtUGX(overview.totalRevenue),
      icon: TrendingUp,
      color: 'bg-[#009FCE]',
    },
    {
      label: 'Active Jobs',
      value: activeJobs,
      icon: Briefcase,
      color: 'bg-[#00477A]',
    },
    {
      label: 'Total Orders',
      value: overview.totalOrders,
      icon: ShoppingCart,
      color: 'bg-indigo-500',
    },
    {
      label: 'Active Clients',
      value: activeClients,
      icon: Users,
      color: 'bg-teal-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Company Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Macro view of Afridrop Solutions Ltd</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#009FCE]/10 text-[#00477A] border border-[#009FCE]/30">
          Director
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg text-white shrink-0`}>
                <stat.icon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-0.5 truncate">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart + jobs by status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl border p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue — Last 6 Months</h3>
          {overview.monthlyRevenue.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">No revenue data yet</p>
          ) : (
            <RevenueChart data={overview.monthlyRevenue} />
          )}
        </div>

        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Jobs by Status</h3>
          {overview.jobsByStatus.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">No jobs yet</p>
          ) : (
            <ul className="space-y-2">
              {overview.jobsByStatus
                .sort((a, b) => b.count - a.count)
                .map((item) => (
                  <li key={item.status} className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        STATUS_COLORS[item.status] ?? 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Pending approvals callout */}
      <Link
        href="/director/approvals"
        className="block bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-lg">
              <CheckSquare size={22} className="text-amber-700" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Pending Approvals</p>
              <p className="text-sm text-gray-500 mt-0.5">Quotations awaiting your review</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            {pendingApprovals.length > 0 ? (
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-amber-500 text-white text-sm font-bold">
                {pendingApprovals.length}
              </span>
            ) : (
              <span className="text-sm text-gray-400">None</span>
            )}
          </div>
        </div>
      </Link>

      {/* Future-phase placeholders */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ComingSoon
            module="Expense Approvals"
            description="Review and approve company expense requests."
          />
          <ComingSoon
            module="Contract Approvals"
            description="Review and sign off on client contracts."
          />
          <ComingSoon
            module="Client Onboarding Approvals"
            description="Approve new client onboarding workflows."
          />
        </div>
      </div>
    </div>
  );
}
