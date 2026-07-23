import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { toDateInputValue } from "@/lib/date";
import NewsForm from "../NewsForm";
import { updateNews } from "../actions";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.newsArticle.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Edit Berita</h1>
      <NewsForm
        action={updateNews.bind(null, article.id)}
        defaultValues={{
          title: article.title,
          summary: article.summary,
          content: article.content ?? "",
          category: article.category,
          imageUrl: article.imageUrl,
          date: toDateInputValue(article.date),
        }}
      />
    </div>
  );
}
