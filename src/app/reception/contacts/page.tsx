import { Search } from 'lucide-react';
import { SubmitButton } from '@/components/dashboard/SubmitButton';
import { getContactDirectory } from '../actions';
import { updateClientContact } from '../contact-actions';

function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: 'bg-green-50 text-green-700',
    lead: 'bg-blue-50 text-blue-700',
    inactive: 'bg-gray-100 text-gray-500',
  };
  const labels: Record<string, string> = { active: 'Active', lead: 'Lead', inactive: 'Inactive' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {labels[status] ?? status}
    </span>
  );
}

type Props = {
  searchParams: Promise<{ q?: string; edit?: string }>;
};

export default async function ReceptionContactsPage({ searchParams }: Props) {
  const { q, edit } = await searchParams;
  const contacts = await getContactDirectory(q);

  const editingId = edit ?? null;
  const editingContact = editingId ? contacts.find((c) => c.id === editingId) : null;

  return (
    <div className="space-y-6">
      {/* Header + search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contacts</h2>
          <p className="text-sm text-gray-500 mt-1">
            {contacts.length} client{contacts.length !== 1 ? 's' : ''}
            {q ? ` matching "${q}"` : ''}
          </p>
        </div>
        <form method="GET" action="/reception/contacts" className="flex gap-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              name="q"
              type="search"
              defaultValue={q ?? ''}
              placeholder="Name or phone…"
              className="rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-[#009FCE] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#009FCE] px-3 py-2 text-sm font-medium text-white hover:bg-[#007fa8] transition-colors"
          >
            Search
          </button>
          {q && (
            <a href="/reception/contacts" className="rounded-lg border px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
              Clear
            </a>
          )}
        </form>
      </div>

      {/* Inline edit panel — rendered when ?edit=<id> */}
      {editingContact && (
        <div className="bg-[#EFF8FB] border border-[#009FCE]/30 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#00477A] mb-4">
            Edit contact info — {editingContact.name}
          </h3>
          <form action={updateClientContact}>
            <input type="hidden" name="clientId" value={editingContact.id} />
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  defaultValue={editingContact.phone ?? ''}
                  maxLength={30}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009FCE]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={editingContact.email ?? ''}
                  maxLength={200}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009FCE]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                <input
                  name="city"
                  type="text"
                  defaultValue={editingContact.city ?? ''}
                  maxLength={100}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009FCE]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                <input
                  name="address"
                  type="text"
                  defaultValue={editingContact.address ?? ''}
                  maxLength={200}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009FCE]"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <SubmitButton
                label="Save changes"
                pendingLabel="Saving…"
                className="rounded-lg bg-[#00477A] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a63] transition-colors disabled:opacity-60"
              />
              <a
                href={`/reception/contacts${q ? `?q=${encodeURIComponent(q)}` : ''}`}
                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      )}

      {/* Directory table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {contacts.length === 0 ? (
          <div className="p-16 text-center text-sm text-gray-400">
            {q ? `No clients found matching "${q}"` : 'No clients on record yet'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Phone</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">City</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {contacts.map((c) => {
                  const isEditing = c.id === editingId;
                  const editHref = isEditing
                    ? `/reception/contacts${q ? `?q=${encodeURIComponent(q)}` : ''}`
                    : `/reception/contacts?edit=${c.id}${q ? `&q=${encodeURIComponent(q)}` : ''}`;
                  return (
                    <tr key={c.id} className={isEditing ? 'bg-[#EFF8FB]' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-3 text-sm font-medium text-gray-900">{c.name}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{c.phone ?? '—'}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{c.email ?? '—'}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{c.city ?? '—'}</td>
                      <td className="px-6 py-3">{statusBadge(c.status)}</td>
                      <td className="px-6 py-3 text-right">
                        <a
                          href={editHref}
                          className="text-xs font-medium text-[#009FCE] hover:underline"
                        >
                          {isEditing ? 'Close' : 'Edit'}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
