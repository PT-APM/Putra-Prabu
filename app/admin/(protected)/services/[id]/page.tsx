import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ServiceForm from "../ServiceForm";
import { updateService } from "../actions";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dict = getDictionary(await getAdminLocale());
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">{dict.admin.services.editTitle}</h1>
      <ServiceForm
        action={updateService.bind(null, service.id)}
        dict={dict}
        defaultValues={{
          titleId: service.titleId,
          titleEn: service.titleEn ?? "",
          titleAr: service.titleAr ?? "",
          descriptionId: service.descriptionId,
          descriptionEn: service.descriptionEn ?? "",
          descriptionAr: service.descriptionAr ?? "",
          imageUrl: service.imageUrl,
          icon: service.icon ?? "",
          order: String(service.order),
        }}
      />
    </div>
  );
}
