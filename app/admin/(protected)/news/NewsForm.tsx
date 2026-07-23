import Link from "next/link";
import { Field, TextArea, ImageInput } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";

export type NewsFormValues = {
  title?: string;
  summary?: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  date?: string;
};

export default function NewsForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: NewsFormValues;
}) {
  return (
    <form action={action} className="space-y-4 max-w-2xl">
      <Field label="Judul" name="title" defaultValue={defaultValues?.title} required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Kategori" name="category" defaultValue={defaultValues?.category} required />
        <Field label="Tanggal" name="date" type="date" defaultValue={defaultValues?.date} required />
      </div>
      <ImageInput
        label="Gambar"
        name="image"
        required={!defaultValues?.imageUrl}
        currentImageUrl={defaultValues?.imageUrl}
      />
      <TextArea label="Ringkasan" name="summary" defaultValue={defaultValues?.summary} required rows={3} />
      <TextArea
        label="Konten Lengkap (opsional)"
        name="content"
        defaultValue={defaultValues?.content}
        rows={8}
      />
      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Link
          href="/admin/news"
          className="px-6 py-2.5 rounded-xl border border-outline-variant/50 text-secondary hover:bg-surface-container-low transition"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
