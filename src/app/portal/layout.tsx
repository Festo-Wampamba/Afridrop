import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {children}
    </div>
  );
}
