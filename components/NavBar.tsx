'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/demo', label: 'Demo' },
  { href: '/impact', label: 'Impact' },
  { href: '/tech', label: 'Tech Stack' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[#F0F4FF] hover:text-[#00C896] transition-colors shrink-0">
          <span>💰 Money Co-Pilot</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-all duration-200 ${
                pathname === link.href
                  ? 'text-[#00C896] font-medium'
                  : 'text-[#8892A4] hover:text-[#F0F4FF]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className={`text-sm transition-all duration-200 ${
              pathname === '/signin'
                ? 'text-[#00C896] font-medium'
                : 'text-[#8892A4] hover:text-[#F0F4FF]'
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-[#00C896] text-[#0A0F1E] px-4 py-1.5 rounded-full hover:bg-[#00b086] transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
