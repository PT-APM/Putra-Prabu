import Link from "next/link";
import { Field, Select, ImageInput } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";

export type LeaderFormValues = {
  name?: string;
  role?: string;
  group?: string;
  imageUrl?: string;
  order?: string;
};

const GROUP_OPTIONS = [
  { value: "Pembina", label: "Pembina" },
  { value: "Pengawas", label: "Pengawas" },
  { value: "Pengurus Harian", label: "Pengurus Harian" },
];

export default function LeaderForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: LeaderFormValues;
}) {
  return (
    <form action={action} className="space-y-4 max-w-2xl">
      <Field label="Nama" name="name" defaultValue={defaultValues?.name} required />
      <Field label="Jabatan" name="role" defaultValue={defaultValues?.role} required />
      <Select
        label="Kelompok"
        name="group"
        defaultValue={defaultValues?.group ?? "Pembina"}
        required
        options={GROUP_OPTIONS}
      />
      <ImageInput
        label="Foto"
        name="image"
        required={!defaultValues?.imageUrl}
        currentImageUrl={defaultValues?.imageUrl}
      />
      <Field label="Urutan" name="order" type="number" defaultValue={defaultValues?.order ?? "0"} />
      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Link
          href="/admin/leadership"
          className="px-6 py-2.5 rounded-xl border border-outline-variant/50 text-secondary hover:bg-surface-container-low transition"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
