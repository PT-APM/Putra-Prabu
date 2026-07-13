"use client"
import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest text-primary font-body-md text-body-md w-full border-t border-outline-variant/30 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-gutter py-section-padding max-w-container-max mx-auto relative z-10">
        <div className="md:col-span-2 space-y-6">
          <Link href="/" className="hover:opacity-95 transition-opacity inline-block">
            <Logo variant="horizontal" iconSize={56} />
          </Link>
          <p className="text-on-surface-variant max-w-md">
            Membangun peradaban melalui pendidikan, teknologi, dan integritas Islami. Membentuk generasi cerdas dan berakhlak mulia.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 mt-6 md:mt-0">
          <h4 className="font-label-sm text-label-sm font-bold mb-1 uppercase tracking-widest text-secondary">Tautan</h4>
          <Link href="/" className="text-on-surface-variant hover:text-primary underline transition-all duration-300">Home</Link>
          <Link href="/about" className="text-on-surface-variant hover:text-primary underline transition-all duration-300">About Us</Link>
          <Link href="/news" className="text-on-surface-variant hover:text-primary underline transition-all duration-300">News & Artikel</Link>
          <Link href="/contact" className="text-on-surface-variant hover:text-primary underline transition-all duration-300">Contact Us</Link>
        </div>
        
        <div className="flex flex-col gap-3 mt-6 md:mt-0">
          <h4 className="font-label-sm text-label-sm font-bold mb-1 uppercase tracking-widest text-secondary">Alamat & Legal</h4>
          <div className="text-on-surface-variant flex items-start">
            <span className="material-symbols-outlined mr-2 text-primary text-[20px]">location_on</span>
            Jl sejahtera no 21, Medan
          </div>
          <Link href="#" className="text-on-surface-variant hover:text-primary underline transition-all duration-300 mt-2">Privacy Policy</Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary underline transition-all duration-300">Terms of Service</Link>
        </div>
      </div>
      
      <div className="border-t border-outline-variant/30 py-6 text-center px-gutter relative z-10">
        <p className="text-secondary text-sm">© 2024 Yayasan Putra Prabu Indonesia Raya. All rights reserved.</p>
      </div>
    </footer>
  );
}
