import { db } from '@/db';
import { users, roles, rolesUsers } from '@/db/schema';
import { eq, desc, isNull } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

async function createUser(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session || session.user.role !== 'super_admin') throw new Error('Unauthorized');

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const roleId = formData.get('roleId') as string;

  const passwordHash = await bcrypt.hash(password, 12);
  const [newUser] = await db.insert(users).values({
    email, passwordHash, firstName, lastName,
    emailVerified: false, isActive: true,
  }).returning();

  if (roleId) {
    await db.insert(rolesUsers).values({ userId: newUser.id, roleId });
  }
  revalidatePath('/admin/users');
  redirect('/admin/users');
}

async function updateUser(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session || session.user.role !== 'super_admin') throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const email = formData.get('email') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const isActive = formData.get('isActive') === 'on';
  const roleId = formData.get('roleId') as string;

  await db.update(users).set({ email, firstName, lastName, isActive }).where(eq(users.id, id));

  if (roleId) {
    await db.delete(rolesUsers).where(eq(rolesUsers.userId, id));
    await db.insert(rolesUsers).values({ userId: id, roleId });
  }
  revalidatePath('/admin/users');
  redirect('/admin/users');
}

async function deleteUser(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session || session.user.role !== 'super_admin') throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  if (id === session.user.id) throw new Error('Cannot delete yourself');

  await db.update(users).set({ deletedAt: new Date(), isActive: false }).where(eq(users.id, id));
  revalidatePath('/admin/users');
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; edit?: string }>;
}) {
  const params = await searchParams;
  const showCreate = params.action === 'create';
  const editId = params.edit;

  const allUsers = await db.query.users.findMany({
    where: isNull(users.deletedAt),
    with: { rolesUsers: { with: { role: true } } },
    orderBy: desc(users.createdAt),
  });

  const allRoles = await db.select().from(roles);
  // Only allow assigning sub-admin roles — super_admin is reserved
  const assignableRoles = allRoles.filter((r) => r.name !== 'super_admin');
  const editUser = editId ? allUsers.find((u) => u.id === editId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500 text-sm mt-1">{allUsers.length} users total</p>
        </div>
        {!showCreate && !editUser && (
          <Link
            href="/admin/users?action=create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          >
            + Add User
          </Link>
        )}
      </div>

      {(showCreate || editUser) && (
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editUser ? 'Edit User' : 'Create New User'}
          </h3>
          <form action={editUser ? updateUser : createUser} className="space-y-4">
            {editUser && <input type="hidden" name="id" value={editUser.id} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  name="firstName"
                  defaultValue={editUser?.firstName}
                  required
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  name="lastName"
                  defaultValue={editUser?.lastName}
                  required
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editUser?.email}
                  required
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {!editUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="roleId"
                  defaultValue={editUser?.rolesUsers[0]?.role.id}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Role</option>
                  {assignableRoles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              {editUser && (
                <div className="flex items-center gap-2 pt-6">
                  <input type="checkbox" name="isActive" id="isActive" defaultChecked={editUser.isActive ?? true} />
                  <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                {editUser ? 'Update User' : 'Create User'}
              </button>
              <Link href="/admin/users" className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {allUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {user.rolesUsers[0]?.role.name || 'No role'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/users?edit=${user.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={user.id} />
                      <button type="submit" className="text-sm text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {allUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
