'use client';

import { usePathname } from 'next/navigation';
import Header from '../common/Header';
import Footer from '../common/Footer';

// Authenticated/app areas render their own chrome — never the marketing
// header/footer (which otherwise overlaps dashboard content).
const APP_PREFIXES = ['/admin', '/manager', '/technician', '/director', '/sales', '/accounts', '/reception', '/portal', '/auth'];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isApp = APP_PREFIXES.some((p) => pathname?.startsWith(p));

  return (
    <>
      {!isApp && <Header />}
      <main className={`min-h-screen ${!isApp ? 'pt-[72px]' : ''}`}>
        {children}
      </main>
      {!isApp && <Footer />}
    </>
  );
}
