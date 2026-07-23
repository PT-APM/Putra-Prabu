"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";

const VALID_GROUPS = ["Pembina", "Pengawas", "Pengurus Harian"];

function parseLeaderFields(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const group = String(formData.get("group") || "").trim();
  const order = Number(formData.get("order") || 0);

  if (!name || !role) {
    throw new Error("Nama dan jabatan wajib diisi.");
  }
  if (!VALID_GROUPS.includes(group)) {
    throw new Error("Kelompok tidak valid.");
  }

  return { name, role, group, order: Number.isFinite(order) ? order : 0 };
}

function revalidateLeaderPaths() {
  revalidatePath("/admin/leadership");
  revalidatePath("/about");
}

export async function createLeader(formData: FormData) {
  await verifySession();
  const fields = parseLeaderFields(formData);

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    throw new Error("Gambar wajib diunggah.");
  }
  const imageUrl = await saveUploadedImage(image, "leader");

  await prisma.leader.create({ data: { ...fields, imageUrl } });
  revalidateLeaderPaths();
  redirect("/admin/leadership");
}

export async function updateLeader(id: string, formData: FormData) {
  await verifySession();
  const fields = parseLeaderFields(formData);
  const existing = await prisma.leader.findUniqueOrThrow({ where: { id } });

  let imageUrl = existing.imageUrl;
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    imageUrl = await saveUploadedImage(image, "leader");
    await deleteUploadedImage(existing.imageUrl);
  }

  await prisma.leader.update({ where: { id }, data: { ...fields, imageUrl } });
  revalidateLeaderPaths();
  redirect("/admin/leadership");
}

export async function deleteLeader(id: string) {
  await verifySession();
  const deleted = await prisma.leader.delete({ where: { id } });
  await deleteUploadedImage(deleted.imageUrl);
  revalidateLeaderPaths();
}
