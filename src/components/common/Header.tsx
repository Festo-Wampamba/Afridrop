/* eslint-disable react/no-array-index-key */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavItem } from '@/types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { 
    label: 'Client Portal', 
    href: '#', // Changed to # since it's a dropdown trigger
    children: [
      { label: 'Client Login', href: '/portal/login' },
      { label: 'Technician Portal', href: '/portal/technician' }
    ]
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileSubMenu = (label: string) => {
    if (mobileSubMenuOpen === label) {
      setMobileSubMenuOpen(null);
    } else {
      setMobileSubMenuOpen(label);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="shrink-0">
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
          <ul className="flex gap-4 lg:gap-8 items-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="relative group">
                {item.children ? (
                  <div className="relative">
                    <button 
                      className="text-slate-600 hover:text-[#009FCE] font-medium transition-colors flex items-center gap-1 py-2 group-hover:text-[#009FCE]"
                    >
                      {item.label}
                      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full right-0 w-48 bg-white shadow-xl rounded-lg py-2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right border border-slate-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-[#009FCE] text-sm transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-[#009FCE] font-medium transition-colors relative group whitespace-nowrap"
                  >
                    {item.label}
                    <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#009FCE] transition-all group-hover:w-full"></span>
                  </Link>
                )}
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
            <div key={item.label} className="border-b border-gray-100 last:border-0">
               {item.children ? (
                 <div>
                   <button 
                      onClick={() => toggleMobileSubMenu(item.label)}
                      className="w-full text-left flex justify-between items-center text-slate-600 hover:text-[#009FCE] font-medium py-2"
                   >
                     {item.label}
                     <ChevronDown size={16} className={`transition-transform ${mobileSubMenuOpen === item.label ? 'rotate-180' : ''}`} />
                   </button>
                   <div className={`pl-4 bg-slate-50 rounded-lg overflow-hidden transition-all duration-300 ${mobileSubMenuOpen === item.label ? 'max-h-40 py-2' : 'max-h-0'}`}>
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block py-2 text-slate-500 hover:text-[#009FCE] text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                   </div>
                 </div>
               ) : (
                <Link
                  href={item.href}
                  className="block text-slate-600 hover:text-[#009FCE] font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
               )}
            </div>
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
