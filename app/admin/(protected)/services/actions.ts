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

async function parseServiceFields(formData: FormData) {
  const titleId = trimmed(formData, "titleId");
  const descriptionId = trimmed(formData, "descriptionId");
  const icon = trimmed(formData, "icon");
  const order = Number(formData.get("order") || 0);

  if (!titleId || !descriptionId) {
    const dict = getDictionary(await getAdminLocale());
    throw new Error(dict.admin.services.errorRequired);
  }

  return {
    titleId,
    titleEn: trimmed(formData, "titleEn") || null,
    titleAr: trimmed(formData, "titleAr") || null,
    descriptionId,
    descriptionEn: trimmed(formData, "descriptionEn") || null,
    descriptionAr: trimmed(formData, "descriptionAr") || null,
    icon: icon || null,
    order: Number.isFinite(order) ? order : 0,
  };
}

function revalidateServicePaths() {
  revalidatePath("/admin/services");
  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/about");
}

export async function createService(formData: FormData) {
  await verifySession();
  const fields = await parseServiceFields(formData);

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    const dict = getDictionary(await getAdminLocale());
    throw new Error(dict.admin.services.errorImage);
  }
  const imageUrl = await saveUploadedImage(image, "service");

  await prisma.service.create({ data: { ...fields, imageUrl } });
  revalidateServicePaths();
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await verifySession();
  const fields = await parseServiceFields(formData);
  const existing = await prisma.service.findUniqueOrThrow({ where: { id } });

  let imageUrl = existing.imageUrl;
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    imageUrl = await saveUploadedImage(image, "service");
    await deleteUploadedImage(existing.imageUrl);
  }

  await prisma.service.update({ where: { id }, data: { ...fields, imageUrl } });
  revalidateServicePaths();
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await verifySession();
  const deleted = await prisma.service.delete({ where: { id } });
  await deleteUploadedImage(deleted.imageUrl);
  revalidateServicePaths();
}
