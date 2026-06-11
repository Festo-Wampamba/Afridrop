import { Search } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';
import { getTechnicianAvailability, getRecentInquiries } from './actions';

function availabilityBadge(activeJobs: number) {
  if (activeJobs === 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
        Available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
      Busy
    </span>
  );
}

function formatTime(date: Date | string | null) {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-UG', {
    timeZone: 'Africa/Kampala',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function ReceptionTodayPage() {
  const [technicians, inquiries] = await Promise.all([
    getTechnicianAvailability(),
    getRecentInquiries(),
  ]);

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Today</h2>
        <p className="text-sm text-gray-500 mt-1">Front-desk overview — technician status, recent inquiries, and quick contact lookup.</p>
      </div>

      {/* Quick contact search */}
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Contact Search</h3>
        <form method="GET" action="/reception/contacts" className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              name="q"
              type="search"
              placeholder="Search client name or phone…"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009FCE] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#009FCE] px-4 py-2 text-sm font-medium text-white hover:bg-[#007fa8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#009FCE]"
          >
            Search
          </button>
        </form>
      </div>

      {/* Technician availability grid */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Technician Availability
          <span className="ml-2 text-sm font-normal text-gray-400">({technicians.length})</span>
        </h3>
        {technicians.length === 0 ? (
          <div className="bg-white rounded-xl border shadow-sm p-10 text-center text-sm text-gray-400">
            No active technicians on record
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {technicians.map((tech) => (
              <div key={tech.id} className="bg-white rounded-xl border shadow-sm p-4 flex flex-col gap-2">
                <p className="text-sm font-semibold text-gray-900 truncate">{tech.name}</p>
                <div className="flex items-center justify-between gap-2">
                  {availabilityBadge(tech.activeJobs)}
                  <span className="text-xs text-gray-400">
                    {tech.activeJobs} job{tech.activeJobs !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent inquiries */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-800">Recent Inquiries</h3>
        </div>
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-xl border shadow-sm p-10 text-center text-sm text-gray-400">
            No inbound inquiries yet
          </div>
        ) : (
          <div className="bg-white rounded-xl border shadow-sm divide-y">
            {inquiries.map((inq) => (
              <div key={inq.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{inq.senderName}</p>
                    <p className="text-xs font-medium text-gray-600 mt-0.5 truncate">{inq.subject}</p>
                    {inq.snippet && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{inq.snippet}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                    {formatTime(inq.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coming soon modules */}
      <div className="grid gap-4 sm:grid-cols-3">
        <ComingSoon
          module="Appointments Calendar"
          description="Schedule and track client appointments directly from the front desk."
        />
        <ComingSoon
          module="Visitor Log"
          description="Record walk-in visitors and on-site guest activity."
        />
        <ComingSoon
          module="Call Log"
          description="Track inbound and outbound calls with notes and follow-ups."
        />
      </div>
    </div>
  );
}
