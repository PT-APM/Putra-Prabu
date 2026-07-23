import type { NewsArticle, Service, Leader, ContactInfo } from "@/types";
import { prisma } from "@/lib/db";
import { formatDateID } from "@/lib/date";

function toNewsArticle(article: {
  id: string;
  title: string;
  summary: string;
  content: string | null;
  date: Date;
  category: string;
  imageUrl: string;
}): NewsArticle {
  return {
    id: article.id,
    title: article.title,
    summary: article.summary,
    content: article.content ?? undefined,
    date: formatDateID(article.date),
    category: article.category,
    imageUrl: article.imageUrl,
  };
}

function toService(service: {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: string | null;
}): Service {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    imageUrl: service.imageUrl,
    icon: service.icon ?? undefined,
  };
}

function toLeader(leader: {
  id: string;
  name: string;
  role: string;
  group: string;
  imageUrl: string;
}): Leader {
  return {
    id: leader.id,
    name: leader.name,
    role: leader.role,
    group: leader.group as Leader["group"],
    imageUrl: leader.imageUrl,
  };
}

function toContactInfo(contact: {
  id: string;
  icon: string;
  label: string;
  value: string;
}): ContactInfo {
  return {
    id: contact.id,
    icon: contact.icon,
    label: contact.label,
    value: contact.value,
  };
}

// Repository Pattern Implementation
export const repository = {
  news: {
    getAll: async (): Promise<NewsArticle[]> => {
      const articles = await prisma.newsArticle.findMany({ orderBy: { date: "desc" } });
      return articles.map(toNewsArticle);
    },
    getLatest: async (count: number): Promise<NewsArticle[]> => {
      const articles = await prisma.newsArticle.findMany({
        orderBy: { date: "desc" },
        take: count,
      });
      return articles.map(toNewsArticle);
    },
    getById: async (id: string): Promise<NewsArticle | undefined> => {
      const article = await prisma.newsArticle.findUnique({ where: { id } });
      return article ? toNewsArticle(article) : undefined;
    },
    getPaginated: async (
      page: number,
      pageSize: number
    ): Promise<{ articles: NewsArticle[]; totalPages: number; totalCount: number }> => {
      const totalCount = await prisma.newsArticle.count();
      const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
      const currentPage = Math.min(Math.max(1, page), totalPages);
      const articles = await prisma.newsArticle.findMany({
        orderBy: { date: "desc" },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      });
      return { articles: articles.map(toNewsArticle), totalPages, totalCount };
    },
  },
  services: {
    getAll: async (): Promise<Service[]> => {
      const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
      return services.map(toService);
    },
  },
  leadership: {
    getAll: async (): Promise<Leader[]> => {
      const leaders = await prisma.leader.findMany({ orderBy: [{ group: "asc" }, { order: "asc" }] });
      return leaders.map(toLeader);
    },
    getByGroup: async (group: Leader["group"]): Promise<Leader[]> => {
      const leaders = await prisma.leader.findMany({
        where: { group },
        orderBy: { order: "asc" },
      });
      return leaders.map(toLeader);
    },
  },
  contact: {
    getAll: async (): Promise<ContactInfo[]> => {
      const contactInfo = await prisma.contactInfo.findMany({ orderBy: { order: "asc" } });
      return contactInfo.map(toContactInfo);
    },
  },
};
