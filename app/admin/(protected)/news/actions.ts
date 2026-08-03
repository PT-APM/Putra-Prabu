"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { revalidateLocalizedPath } from "@/lib/i18n/revalidate";

function trimmed(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

async function parseNewsFields(formData: FormData) {
  const titleId = trimmed(formData, "titleId");
  const summaryId = trimmed(formData, "summaryId");
  const categoryId = trimmed(formData, "categoryId");
  const dateValue = String(formData.get("date") || "");

  if (!titleId || !summaryId || !categoryId || !dateValue) {
    const dict = getDictionary(await getAdminLocale());
    throw new Error(dict.admin.news.errorRequired);
  }

  return {
    titleId,
    titleEn: trimmed(formData, "titleEn") || null,
    titleAr: trimmed(formData, "titleAr") || null,
    summaryId,
    summaryEn: trimmed(formData, "summaryEn") || null,
    summaryAr: trimmed(formData, "summaryAr") || null,
    contentId: trimmed(formData, "contentId") || null,
    contentEn: trimmed(formData, "contentEn") || null,
    contentAr: trimmed(formData, "contentAr") || null,
    categoryId,
    categoryEn: trimmed(formData, "categoryEn") || null,
    categoryAr: trimmed(formData, "categoryAr") || null,
    date: new Date(dateValue),
  };
}

function revalidateNewsPaths(id?: string) {
  revalidatePath("/admin/news");
  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/news");
  if (id) revalidateLocalizedPath(`/news/${id}`);
}

export async function createNews(formData: FormData) {
  await verifySession();
  const fields = await parseNewsFields(formData);

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    const dict = getDictionary(await getAdminLocale());
    throw new Error(dict.admin.news.errorImage);
  }
  const imageUrl = await saveUploadedImage(image, "news");

  await prisma.newsArticle.create({ data: { ...fields, imageUrl } });
  revalidateNewsPaths();
  redirect("/admin/news");
}

export async function updateNews(id: string, formData: FormData) {
  await verifySession();
  const fields = await parseNewsFields(formData);
  const existing = await prisma.newsArticle.findUniqueOrThrow({ where: { id } });

  let imageUrl = existing.imageUrl;
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    imageUrl = await saveUploadedImage(image, "news");
    await deleteUploadedImage(existing.imageUrl);
  }

  await prisma.newsArticle.update({ where: { id }, data: { ...fields, imageUrl } });
  revalidateNewsPaths(id);
  redirect("/admin/news");
}

export async function deleteNews(id: string) {
  await verifySession();
  const deleted = await prisma.newsArticle.delete({ where: { id } });
  await deleteUploadedImage(deleted.imageUrl);
  revalidateNewsPaths(id);
}
