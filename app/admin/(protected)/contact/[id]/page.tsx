import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ContactForm from "../ContactForm";
import { updateContactInfo } from "../actions";

export default async function EditContactInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id } });
  if (!contactInfo) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Edit Info Kontak</h1>
      <ContactForm
        action={updateContactInfo.bind(null, contactInfo.id)}
        defaultValues={{
          icon: contactInfo.icon,
          label: contactInfo.label,
          value: contactInfo.value,
          order: String(contactInfo.order),
        }}
      />
    </div>
  );
}
