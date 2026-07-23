import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionPayload } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export const verifySession = cache(async () => {
  const session = await getSessionPayload();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
});

export const getCurrentAdmin = cache(async () => {
  const session = await verifySession();
  return prisma.admin.findUnique({
    where: { id: session.adminId },
    select: { id: true, email: true, name: true },
  });
});
