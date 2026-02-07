import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '../components/layout/ClientLayout';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Afridrop Solutions Limited | Swimming Pool Services',
  description: "Uganda's premier swimming pool construction, maintenance, and water treatment provider.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-800">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
