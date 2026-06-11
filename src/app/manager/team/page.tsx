import { getManagerTeam } from '../actions';
import { provisionTechnician } from '../team-actions';
import { TeamGrid } from '@/components/dashboard/TeamGrid';
import { SubmitButton } from '@/components/dashboard/SubmitButton';

const ERROR_MESSAGES: Record<string, string> = {
  missing_first_name: 'First name is required.',
  missing_last_name: 'Last name is required.',
  missing_email: 'Email address is required.',
  password_too_short: 'Password must be at least 8 characters.',
  deactivated: 'This email belongs to a deactivated account.',
  duplicate: 'A user with this email already exists.',
  create_failed: 'Failed to create account. Please try again.',
};

export default async function ManagerTeamPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [team, params] = await Promise.all([getManagerTeam(), searchParams]);
  const errorMessage = params.error ? (ERROR_MESSAGES[params.error] ?? 'An error occurred.') : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Team Progress</h2>
        <p className="text-sm text-gray-500 mt-1">Technician workload across your assigned jobs.</p>
      </div>
      <TeamGrid team={team} />

      {/* Add Technician */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Add Technician</h3>
        <p className="text-sm text-gray-500 mb-4">Provision a new technician account.</p>

        {errorMessage && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form action={provisionTechnician} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="techEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="techEmail"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="techPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="techPassword"
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <SubmitButton
              label="Create Technician"
              pendingLabel="Creating…"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            />
          </div>
        </form>
        <p className="text-xs text-gray-400 mt-3">
          Technician signs in at <span className="font-mono">/auth/login</span> with this email + password.
        </p>
      </div>
    </div>
  );
}
