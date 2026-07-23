import Link from "next/link";
import { Field, TextArea, ImageInput } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";

export type ServiceFormValues = {
  title?: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  order?: string;
};

export default function ServiceForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: ServiceFormValues;
}) {
  return (
    <form action={action} className="space-y-4 max-w-2xl">
      <Field label="Judul" name="title" defaultValue={defaultValues?.title} required />
      <ImageInput
        label="Gambar"
        name="image"
        required={!defaultValues?.imageUrl}
        currentImageUrl={defaultValues?.imageUrl}
      />
      <TextArea label="Deskripsi" name="description" defaultValue={defaultValues?.description} required rows={4} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Ikon (material symbol, opsional)"
          name="icon"
          defaultValue={defaultValues?.icon}
          placeholder="school"
        />
        <Field label="Urutan" name="order" type="number" defaultValue={defaultValues?.order ?? "0"} />
      </div>
      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Link
          href="/admin/services"
          className="px-6 py-2.5 rounded-xl border border-outline-variant/50 text-secondary hover:bg-surface-container-low transition"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
