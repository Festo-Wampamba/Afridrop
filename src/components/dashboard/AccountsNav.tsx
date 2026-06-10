'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CreditCard } from 'lucide-react';

const ITEMS = [
  { href: '/accounts', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/accounts/payments', label: 'Payments', icon: CreditCard, exact: false },
];

export function AccountsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto" aria-label="Accounts sections">
      {ITEMS.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname?.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              active
                ? 'border-[#009FCE] text-[#00477A]'
                : 'border-transparent text-slate-500 hover:text-[#00477A] hover:border-slate-300'
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
