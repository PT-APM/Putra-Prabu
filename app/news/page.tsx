import { repository } from "@/lib/repositories";
import MainLayout from "@/components/layout/MainLayout";
import ArticlesPart from "@/sections/News/ArticlesPart";

const PAGE_SIZE = 7;

interface NewsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function News({ searchParams }: NewsPageProps) {
  const { page: pageParam } = await searchParams;
  const requestedPage = Number(pageParam) || 1;

  const { articles, totalPages } = await repository.news.getPaginated(requestedPage, PAGE_SIZE);

  return (
    <MainLayout>
      <div className="islamic-pattern min-h-screen">
        <ArticlesPart articles={articles} page={Math.min(Math.max(1, requestedPage), totalPages)} totalPages={totalPages} />
      </div>
    </MainLayout>
  );
}
