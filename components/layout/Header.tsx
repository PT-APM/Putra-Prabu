"use client";

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { localeHref, stripLocaleFromPathname } from '@/lib/i18n/path';
import type { Locale } from '@/lib/i18n/config';

type NavLink = {
  name: string;
  path: string;
};

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  const navLinks: NavLink[] = [
    { name: dict.common.nav.home, path: '/' },
    { name: dict.common.nav.about, path: '/about' },
    { name: dict.common.nav.news, path: '/news' },
    { name: dict.common.nav.contact, path: '/contact' },
  ];

  // Tutup menu mobile otomatis setiap kali berpindah halaman (disesuaikan saat render,
  // bukan di useEffect, supaya tidak ada frame ekstra menu masih terbuka di halaman baru)
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  const currentPath = stripLocaleFromPathname(pathname);
  const isLinkActive = (path: string) =>
    currentPath === path || (path === '/news' && currentPath.startsWith('/news'));

  return (
    <header className="bg-background/90 backdrop-blur-sm text-primary font-body-md text-body-md fixed top-0 w-full z-50 border-b border-outline-variant/30 shadow-sm">
      <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-20">

        <div className="flex items-center gap-4">
          <Link href={localeHref(locale, '/')} className="hover:opacity-95 transition-opacity">
            <Logo variant="horizontal" iconSize={44} useImageIcon />
          </Link>
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={localeHref(locale, link.path)}
              className={`transition-colors duration-200 cursor-pointer transition-transform active:scale-95 ${
                isLinkActive(link.path)
                  ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Suspense fallback={null}>
              <LanguageSwitcher locale={locale} />
            </Suspense>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden text-primary p-2"
            aria-label={isMenuOpen ? dict.common.closeMenu : dict.common.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav-menu"
          className="md:hidden border-t border-outline-variant/30 bg-background px-gutter py-4 flex flex-col gap-1 shadow-sm"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={localeHref(locale, link.path)}
              className={`px-3 py-3 rounded-xl transition-colors ${
                isLinkActive(link.path)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-secondary hover:bg-surface-container-low hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Suspense fallback={null}>
              <LanguageSwitcher locale={locale} />
            </Suspense>
          </div>
        </nav>
      )}
    </header>
  );
}
