"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { revalidateLocalizedPath } from "@/lib/i18n/revalidate";

function trimmed(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

async function parseContactForm(formData: FormData) {
  const icon = trimmed(formData, "icon");
  const labelId = trimmed(formData, "labelId");
  const value = trimmed(formData, "value");
  const order = Number(formData.get("order") || 0);

  if (!icon || !labelId || !value) {
    const dict = getDictionary(await getAdminLocale());
    throw new Error(dict.admin.contact.errorRequired);
  }

  return {
    icon,
    labelId,
    labelEn: trimmed(formData, "labelEn") || null,
    labelAr: trimmed(formData, "labelAr") || null,
    value,
    order: Number.isFinite(order) ? order : 0,
  };
}

function revalidateContactPaths() {
  revalidatePath("/admin/contact");
  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/about");
  revalidateLocalizedPath("/contact");
  revalidateLocalizedPath("/news");
}

export async function createContactInfo(formData: FormData) {
  await verifySession();
  const data = await parseContactForm(formData);
  await prisma.contactInfo.create({ data });
  revalidateContactPaths();
  redirect("/admin/contact");
}

export async function updateContactInfo(id: string, formData: FormData) {
  await verifySession();
  const data = await parseContactForm(formData);
  await prisma.contactInfo.update({ where: { id }, data });
  revalidateContactPaths();
  redirect("/admin/contact");
}

export async function deleteContactInfo(id: string) {
  await verifySession();
  await prisma.contactInfo.delete({ where: { id } });
  revalidateContactPaths();
}
