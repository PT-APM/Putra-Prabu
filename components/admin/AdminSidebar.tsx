"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth/actions";
import { setAdminLocale } from "@/lib/i18n/actions";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function AdminSidebar({
  adminEmail,
  locale,
  dict,
}: {
  adminEmail: string;
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: dict.admin.sidebar.dashboard, icon: "dashboard" },
    { href: "/admin/news", label: dict.admin.sidebar.news, icon: "newspaper" },
    { href: "/admin/services", label: dict.admin.sidebar.services, icon: "volunteer_activism" },
    { href: "/admin/leadership", label: dict.admin.sidebar.leadership, icon: "groups" },
    { href: "/admin/contact", label: dict.admin.sidebar.contact, icon: "contact_page" },
  ];

  return (
    <aside className="w-64 shrink-0 bg-surface-container-lowest border-r border-outline-variant/30 min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-outline-variant/30">
        <p className="font-headline-lg-mobile text-lg font-bold text-primary">{dict.admin.sidebar.panelTitle}</p>
        <p className="text-secondary text-xs mt-1 truncate">{adminEmail}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-body-md text-body-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-outline-variant/30">
        <label className="block font-label-sm text-label-sm text-secondary mb-2 uppercase tracking-wide">
          {dict.admin.sidebar.language}
        </label>
        <form action={setAdminLocale} className="flex gap-1.5">
          {locales.map((item) => (
            <button
              key={item}
              type="submit"
              name="locale"
              value={item}
              title={localeNames[item]}
              className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                item === locale
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-low text-secondary hover:bg-surface-container"
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </form>
      </div>

      <form action={logout} className="px-3 py-4 border-t border-outline-variant/30">
        <button
          type="submit"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-error hover:bg-error-container/40 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="font-body-md text-body-md">{dict.admin.sidebar.logout}</span>
        </button>
      </form>
    </aside>
  );
}
