import ContactForm from "../ContactForm";
import { createContactInfo } from "../actions";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NewContactInfoPage() {
  const dict = getDictionary(await getAdminLocale());
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">{dict.admin.contact.addTitle}</h1>
      <ContactForm action={createContactInfo} dict={dict} />
    </div>
  );
}
