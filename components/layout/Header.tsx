"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

// (Opsional tapi direkomendasikan) Definisikan tipe untuk data navigasi
type NavLink = {
  name: string;
  path: string;
};

export default function Header() {
  const pathname = usePathname();
  
  const navLinks: NavLink[] = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Berita', path: '/news' },
    { name: 'Kontak Kami', path: '/contact' },
  ];

  return (
    <header className="bg-background/90 backdrop-blur-sm text-primary font-body-md text-body-md fixed top-0 w-full z-50 border-b border-outline-variant/30 shadow-sm">
      <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-20">
        
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-95 transition-opacity">
            <Logo variant="horizontal" iconSize={44} />
          </Link>
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            // Evaluasi active state menggunakan pathname
            const isActive = pathname === link.path || (link.path === '/news' && pathname.startsWith('/news'));
            
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`transition-colors duration-200 cursor-pointer transition-transform active:scale-95 ${
                  isActive 
                    ? 'text-primary border-b-2 border-primary pb-1 font-semibold' 
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

      </div>
    </header>
  );
}