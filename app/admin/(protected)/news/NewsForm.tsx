import Link from "next/link";
import { Field, ImageInput, TranslatedField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export type NewsFormValues = {
  titleId?: string;
  titleEn?: string;
  titleAr?: string;
  summaryId?: string;
  summaryEn?: string;
  summaryAr?: string;
  contentId?: string;
  contentEn?: string;
  contentAr?: string;
  categoryId?: string;
  categoryEn?: string;
  categoryAr?: string;
  imageUrl?: string;
  date?: string;
};

export default function NewsForm({
  action,
  defaultValues,
  dict,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: NewsFormValues;
  dict: Dictionary;
}) {
  const tabLabels = { id: dict.admin.common.tabId, en: dict.admin.common.tabEn, ar: dict.admin.common.tabAr };
  const f = dict.admin.news.fields;

  return (
    <form action={action} className="space-y-4 max-w-2xl">
      <TranslatedField
        baseName="title"
        label={f.title}
        tabLabels={tabLabels}
        required
        defaultValues={{ id: defaultValues?.titleId, en: defaultValues?.titleEn, ar: defaultValues?.titleAr }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TranslatedField
          baseName="category"
          label={f.category}
          tabLabels={tabLabels}
          required
          defaultValues={{ id: defaultValues?.categoryId, en: defaultValues?.categoryEn, ar: defaultValues?.categoryAr }}
        />
        <Field label={f.date} name="date" type="date" defaultValue={defaultValues?.date} required />
      </div>
      <ImageInput
        label={f.image}
        name="image"
        required={!defaultValues?.imageUrl}
        currentImageUrl={defaultValues?.imageUrl}
        currentImageLabel={dict.admin.common.currentImage}
        keepImageHint={dict.admin.common.keepImageHint}
      />
      <TranslatedField
        baseName="summary"
        label={f.summary}
        tabLabels={tabLabels}
        required
        multiline
        rows={3}
        defaultValues={{ id: defaultValues?.summaryId, en: defaultValues?.summaryEn, ar: defaultValues?.summaryAr }}
      />
      <TranslatedField
        baseName="content"
        label={f.content}
        tabLabels={tabLabels}
        multiline
        rows={8}
        defaultValues={{ id: defaultValues?.contentId, en: defaultValues?.contentEn, ar: defaultValues?.contentAr }}
      />
      <div className="flex gap-3 pt-2">
        <SubmitButton pendingText={dict.admin.common.saving}>{dict.admin.common.save}</SubmitButton>
        <Link
          href="/admin/news"
          className="px-6 py-2.5 rounded-xl border border-outline-variant/50 text-secondary hover:bg-surface-container-low transition"
        >
          {dict.admin.common.cancel}
        </Link>
      </div>
    </form>
  );
}
