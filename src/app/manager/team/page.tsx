import { getManagerTeam } from '../actions';
import { TeamGrid } from '@/components/dashboard/TeamGrid';

export default async function ManagerTeamPage() {
  const team = await getManagerTeam();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Team Progress</h2>
        <p className="text-sm text-gray-500 mt-1">Technician workload across your assigned jobs.</p>
      </div>
      <TeamGrid team={team} />
    </div>
  );
}
