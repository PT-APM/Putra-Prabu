import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import LeaderForm from "../LeaderForm";
import { updateLeader } from "../actions";

export default async function EditLeaderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const leader = await prisma.leader.findUnique({ where: { id } });
  if (!leader) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Edit Pengurus</h1>
      <LeaderForm
        action={updateLeader.bind(null, leader.id)}
        defaultValues={{
          name: leader.name,
          role: leader.role,
          group: leader.group,
          imageUrl: leader.imageUrl,
          order: String(leader.order),
        }}
      />
    </div>
  );
}
