import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ContactForm from "../ContactForm";
import { updateContactInfo } from "../actions";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function EditContactInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dict = getDictionary(await getAdminLocale());
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id } });
  if (!contactInfo) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">{dict.admin.contact.editTitle}</h1>
      <ContactForm
        action={updateContactInfo.bind(null, contactInfo.id)}
        dict={dict}
        defaultValues={{
          icon: contactInfo.icon,
          labelId: contactInfo.labelId,
          labelEn: contactInfo.labelEn ?? "",
          labelAr: contactInfo.labelAr ?? "",
          value: contactInfo.value,
          order: String(contactInfo.order),
        }}
      />
    </div>
  );
}
