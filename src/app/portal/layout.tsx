import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { homeForRole } from '@/lib/roles';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }

  // Portal is the customer area. Staff/admin roles are sent to their own home.
  const role = (session.user as { role?: string }).role;
  if (role && role !== 'customer') {
    redirect(homeForRole(role));
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {children}
    </div>
  );
}
