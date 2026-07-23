import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ServiceForm from "../ServiceForm";
import { updateService } from "../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Edit Layanan</h1>
      <ServiceForm
        action={updateService.bind(null, service.id)}
        defaultValues={{
          title: service.title,
          description: service.description,
          imageUrl: service.imageUrl,
          icon: service.icon ?? "",
          order: String(service.order),
        }}
      />
    </div>
  );
}
