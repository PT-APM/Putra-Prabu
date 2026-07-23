"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth/actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/news", label: "Berita", icon: "newspaper" },
  { href: "/admin/services", label: "Layanan", icon: "volunteer_activism" },
  { href: "/admin/leadership", label: "Kepengurusan", icon: "groups" },
  { href: "/admin/contact", label: "Info Kontak", icon: "contact_page" },
];

export default function AdminSidebar({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-surface-container-lowest border-r border-outline-variant/30 min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-outline-variant/30">
        <p className="font-headline-lg-mobile text-lg font-bold text-primary">Admin Panel</p>
        <p className="text-secondary text-xs mt-1 truncate">{adminEmail}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
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

      <form action={logout} className="px-3 py-4 border-t border-outline-variant/30">
        <button
          type="submit"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-error hover:bg-error-container/40 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="font-body-md text-body-md">Keluar</span>
        </button>
      </form>
    </aside>
  );
}
