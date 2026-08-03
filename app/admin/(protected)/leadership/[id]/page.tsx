import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import LeaderForm from "../LeaderForm";
import { updateLeader } from "../actions";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { LeaderGroup } from "@/types";

export default async function EditLeaderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dict = getDictionary(await getAdminLocale());
  const leader = await prisma.leader.findUnique({ where: { id } });
  if (!leader) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">{dict.admin.leadership.editTitle}</h1>
      <LeaderForm
        action={updateLeader.bind(null, leader.id)}
        dict={dict}
        defaultValues={{
          name: leader.name,
          roleId: leader.roleId,
          roleEn: leader.roleEn ?? "",
          roleAr: leader.roleAr ?? "",
          group: leader.group as LeaderGroup,
          imageUrl: leader.imageUrl,
          order: String(leader.order),
        }}
      />
    </div>
  );
}
