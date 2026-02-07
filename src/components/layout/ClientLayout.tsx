'use client';

import { usePathname } from 'next/navigation';
import Header from '../common/Header';
import Footer from '../common/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith('/portal');

  return (
    <>
      {!isPortal && <Header />}
      <main className={`min-h-screen ${!isPortal ? 'pt-[72px]' : ''}`}>
        {children}
      </main>
      {!isPortal && <Footer />}
    </>
  );
}
