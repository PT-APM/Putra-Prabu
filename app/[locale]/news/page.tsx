import { repository } from "@/lib/repositories";
import MainLayout from "@/components/layout/MainLayout";
import ArticlesPart from "@/sections/News/ArticlesPart";
import { isLocale, defaultLocale } from "@/lib/i18n/config";

const PAGE_SIZE = 7;

interface NewsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function News({ params, searchParams }: NewsPageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const { page: pageParam } = await searchParams;
  const requestedPage = Number(pageParam) || 1;

  const { articles, totalPages } = await repository.news.getPaginated(requestedPage, PAGE_SIZE, locale);

  return (
    <MainLayout locale={locale}>
      <div className="islamic-pattern min-h-screen">
        <ArticlesPart
          locale={locale}
          articles={articles}
          page={Math.min(Math.max(1, requestedPage), totalPages)}
          totalPages={totalPages}
        />
      </div>
    </MainLayout>
  );
}
