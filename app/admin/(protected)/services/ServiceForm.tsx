import Link from "next/link";
import { Field, ImageInput, TranslatedField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export type ServiceFormValues = {
  titleId?: string;
  titleEn?: string;
  titleAr?: string;
  descriptionId?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl?: string;
  icon?: string;
  order?: string;
};

export default function ServiceForm({
  action,
  defaultValues,
  dict,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: ServiceFormValues;
  dict: Dictionary;
}) {
  const tabLabels = { id: dict.admin.common.tabId, en: dict.admin.common.tabEn, ar: dict.admin.common.tabAr };
  const f = dict.admin.services.fields;

  return (
    <form action={action} className="space-y-4 max-w-2xl">
      <TranslatedField
        baseName="title"
        label={f.title}
        tabLabels={tabLabels}
        required
        defaultValues={{ id: defaultValues?.titleId, en: defaultValues?.titleEn, ar: defaultValues?.titleAr }}
      />
      <ImageInput
        label={f.image}
        name="image"
        required={!defaultValues?.imageUrl}
        currentImageUrl={defaultValues?.imageUrl}
        currentImageLabel={dict.admin.common.currentImage}
        keepImageHint={dict.admin.common.keepImageHint}
      />
      <TranslatedField
        baseName="description"
        label={f.description}
        tabLabels={tabLabels}
        required
        multiline
        rows={4}
        defaultValues={{ id: defaultValues?.descriptionId, en: defaultValues?.descriptionEn, ar: defaultValues?.descriptionAr }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label={f.icon}
          name="icon"
          defaultValue={defaultValues?.icon}
          placeholder="school"
        />
        <Field label={f.order} name="order" type="number" defaultValue={defaultValues?.order ?? "0"} />
      </div>
      <div className="flex gap-3 pt-2">
        <SubmitButton pendingText={dict.admin.common.saving}>{dict.admin.common.save}</SubmitButton>
        <Link
          href="/admin/services"
          className="px-6 py-2.5 rounded-xl border border-outline-variant/50 text-secondary hover:bg-surface-container-low transition"
        >
          {dict.admin.common.cancel}
        </Link>
      </div>
    </form>
  );
}
