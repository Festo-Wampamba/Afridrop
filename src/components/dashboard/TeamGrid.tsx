type TeamMember = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  total: number;
  active: number;
  completed: number;
  verified: number;
};

function Metric({ label, value, tint }: { label: string; value: number; tint: string }) {
  return (
    <div className="text-center">
      <p className={`text-lg font-bold tabular-nums ${tint}`}>{value}</p>
      <p className="text-[11px] text-gray-400 uppercase tracking-wide">{label}</p>
    </div>
  );
}

export function TeamGrid({ team }: { team: TeamMember[] }) {
  if (team.length === 0) {
    return (
      <div className="bg-white rounded-xl border shadow-sm px-5 py-16 text-center text-sm text-gray-400">
        No technicians found. Create technician accounts in User Management.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {team.map((a) => (
        <div key={a.id} className="bg-white rounded-xl border shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#00477A] text-white flex items-center justify-center text-sm font-bold">
              {a.firstName[0]}{a.lastName[0]}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{a.firstName} {a.lastName}</p>
              <p className="text-xs text-gray-400 truncate">{a.email}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 pt-4 border-t">
            <Metric label="Total" value={a.total} tint="text-gray-900" />
            <Metric label="Active" value={a.active} tint="text-blue-600" />
            <Metric label="Done" value={a.completed} tint="text-teal-600" />
            <Metric label="Verified" value={a.verified} tint="text-green-600" />
          </div>
        </div>
      ))}
    </div>
  );
}
