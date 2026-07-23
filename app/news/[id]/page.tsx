import { repository } from "@/lib/repositories";
import MainLayout from "@/components/layout/MainLayout";
import NewsDetailPart from "@/sections/News/Detail/NewsDetailPart";

// Definisikan tipe untuk props params
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Tangkap params langsung dari argumen komponen
export default async function NewsDetail({ params }: PageProps) {
  const { id } = await params;
  const allNews = await repository.news.getAll();
  const article = (await repository.news.getById(id)) ?? allNews[0];

  const relatedNews = allNews.filter((n) => n.id !== article.id).slice(0, 3);

  const paragraphs = (article.content || article.summary).split("\n\n");

  return (
    <MainLayout>
      <NewsDetailPart
        article={article}
        relatedNews={relatedNews}
        paragraphs={paragraphs}
      />
    </MainLayout>
  );
}