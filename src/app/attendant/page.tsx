import { Clock, CheckCircle2, MapPin } from 'lucide-react';
import { getAttendantData } from './actions';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-600',
};

export default async function AttendantDashboardPage() {
  const { jobs, stats } = await getAttendantData();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center gap-4">
          <div className="h-11 w-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">{stats.pending}</p>
            <p className="text-sm text-gray-500">Pending Jobs</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center gap-4">
          <div className="h-11 w-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">{stats.completed}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b">
          <h2 className="font-semibold text-gray-900">My Jobs</h2>
        </div>
        {jobs.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-gray-400">No jobs assigned to you yet.</p>
        ) : (
          <ul className="divide-y">
            {jobs.map((j) => {
              const status = j.status ?? 'pending';
              return (
                <li key={j.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">{j.customerName ?? 'Customer'}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{j.projectDescription ?? j.quotationNumber}</p>
                      {j.location && (
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <MapPin size={12} /> {j.location}
                        </p>
                      )}
                    </div>
                    <span className={`shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {status.replace('_', ' ')}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
