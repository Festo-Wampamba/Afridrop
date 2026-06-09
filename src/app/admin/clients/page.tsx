import { db } from '@/db';
import { clients, users } from '@/db/schema';
import { and, desc, eq, isNull, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import Link from 'next/link';
import ClientsMap from '@/components/common/ClientsMap';

function toCoord(value: FormDataEntryValue | null): number | null {
  const n = parseFloat((value as string) ?? '');
  return Number.isFinite(n) ? n : null;
}

const POOL_TYPES = ['concrete', 'fiberglass', 'vinyl', 'other'];
const STATUSES = ['lead', 'active', 'inactive'];
const MANAGER_ROLES = ['manager', 'admin', 'super_admin'];

const statusColors: Record<string, string> = {
  lead: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-700',
};

async function createClient(formData: FormData) {
  'use server';
  const session = await requireRole();

  const name = (formData.get('name') as string)?.trim();
  if (!name) return;

  await db.insert(clients).values({
    name,
    email: (formData.get('email') as string) || null,
    phone: (formData.get('phone') as string) || null,
    city: (formData.get('city') as string) || null,
    address: (formData.get('address') as string) || null,
    latitude: toCoord(formData.get('latitude')),
    longitude: toCoord(formData.get('longitude')),
    poolType: (formData.get('poolType') as string) || null,
    poolSize: (formData.get('poolSize') as string) || null,
    equipment: (formData.get('equipment') as string) || null,
    status: (formData.get('status') as string) || 'lead',
    notes: (formData.get('notes') as string) || null,
    assignedManagerId: (formData.get('assignedManagerId') as string) || null,
    userId: (formData.get('userId') as string) || null,
    createdBy: session.user.id,
  });

  revalidatePath('/admin/clients');
  redirect('/admin/clients');
}

async function updateClient(formData: FormData) {
  'use server';
  await requireRole();

  const id = formData.get('id') as string;
  await db.update(clients).set({
    name: (formData.get('name') as string)?.trim(),
    email: (formData.get('email') as string) || null,
    phone: (formData.get('phone') as string) || null,
    city: (formData.get('city') as string) || null,
    address: (formData.get('address') as string) || null,
    latitude: toCoord(formData.get('latitude')),
    longitude: toCoord(formData.get('longitude')),
    poolType: (formData.get('poolType') as string) || null,
    poolSize: (formData.get('poolSize') as string) || null,
    equipment: (formData.get('equipment') as string) || null,
    status: (formData.get('status') as string) || 'lead',
    notes: (formData.get('notes') as string) || null,
    assignedManagerId: (formData.get('assignedManagerId') as string) || null,
    userId: (formData.get('userId') as string) || null,
    updatedAt: new Date(),
  }).where(eq(clients.id, id));

  revalidatePath('/admin/clients');
  redirect('/admin/clients');
}

async function deleteClient(formData: FormData) {
  'use server';
  await requireRole();
  const id = formData.get('id') as string;
  await db.update(clients).set({ deletedAt: new Date() }).where(eq(clients.id, id));
  revalidatePath('/admin/clients');
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; edit?: string; status?: string }>;
}) {
  const params = await searchParams;
  const showCreate = params.action === 'create';
  const statusFilter = STATUSES.includes(params.status ?? '') ? params.status : undefined;

  const allClients = await db
    .select()
    .from(clients)
    .where(
      and(
        isNull(clients.deletedAt),
        statusFilter ? eq(clients.status, statusFilter) : undefined,
      ),
    )
    .orderBy(desc(clients.createdAt));

  const managers = await db
    .select({ id: users.id, firstName: users.firstName, lastName: users.lastName })
    .from(users)
    .where(and(isNull(users.deletedAt), inArray(users.role, MANAGER_ROLES)));
  const managerName = new Map(managers.map((m) => [m.id, `${m.firstName} ${m.lastName}`]));

  // Customer-role users that can be linked as the client's portal account.
  const portalUsers = await db
    .select({ id: users.id, firstName: users.firstName, lastName: users.lastName, email: users.email })
    .from(users)
    .where(and(isNull(users.deletedAt), eq(users.role, 'customer')));

  const editClient = params.edit ? allClients.find((c) => c.id === params.edit) : null;
  const showForm = showCreate || !!editClient;

  const mapMarkers = allClients
    .filter((c) => c.latitude != null && c.longitude != null)
    .map((c) => ({ lat: c.latitude as number, lng: c.longitude as number, label: c.name }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
          <p className="text-gray-500 text-sm mt-1">{allClients.length} client{allClients.length === 1 ? '' : 's'}</p>
        </div>
        {!showForm && (
          <Link href="/admin/clients?action=create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
            + Add Client
          </Link>
        )}
      </div>

      {!showForm && (
        <div className="flex gap-2">
          <Link href="/admin/clients" className={`px-3 py-1.5 rounded-lg text-sm font-medium ${!statusFilter ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>All</Link>
          {STATUSES.map((s) => (
            <Link key={s} href={`/admin/clients?status=${s}`} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${statusFilter === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{s}</Link>
          ))}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">{editClient ? 'Edit Client' : 'New Client'}</h3>
          <form action={editClient ? updateClient : createClient} className="space-y-4">
            {editClient && <input type="hidden" name="id" value={editClient.id} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name / Company *</label>
                <input id="name" name="name" defaultValue={editClient?.name} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select id="status" name="status" defaultValue={editClient?.status ?? 'lead'} className="w-full px-3 py-2 border rounded-lg text-sm capitalize">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input id="email" type="email" name="email" defaultValue={editClient?.email ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input id="phone" name="phone" defaultValue={editClient?.phone ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input id="city" name="city" defaultValue={editClient?.city ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="assignedManagerId" className="block text-sm font-medium text-gray-700 mb-1">Assigned Manager</label>
                <select id="assignedManagerId" name="assignedManagerId" defaultValue={editClient?.assignedManagerId ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="">Unassigned</option>
                  {managers.map((m) => <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">Portal Account</label>
                <select id="userId" name="userId" defaultValue={editClient?.userId ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="">No portal account</option>
                  {portalUsers.map((u) => <option key={u.id} value={u.id}>{u.firstName} {u.lastName} ({u.email})</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">Links this client to a customer login so orders, quotes &amp; payments appear on the detail page.</p>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input id="address" name="address" defaultValue={editClient?.address ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <input id="latitude" name="latitude" type="number" step="any" defaultValue={editClient?.latitude ?? ''} placeholder="0.3176" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <input id="longitude" name="longitude" type="number" step="any" defaultValue={editClient?.longitude ?? ''} placeholder="32.6133" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="poolType" className="block text-sm font-medium text-gray-700 mb-1">Pool Type</label>
                <select id="poolType" name="poolType" defaultValue={editClient?.poolType ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm capitalize">
                  <option value="">—</option>
                  {POOL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="poolSize" className="block text-sm font-medium text-gray-700 mb-1">Pool Size</label>
                <input id="poolSize" name="poolSize" defaultValue={editClient?.poolSize ?? ''} placeholder="e.g. 8m x 4m" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
                <input id="equipment" name="equipment" defaultValue={editClient?.equipment ?? ''} placeholder="Pump, filter, heater…" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea id="notes" name="notes" defaultValue={editClient?.notes ?? ''} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                {editClient ? 'Update Client' : 'Create Client'}
              </button>
              <Link href="/admin/clients" className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition">Cancel</Link>
            </div>
          </form>
        </div>
      )}

      {!showForm && mapMarkers.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Client Locations</h3>
          <ClientsMap markers={mapMarkers} />
        </div>
      )}

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Pool</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {allClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link href={`/admin/clients/${client.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">{client.name}</Link>
                    {client.city && <p className="text-xs text-gray-500">{client.city}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {client.email && <p>{client.email}</p>}
                    {client.phone && <p className="text-gray-500">{client.phone}</p>}
                    {!client.email && !client.phone && <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                    {client.poolType || '—'}{client.poolSize ? ` · ${client.poolSize}` : ''}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {client.assignedManagerId ? managerName.get(client.assignedManagerId) ?? '—' : <span className="text-gray-400">Unassigned</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[client.status] ?? 'bg-gray-100 text-gray-700'}`}>{client.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/clients/${client.id}`} className="text-sm text-gray-600 hover:text-gray-900">View</Link>
                      <Link href={`/admin/clients?edit=${client.id}`} className="text-sm text-blue-600 hover:text-blue-800">Edit</Link>
                      <form action={deleteClient}>
                        <input type="hidden" name="id" value={client.id} />
                        <button type="submit" className="text-sm text-red-600 hover:text-red-800">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {allClients.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No clients yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
