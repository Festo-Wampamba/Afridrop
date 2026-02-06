'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { NavItem } from '@/types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Client Portal', href: '/portal/login' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/Images/logo_Afridrop_Solutions.png"
            alt="Afridrop Solutions Logo"
            width={147}
            height={75}
            priority
            className="h-12 w-auto md:h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <ul className="flex gap-4 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-slate-600 hover:text-[#009FCE] font-medium transition-colors relative group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#009FCE] transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="bg-[#009FCE] hover:bg-[#007FA5] text-white px-4 lg:px-6 py-2.5 rounded-md font-semibold transition-colors whitespace-nowrap"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-lg flex flex-col p-4 gap-4 transition-all duration-300 origin-top md:hidden ${
            isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 overflow-hidden'
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-slate-600 hover:text-[#009FCE] font-medium py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-[#009FCE] hover:bg-[#007FA5] text-white text-center px-6 py-3 rounded-md font-semibold mt-2"
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
