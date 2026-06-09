import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth, getSession } from '@/lib/auth';
import { homeForRole } from '@/lib/roles';
import { LogOut, Globe } from 'lucide-react';

export default async function AttendantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }

  const role = (session.user as { role?: string }).role;
  if (role !== 'attendant') {
    redirect(homeForRole(role));
  }

  const initial = session.user.name?.[0]?.toUpperCase() ?? 'A';

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="bg-[#00477A] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#B6E9F4]">Attendant Dashboard</p>
            <h1 className="text-xl font-bold mt-0.5">{session.user.name}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">Website</span>
            </Link>
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
              {initial}
            </div>
            <form
              action={async () => {
                'use server';
                await auth.api.signOut({ headers: await headers() });
                redirect('/auth/login');
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
