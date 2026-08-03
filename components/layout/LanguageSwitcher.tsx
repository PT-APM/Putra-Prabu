"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { locales, localeShortNames, localeNames, type Locale } from "@/lib/i18n/config";
import { localeHref, stripLocaleFromPathname } from "@/lib/i18n/path";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const basePath = stripLocaleFromPathname(pathname);
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : "";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-outline-variant/50 text-secondary hover:text-primary hover:border-primary transition-colors text-sm font-semibold"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="material-symbols-outlined text-[18px]">language</span>
        {localeShortNames[locale]}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <ul
            role="listbox"
            className="absolute end-0 mt-2 w-40 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden z-50"
          >
            {locales.map((item) => (
              <li key={item}>
                <Link
                  href={`${localeHref(item, basePath)}${suffix}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    item === locale
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-secondary hover:bg-surface-container-low hover:text-primary"
                  }`}
                >
                  {localeNames[item]}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
