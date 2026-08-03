import ServiceForm from "../ServiceForm";
import { createService } from "../actions";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NewServicePage() {
  const dict = getDictionary(await getAdminLocale());
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">{dict.admin.services.addTitle}</h1>
      <ServiceForm action={createService} dict={dict} />
    </div>
  );
}
