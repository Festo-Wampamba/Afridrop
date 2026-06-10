import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { homeForRole } from '@/lib/roles';

export default async function ReceptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }

  const role = (session.user as { role?: string }).role;
  if (role !== 'receptionist') {
    redirect(homeForRole(role));
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="bg-[#00477A] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#B6E9F4]">Reception Dashboard</p>
          <h1 className="text-xl font-bold mt-0.5">{session.user.name}</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
