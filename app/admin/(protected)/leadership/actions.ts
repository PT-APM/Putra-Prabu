"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { revalidateLocalizedPath } from "@/lib/i18n/revalidate";

const VALID_GROUPS = ["pembina", "pengawas", "pengurus_harian"];

function trimmed(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

async function parseLeaderFields(formData: FormData) {
  const name = trimmed(formData, "name");
  const roleId = trimmed(formData, "roleId");
  const group = trimmed(formData, "group");
  const order = Number(formData.get("order") || 0);
  const dict = getDictionary(await getAdminLocale());

  if (!name || !roleId) {
    throw new Error(dict.admin.leadership.errorRequired);
  }
  if (!VALID_GROUPS.includes(group)) {
    throw new Error(dict.admin.leadership.errorGroup);
  }

  return {
    name,
    roleId,
    roleEn: trimmed(formData, "roleEn") || null,
    roleAr: trimmed(formData, "roleAr") || null,
    group,
    order: Number.isFinite(order) ? order : 0,
  };
}

function revalidateLeaderPaths() {
  revalidatePath("/admin/leadership");
  revalidateLocalizedPath("/about");
}

export async function createLeader(formData: FormData) {
  await verifySession();
  const fields = await parseLeaderFields(formData);

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    const dict = getDictionary(await getAdminLocale());
    throw new Error(dict.admin.leadership.errorImage);
  }
  const imageUrl = await saveUploadedImage(image, "leader");

  await prisma.leader.create({ data: { ...fields, imageUrl } });
  revalidateLeaderPaths();
  redirect("/admin/leadership");
}

export async function updateLeader(id: string, formData: FormData) {
  await verifySession();
  const fields = await parseLeaderFields(formData);
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
