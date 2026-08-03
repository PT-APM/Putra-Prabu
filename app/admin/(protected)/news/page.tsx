import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/date";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteNews } from "./actions";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function AdminNewsPage() {
  const locale = await getAdminLocale();
  const dict = getDictionary(locale);
  const news = await prisma.newsArticle.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">{dict.admin.news.title}</h1>
        <Link
          href="/admin/news/new"
          className="bg-primary text-on-primary rounded-xl px-5 py-2.5 font-semibold hover:opacity-90 transition"
        >
          {dict.admin.news.add}
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">{dict.admin.news.columns.image}</th>
              <th className="px-4 py-3">{dict.admin.news.columns.title}</th>
              <th className="px-4 py-3">{dict.admin.news.columns.category}</th>
              <th className="px-4 py-3">{dict.admin.news.columns.date}</th>
              <th className="px-4 py-3 text-right">{dict.admin.common.actions}</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-t border-outline-variant/20">
                <td className="px-4 py-3">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-surface-container-low">
                    <Image src={item.imageUrl} alt={item.titleId} fill className="object-cover" unoptimized />
                  </div>
                </td>
                <td className="px-4 py-3 text-on-background max-w-xs truncate">{item.titleId}</td>
                <td className="px-4 py-3 text-secondary">{item.categoryId}</td>
                <td className="px-4 py-3 text-secondary">{formatDate(item.date, locale)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-4">
                    <Link href={`/admin/news/${item.id}`} className="text-primary hover:underline text-sm font-medium">
                      {dict.admin.common.edit}
                    </Link>
                    <DeleteButton action={deleteNews.bind(null, item.id)} confirmMessage={dict.admin.common.confirmDelete} />
                  </div>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-secondary">
                  {dict.admin.news.empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
