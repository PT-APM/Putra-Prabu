"use client"
import Link from 'next/link';
import Logo from './Logo';
import type { ContactInfo } from '@/types';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { localeHref } from '@/lib/i18n/path';

interface FooterProps {
  contactInfo: ContactInfo[];
  locale: Locale;
}

export default function Footer({ contactInfo, locale }: FooterProps) {
  const dict = getDictionary(locale);
  const address = contactInfo.find((c) => c.icon === 'location_on') ?? contactInfo[0];

  return (
    <footer className="bg-surface-container-lowest text-primary font-body-md text-body-md w-full border-t border-outline-variant/30 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-gutter py-section-padding max-w-container-max mx-auto relative z-10">
        <div className="md:col-span-2 space-y-6">
          <Link href={localeHref(locale, '/')} className="hover:opacity-95 transition-opacity inline-block">
            <Logo variant="horizontal" iconSize={56} useImageIcon/>
          </Link>
          <p className="text-on-surface-variant max-w-md">
            {dict.footer.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-6 md:mt-0">
          <h4 className="font-label-sm text-label-sm font-bold mb-1 uppercase tracking-widest text-secondary">{dict.footer.linksHeading}</h4>
          <Link href={localeHref(locale, '/')} className="text-on-surface-variant hover:text-primary underline transition-all duration-300">{dict.footer.links.home}</Link>
          <Link href={localeHref(locale, '/about')} className="text-on-surface-variant hover:text-primary underline transition-all duration-300">{dict.footer.links.about}</Link>
          <Link href={localeHref(locale, '/news')} className="text-on-surface-variant hover:text-primary underline transition-all duration-300">{dict.footer.links.news}</Link>
          <Link href={localeHref(locale, '/contact')} className="text-on-surface-variant hover:text-primary underline transition-all duration-300">{dict.footer.links.contact}</Link>
        </div>

        <div className="flex flex-col gap-3 mt-6 md:mt-0">
          <h4 className="font-label-sm text-label-sm font-bold mb-1 uppercase tracking-widest text-secondary">{dict.footer.addressHeading}</h4>
          {address && (
            <div className="text-on-surface-variant flex items-start whitespace-pre-line">
              <span className="material-symbols-outlined me-2 text-primary text-[20px]">{address.icon}</span>
              {address.value}
            </div>
          )}
          <Link href="#" className="text-on-surface-variant hover:text-primary underline transition-all duration-300 mt-2">{dict.footer.privacyPolicy}</Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary underline transition-all duration-300">{dict.footer.terms}</Link>
        </div>
      </div>

      <div className="border-t border-outline-variant/30 py-6 text-center px-gutter relative z-10">
        <p className="text-secondary text-sm">{dict.footer.copyright}</p>
      </div>
    </footer>
  );
}
