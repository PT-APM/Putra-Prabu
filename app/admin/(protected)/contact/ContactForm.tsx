import Link from "next/link";
import { Field, TextArea, TranslatedField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export type ContactFormValues = {
  icon?: string;
  labelId?: string;
  labelEn?: string;
  labelAr?: string;
  value?: string;
  order?: string;
};

export default function ContactForm({
  action,
  defaultValues,
  dict,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: ContactFormValues;
  dict: Dictionary;
}) {
  const tabLabels = { id: dict.admin.common.tabId, en: dict.admin.common.tabEn, ar: dict.admin.common.tabAr };
  const f = dict.admin.contact.fields;

  return (
    <form action={action} className="space-y-4 max-w-2xl">
      <Field
        label={f.icon}
        name="icon"
        defaultValue={defaultValues?.icon}
        required
        placeholder="location_on"
      />
      <TranslatedField
        baseName="label"
        label={f.label}
        tabLabels={tabLabels}
        required
        placeholder="ALAMAT KANTOR"
        defaultValues={{ id: defaultValues?.labelId, en: defaultValues?.labelEn, ar: defaultValues?.labelAr }}
      />
      <TextArea label={f.value} name="value" defaultValue={defaultValues?.value} required rows={3} />
      <Field label={f.order} name="order" type="number" defaultValue={defaultValues?.order ?? "0"} />
      <div className="flex gap-3 pt-2">
        <SubmitButton pendingText={dict.admin.common.saving}>{dict.admin.common.save}</SubmitButton>
        <Link
          href="/admin/contact"
          className="px-6 py-2.5 rounded-xl border border-outline-variant/50 text-secondary hover:bg-surface-container-low transition"
        >
          {dict.admin.common.cancel}
        </Link>
      </div>
    </form>
  );
}
