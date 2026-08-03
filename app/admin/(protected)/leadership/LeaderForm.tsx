import Link from "next/link";
import { Field, Select, ImageInput, TranslatedField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { LeaderGroup } from "@/types";

export type LeaderFormValues = {
  name?: string;
  roleId?: string;
  roleEn?: string;
  roleAr?: string;
  group?: LeaderGroup;
  imageUrl?: string;
  order?: string;
};

export default function LeaderForm({
  action,
  defaultValues,
  dict,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: LeaderFormValues;
  dict: Dictionary;
}) {
  const tabLabels = { id: dict.admin.common.tabId, en: dict.admin.common.tabEn, ar: dict.admin.common.tabAr };
  const f = dict.admin.leadership.fields;
  const groupOptions: { value: LeaderGroup; label: string }[] = [
    { value: "pembina", label: dict.leadershipGroups.pembina },
    { value: "pengawas", label: dict.leadershipGroups.pengawas },
    { value: "pengurus_harian", label: dict.leadershipGroups.pengurus_harian },
  ];

  return (
    <form action={action} className="space-y-4 max-w-2xl">
      <Field label={f.name} name="name" defaultValue={defaultValues?.name} required />
      <TranslatedField
        baseName="role"
        label={f.role}
        tabLabels={tabLabels}
        required
        defaultValues={{ id: defaultValues?.roleId, en: defaultValues?.roleEn, ar: defaultValues?.roleAr }}
      />
      <Select
        label={f.group}
        name="group"
        defaultValue={defaultValues?.group ?? "pembina"}
        required
        options={groupOptions}
      />
      <ImageInput
        label={f.image}
        name="image"
        required={!defaultValues?.imageUrl}
        currentImageUrl={defaultValues?.imageUrl}
        currentImageLabel={dict.admin.common.currentImage}
        keepImageHint={dict.admin.common.keepImageHint}
      />
      <Field label={f.order} name="order" type="number" defaultValue={defaultValues?.order ?? "0"} />
      <div className="flex gap-3 pt-2">
        <SubmitButton pendingText={dict.admin.common.saving}>{dict.admin.common.save}</SubmitButton>
        <Link
          href="/admin/leadership"
          className="px-6 py-2.5 rounded-xl border border-outline-variant/50 text-secondary hover:bg-surface-container-low transition"
        >
          {dict.admin.common.cancel}
        </Link>
      </div>
    </form>
  );
}
