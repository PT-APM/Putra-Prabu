"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";

function parseNewsFields(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const dateValue = String(formData.get("date") || "");

  if (!title || !summary || !category || !dateValue) {
    throw new Error("Semua field wajib diisi kecuali konten lengkap.");
  }

  return {
    title,
    summary,
    content: content || null,
    category,
    date: new Date(dateValue),
  };
}

function revalidateNewsPaths(id?: string) {
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  if (id) revalidatePath(`/news/${id}`);
}

export async function createNews(formData: FormData) {
  await verifySession();
  const fields = parseNewsFields(formData);

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    throw new Error("Gambar wajib diunggah.");
  }
  const imageUrl = await saveUploadedImage(image, "news");

  await prisma.newsArticle.create({ data: { ...fields, imageUrl } });
  revalidateNewsPaths();
  redirect("/admin/news");
}

export async function updateNews(id: string, formData: FormData) {
  await verifySession();
  const fields = parseNewsFields(formData);
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
