import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { auth, getSession } from '@/lib/auth';

async function updateProfile(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  await db.update(users).set({
    firstName, lastName, email,
    name: `${firstName} ${lastName}`,
    phone: phone || null,
    updatedAt: new Date(),
  }).where(eq(users.id, session.user.id));
  revalidatePath('/admin/settings');
}

async function changePassword(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (newPassword !== confirmPassword) throw new Error('Passwords do not match');
  if (newPassword.length < 8) throw new Error('Password must be at least 8 characters');

  // Better Auth verifies the current password and re-hashes the new one.
  await auth.api.changePassword({
    body: { currentPassword, newPassword, revokeOtherSessions: true },
    headers: await headers(),
  });
  revalidatePath('/admin/settings');
}

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user) return null;

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your account settings</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <form action={updateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input id="firstName" name="firstName" defaultValue={user.firstName} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input id="lastName" name="lastName" defaultValue={user.lastName} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" type="email" name="email" defaultValue={user.email} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input id="phone" name="phone" defaultValue={user.phone ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
            Update Profile
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <form action={changePassword} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input id="currentPassword" type="password" name="currentPassword" required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input id="newPassword" type="password" name="newPassword" required minLength={8} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input id="confirmPassword" type="password" name="confirmPassword" required minLength={8} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
            Change Password
          </button>
        </form>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <dl className="space-y-3">
          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">Role</dt>
            <dd className="text-sm font-medium text-gray-900 capitalize">{session.user.role?.replace('_', ' ')}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">Account Status</dt>
            <dd className="text-sm font-medium text-green-600">Active</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">Member Since</dt>
            <dd className="text-sm font-medium text-gray-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">Last Login</dt>
            <dd className="text-sm font-medium text-gray-900">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
