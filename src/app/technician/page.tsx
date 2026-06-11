import { MapPin, Phone, Wrench, CheckCircle2, Clock } from 'lucide-react';
import { getMyJobs, getMyCompletedToday, updateMyJobStatus } from './actions';
import { JOB_STATUS_COLORS } from '@/lib/work';
import { SubmitButton } from '@/components/dashboard/SubmitButton';

function todayLabel() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Africa/Kampala' });
}

export default async function TechnicianPage() {
  const [activeJobs, completedToday] = await Promise.all([getMyJobs(), getMyCompletedToday()]);

  // In-progress first, then assigned.
  const sorted = [...activeJobs].sort((a, b) => {
    if (a.status === 'in_progress' && b.status !== 'in_progress') return -1;
    if (b.status === 'in_progress' && a.status !== 'in_progress') return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header block */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">My Tasks</h2>
          <p className="text-sm text-gray-500 mt-0.5">{todayLabel()}</p>
        </div>
        <span className="inline-flex items-center justify-center h-8 min-w-8 px-2 rounded-full bg-[#009FCE] text-white text-sm font-bold">
          {activeJobs.length}
        </span>
      </div>

      {/* Active jobs */}
      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
          <Wrench size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="font-medium text-gray-500">No tasks assigned right now</p>
          <p className="text-sm text-gray-400 mt-1">Check back later or contact your manager.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sorted.map((job) => {
            const isInProgress = job.status === 'in_progress';
            const statusColor = JOB_STATUS_COLORS[job.status ?? 'assigned'] ?? 'bg-gray-100 text-gray-600';

            return (
              <li
                key={job.id}
                className={`rounded-2xl border bg-white shadow-sm overflow-hidden ${isInProgress ? 'ring-2 ring-[#009FCE]' : ''}`}
              >
                <div className="p-4 space-y-3">
                  {/* Customer + status */}
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-gray-900 leading-tight">{job.customerName}</p>
                    <span
                      className={`shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor}`}
                    >
                      {(job.status ?? 'assigned').replace('_', ' ')}
                    </span>
                  </div>

                  {/* Description */}
                  {job.projectDescription && (
                    <p className="text-sm text-gray-600 line-clamp-2">{job.projectDescription}</p>
                  )}

                  {/* Location */}
                  {job.location && (
                    <p className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={14} className="shrink-0 text-[#009FCE]" />
                      {job.location}
                    </p>
                  )}

                  {/* Address from client */}
                  {(job.clientAddress || job.clientCity) && (
                    <p className="text-xs text-gray-400 pl-0.5">
                      {[job.clientAddress, job.clientCity].filter(Boolean).join(', ')}
                    </p>
                  )}

                  {/* Phone */}
                  {job.clientPhone && (
                    <a
                      href={`tel:${job.clientPhone}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-50 border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                    >
                      <Phone size={14} className="text-[#009FCE]" />
                      {job.clientPhone}
                    </a>
                  )}

                  {/* Action button */}
                  <form action={updateMyJobStatus}>
                    <input type="hidden" name="jobId" value={job.id} />
                    <input type="hidden" name="currentStatus" value={job.status ?? ''} />
                    <SubmitButton
                      label={isInProgress ? 'Mark Complete' : 'Start Job'}
                      pendingLabel="Working…"
                      className={`w-full h-12 rounded-xl text-white font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 ${
                        isInProgress
                          ? 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500'
                          : 'bg-[#009FCE] hover:bg-[#007baa] focus:ring-[#009FCE]'
                      }`}
                    />
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Completed today */}
      {completedToday.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Completed today ({completedToday.length})
          </h3>
          <ul className="space-y-2">
            {completedToday.map((job) => (
              <li key={job.id} className="flex items-center gap-3 rounded-xl bg-white border px-4 py-3">
                <CheckCircle2 size={16} className="shrink-0 text-teal-500" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{job.customerName}</p>
                  {job.location && (
                    <p className="text-xs text-gray-400 truncate">{job.location}</p>
                  )}
                </div>
                <span className="ml-auto shrink-0 text-xs text-gray-400 capitalize">
                  {(job.status ?? 'completed').replace('_', ' ')}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Coming soon */}
      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Coming soon</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin, label: 'Map navigation' },
            { icon: Clock, label: 'Time logs & field notes' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-xl border border-dashed border-gray-200 bg-white/60 p-4 flex flex-col items-center gap-2 text-center"
            >
              <Icon size={20} className="text-gray-300" />
              <p className="text-xs text-gray-400 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
