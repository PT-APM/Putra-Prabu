import { repository } from "@/lib/repositories";
import MainLayout from "@/components/layout/MainLayout";
import ArticlesPart from "@/sections/News/ArticlesPart";


export default function News() {
  const newsList = repository.news.getAll();
  const featuredArticle = newsList[0];
  const regularArticles = newsList.slice(1);

  return (
    <MainLayout>
      <div className="islamic-pattern min-h-screen">
        <ArticlesPart featuredArticle={featuredArticle} regularArticles={regularArticles}/>
      </div>
    </MainLayout>
  );
}
