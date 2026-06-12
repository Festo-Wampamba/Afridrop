'use server';

import { db } from '@/db';
import { users } from '@/db/schema/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { requireRole } from '@/lib/auth';

export async function provisionTechnician(formData: FormData) {
  await requireRole(['manager', 'director', 'super_admin']);

  const firstName = (formData.get('firstName') as string | null)?.trim() ?? '';
  const lastName = (formData.get('lastName') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim().toLowerCase() ?? '';
  const password = (formData.get('password') as string | null)?.trim() ?? '';

  if (!firstName) redirect('/manager/team?error=missing_first_name');
  if (!lastName) redirect('/manager/team?error=missing_last_name');
  if (!email) redirect('/manager/team?error=missing_email');
  if (password.length < 8) redirect('/manager/team?error=password_too_short');

  // Check for existing user before attempting signup.
  const existing = await db
    .select({ id: users.id, deletedAt: users.deletedAt })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    const u = existing[0];
    redirect(u.deletedAt ? '/manager/team?error=deactivated' : '/manager/team?error=duplicate');
  }

  // signUpEmail works for any caller (no admin role required).
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
      },
    });
  } catch (e) {
    console.error('provisionTechnician signUpEmail failed:', e);
    redirect('/manager/team?error=create_failed');
  }

  // signUpEmail defaults role to 'customer' — flip to technician.
  await db
    .update(users)
    .set({ role: 'technician', firstName, lastName, isActive: true })
    .where(eq(users.email, email));

  revalidatePath('/manager/team');
  redirect('/manager/team');
}
