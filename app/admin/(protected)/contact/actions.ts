"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";

function parseContactForm(formData: FormData) {
  const icon = String(formData.get("icon") || "").trim();
  const label = String(formData.get("label") || "").trim();
  const value = String(formData.get("value") || "").trim();
  const order = Number(formData.get("order") || 0);

  if (!icon || !label || !value) {
    throw new Error("Ikon, label, dan nilai wajib diisi.");
  }

  return { icon, label, value, order: Number.isFinite(order) ? order : 0 };
}

function revalidateContactPaths() {
  revalidatePath("/admin/contact");
  revalidatePath("/contact");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/news");
}

export async function createContactInfo(formData: FormData) {
  await verifySession();
  const data = parseContactForm(formData);
  await prisma.contactInfo.create({ data });
  revalidateContactPaths();
  redirect("/admin/contact");
}

export async function updateContactInfo(id: string, formData: FormData) {
  await verifySession();
  const data = parseContactForm(formData);
  await prisma.contactInfo.update({ where: { id }, data });
  revalidateContactPaths();
  redirect("/admin/contact");
}

export async function deleteContactInfo(id: string) {
  await verifySession();
  await prisma.contactInfo.delete({ where: { id } });
  revalidateContactPaths();
}
