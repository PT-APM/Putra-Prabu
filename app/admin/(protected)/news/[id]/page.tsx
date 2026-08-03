import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { toDateInputValue } from "@/lib/date";
import NewsForm from "../NewsForm";
import { updateNews } from "../actions";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dict = getDictionary(await getAdminLocale());
  const article = await prisma.newsArticle.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">{dict.admin.news.editTitle}</h1>
      <NewsForm
        action={updateNews.bind(null, article.id)}
        dict={dict}
        defaultValues={{
          titleId: article.titleId,
          titleEn: article.titleEn ?? "",
          titleAr: article.titleAr ?? "",
          summaryId: article.summaryId,
          summaryEn: article.summaryEn ?? "",
          summaryAr: article.summaryAr ?? "",
          contentId: article.contentId ?? "",
          contentEn: article.contentEn ?? "",
          contentAr: article.contentAr ?? "",
          categoryId: article.categoryId,
          categoryEn: article.categoryEn ?? "",
          categoryAr: article.categoryAr ?? "",
          imageUrl: article.imageUrl,
          date: toDateInputValue(article.date),
        }}
      />
    </div>
  );
}
