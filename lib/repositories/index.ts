import type { NewsArticle, Service, Leader, ContactInfo } from "@/types";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/date";
import type { Locale } from "@/lib/i18n/config";

// Resolves a translated field for the given locale, falling back to the
// Indonesian value (which is always required) when a translation is missing.
function pick(idValue: string, enValue: string | null, arValue: string | null, locale: Locale): string {
  if (locale === "en") return enValue || idValue;
  if (locale === "ar") return arValue || idValue;
  return idValue;
}

function pickOptional(
  idValue: string | null,
  enValue: string | null,
  arValue: string | null,
  locale: Locale
): string | undefined {
  const fallback = idValue ?? undefined;
  if (locale === "en") return enValue ?? fallback;
  if (locale === "ar") return arValue ?? fallback;
  return fallback;
}

function toNewsArticle(
  article: {
    id: string;
    titleId: string;
    titleEn: string | null;
    titleAr: string | null;
    summaryId: string;
    summaryEn: string | null;
    summaryAr: string | null;
    contentId: string | null;
    contentEn: string | null;
    contentAr: string | null;
    date: Date;
    categoryId: string;
    categoryEn: string | null;
    categoryAr: string | null;
    imageUrl: string;
  },
  locale: Locale
): NewsArticle {
  return {
    id: article.id,
    title: pick(article.titleId, article.titleEn, article.titleAr, locale),
    summary: pick(article.summaryId, article.summaryEn, article.summaryAr, locale),
    content: pickOptional(article.contentId, article.contentEn, article.contentAr, locale),
    date: formatDate(article.date, locale),
    category: pick(article.categoryId, article.categoryEn, article.categoryAr, locale),
    imageUrl: article.imageUrl,
  };
}

function toService(
  service: {
    id: string;
    titleId: string;
    titleEn: string | null;
    titleAr: string | null;
    descriptionId: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    imageUrl: string;
    icon: string | null;
  },
  locale: Locale
): Service {
  return {
    id: service.id,
    title: pick(service.titleId, service.titleEn, service.titleAr, locale),
    description: pick(service.descriptionId, service.descriptionEn, service.descriptionAr, locale),
    imageUrl: service.imageUrl,
    icon: service.icon ?? undefined,
  };
}

function toLeader(
  leader: {
    id: string;
    name: string;
    roleId: string;
    roleEn: string | null;
    roleAr: string | null;
    group: string;
    imageUrl: string;
  },
  locale: Locale
): Leader {
  return {
    id: leader.id,
    name: leader.name,
    role: pick(leader.roleId, leader.roleEn, leader.roleAr, locale),
    group: leader.group as Leader["group"],
    imageUrl: leader.imageUrl,
  };
}

function toContactInfo(
  contact: {
    id: string;
    icon: string;
    labelId: string;
    labelEn: string | null;
    labelAr: string | null;
    value: string;
  },
  locale: Locale
): ContactInfo {
  return {
    id: contact.id,
    icon: contact.icon,
    label: pick(contact.labelId, contact.labelEn, contact.labelAr, locale),
    value: contact.value,
  };
}

// Repository Pattern Implementation
export const repository = {
  news: {
    getAll: async (locale: Locale): Promise<NewsArticle[]> => {
      const articles = await prisma.newsArticle.findMany({ orderBy: { date: "desc" } });
      return articles.map((a) => toNewsArticle(a, locale));
    },
    getLatest: async (count: number, locale: Locale): Promise<NewsArticle[]> => {
      const articles = await prisma.newsArticle.findMany({
        orderBy: { date: "desc" },
        take: count,
      });
      return articles.map((a) => toNewsArticle(a, locale));
    },
    getById: async (id: string, locale: Locale): Promise<NewsArticle | undefined> => {
      const article = await prisma.newsArticle.findUnique({ where: { id } });
      return article ? toNewsArticle(article, locale) : undefined;
    },
    getPaginated: async (
      page: number,
      pageSize: number,
      locale: Locale
    ): Promise<{ articles: NewsArticle[]; totalPages: number; totalCount: number }> => {
      const totalCount = await prisma.newsArticle.count();
      const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
      const currentPage = Math.min(Math.max(1, page), totalPages);
      const articles = await prisma.newsArticle.findMany({
        orderBy: { date: "desc" },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      });
      return { articles: articles.map((a) => toNewsArticle(a, locale)), totalPages, totalCount };
    },
  },
  services: {
    getAll: async (locale: Locale): Promise<Service[]> => {
      const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
      return services.map((s) => toService(s, locale));
    },
  },
  leadership: {
    getAll: async (locale: Locale): Promise<Leader[]> => {
      const leaders = await prisma.leader.findMany({ orderBy: [{ group: "asc" }, { order: "asc" }] });
      return leaders.map((l) => toLeader(l, locale));
    },
    getByGroup: async (group: Leader["group"], locale: Locale): Promise<Leader[]> => {
      const leaders = await prisma.leader.findMany({
        where: { group },
        orderBy: { order: "asc" },
      });
      return leaders.map((l) => toLeader(l, locale));
    },
  },
  contact: {
    getAll: async (locale: Locale): Promise<ContactInfo[]> => {
      const contactInfo = await prisma.contactInfo.findMany({ orderBy: { order: "asc" } });
      return contactInfo.map((c) => toContactInfo(c, locale));
    },
  },
};
