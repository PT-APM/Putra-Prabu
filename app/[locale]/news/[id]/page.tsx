import { repository } from "@/lib/repositories";
import MainLayout from "@/components/layout/MainLayout";
import NewsDetailPart from "@/sections/News/Detail/NewsDetailPart";
import { isLocale, defaultLocale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function NewsDetail({ params }: PageProps) {
  const { locale: rawLocale, id } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const allNews = await repository.news.getAll(locale);
  const article = (await repository.news.getById(id, locale)) ?? allNews[0];

  const relatedNews = allNews.filter((n) => n.id !== article.id).slice(0, 3);

  const paragraphs = (article.content || article.summary).split("\n\n");

  return (
    <MainLayout locale={locale}>
      <NewsDetailPart
        locale={locale}
        article={article}
        relatedNews={relatedNews}
        paragraphs={paragraphs}
      />
    </MainLayout>
  );
}
