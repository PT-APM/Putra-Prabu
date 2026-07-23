"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";

function parseServiceFields(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const icon = String(formData.get("icon") || "").trim();
  const order = Number(formData.get("order") || 0);

  if (!title || !description) {
    throw new Error("Judul dan deskripsi wajib diisi.");
  }

  return { title, description, icon: icon || null, order: Number.isFinite(order) ? order : 0 };
}

function revalidateServicePaths() {
  revalidatePath("/admin/services");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function createService(formData: FormData) {
  await verifySession();
  const fields = parseServiceFields(formData);

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    throw new Error("Gambar wajib diunggah.");
  }
  const imageUrl = await saveUploadedImage(image, "service");

  await prisma.service.create({ data: { ...fields, imageUrl } });
  revalidateServicePaths();
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await verifySession();
  const fields = parseServiceFields(formData);
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
