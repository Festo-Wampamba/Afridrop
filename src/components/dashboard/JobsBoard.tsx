import { MapPin, BadgeCheck } from 'lucide-react';
import { JOB_STATUSES, JOB_STATUS_COLORS } from '@/lib/work';
import { assignAttendant, setJobStatus, verifyJob } from '@/lib/work-actions';
import type { quotations } from '@/db/schema/quotations';

type JobRow = {
  job: typeof quotations.$inferSelect;
  assignee: { id: string | null; firstName: string | null; lastName: string | null } | null;
};

type Technician = { id: string; firstName: string; lastName: string; email: string };

export function JobsBoard({
  jobs,
  attendants,
  clientNameByUserId,
  path,
}: {
  jobs: JobRow[];
  attendants: Technician[];
  clientNameByUserId: Map<string, string>;
  path: string;
}) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl border shadow-sm px-5 py-16 text-center text-sm text-gray-400">
        No service requests yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {jobs.map(({ job, assignee }) => {
        const status = job.status ?? 'pending';
        const clientName =
          (job.customerId && clientNameByUserId.get(job.customerId)) || job.customerName || 'Client';

        return (
          <div key={job.id} className="bg-white rounded-xl border shadow-sm p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{clientName}</p>
                <p className="text-xs text-gray-400">{job.quotationNumber}</p>
              </div>
              <span className={`shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${JOB_STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-600'}`}>
                {status.replace('_', ' ')}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-700 line-clamp-2">{job.projectDescription}</p>
              {job.location && (
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <MapPin size={12} /> {job.location}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t">
              {/* Assign attendant */}
              <form action={assignAttendant} className="space-y-1.5 pt-3">
                <input type="hidden" name="jobId" value={job.id} />
                <input type="hidden" name="_path" value={path} />
                <label htmlFor={`att-${job.id}`} className="block text-xs font-medium text-gray-500">Technician</label>
                <div className="flex gap-2">
                  <select
                    id={`att-${job.id}`}
                    name="attendantId"
                    defaultValue={job.assignedTo ?? ''}
                    className="flex-1 min-w-0 px-2.5 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]"
                  >
                    <option value="">Unassigned</option>
                    {attendants.map((a) => (
                      <option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>
                    ))}
                  </select>
                  <button type="submit" className="px-3 py-1.5 bg-[#00477A] text-white text-xs font-medium rounded-lg hover:bg-[#002B4A] transition shrink-0">
                    Assign
                  </button>
                </div>
                {assignee?.firstName && (
                  <p className="text-xs text-gray-400">Current: {assignee.firstName} {assignee.lastName}</p>
                )}
              </form>

              {/* Status */}
              <form action={setJobStatus} className="space-y-1.5 pt-3">
                <input type="hidden" name="jobId" value={job.id} />
                <input type="hidden" name="_path" value={path} />
                <label htmlFor={`st-${job.id}`} className="block text-xs font-medium text-gray-500">Status</label>
                <div className="flex gap-2">
                  <select
                    id={`st-${job.id}`}
                    name="status"
                    defaultValue={status}
                    className="flex-1 min-w-0 px-2.5 py-1.5 border rounded-lg text-sm capitalize focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]"
                  >
                    {JOB_STATUSES.map((s) => (
                      <option key={s} value={s}>{s.replace('_', ' ')}</option>
                    ))}
                  </select>
                  <button type="submit" className="px-3 py-1.5 border border-[#00477A] text-[#00477A] text-xs font-medium rounded-lg hover:bg-slate-50 transition shrink-0">
                    Update
                  </button>
                </div>
              </form>
            </div>

            {status === 'completed' && (
              <form action={verifyJob} className="pt-1">
                <input type="hidden" name="jobId" value={job.id} />
                <input type="hidden" name="_path" value={path} />
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                  <BadgeCheck size={16} /> Verify completed work
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}
