import { getManagerJobsView } from '../actions';
import { JobsBoard } from '@/components/dashboard/JobsBoard';

export default async function ManagerJobsPage() {
  const { jobs, attendants, clientNameByUserId } = await getManagerJobsView();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Jobs &amp; Service Requests</h2>
        <p className="text-sm text-gray-500 mt-1">Assign technicians, track progress, and verify completed work.</p>
      </div>
      <JobsBoard jobs={jobs} attendants={attendants} clientNameByUserId={clientNameByUserId} path="/manager/jobs" />
    </div>
  );
}
