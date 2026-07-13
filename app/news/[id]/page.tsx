import { repository } from "@/lib/repositories";
import MainLayout from "@/components/layout/MainLayout";
import NewsDetailPart from "@/sections/News/Detail/NewsDetailPart";

// Definisikan tipe untuk props params
interface PageProps {
  params: {
    id: string;
  };
}

// Tangkap params langsung dari argumen komponen
export default function NewsDetail({ params }: PageProps) {
  const { id } = params; 
  const article = repository.news.getById(id || "1") || repository.news.getAll()[0];
  
  const relatedNews = repository.news
    .getAll()
    .filter((n) => n.id !== article.id)
    .slice(0, 3);

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