import Link from "next/link";
import { prisma } from "@/lib/db";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function AdminDashboardPage() {
  const locale = await getAdminLocale();
  const dict = getDictionary(locale);

  const [newsCount, serviceCount, leaderCount, contactCount] = await Promise.all([
    prisma.newsArticle.count(),
    prisma.service.count(),
    prisma.leader.count(),
    prisma.contactInfo.count(),
  ]);

  const cards = [
    { label: dict.admin.sidebar.news, count: newsCount, href: "/admin/news", icon: "newspaper" },
    { label: dict.admin.sidebar.services, count: serviceCount, href: "/admin/services", icon: "volunteer_activism" },
    { label: dict.admin.sidebar.leadership, count: leaderCount, href: "/admin/leadership", icon: "groups" },
    { label: dict.admin.sidebar.contact, count: contactCount, href: "/admin/contact", icon: "contact_page" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">{dict.admin.dashboard.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-primary text-3xl">{card.icon}</span>
              <span className="text-3xl font-bold text-on-background">{card.count}</span>
            </div>
            <p className="text-secondary font-label-sm text-label-sm uppercase tracking-wide">
              {card.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
