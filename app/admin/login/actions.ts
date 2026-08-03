"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export type LoginState = { error?: string } | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const dict = getDictionary(await getAdminLocale());
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: dict.admin.login.errorRequired };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return { error: dict.admin.login.errorInvalid };
  }

  const valid = await verifyPassword(password, admin.passwordHash, admin.passwordSalt);
  if (!valid) {
    return { error: dict.admin.login.errorInvalid };
  }

  await createSession(admin.id);
  redirect("/admin");
}
