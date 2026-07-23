import Link from "next/link";
import { Field, TextArea } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";

export type ContactFormValues = {
  icon?: string;
  label?: string;
  value?: string;
  order?: string;
};

export default function ContactForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: ContactFormValues;
}) {
  return (
    <form action={action} className="space-y-4 max-w-2xl">
      <Field
        label="Ikon (material symbol)"
        name="icon"
        defaultValue={defaultValues?.icon}
        required
        placeholder="location_on"
      />
      <Field label="Label" name="label" defaultValue={defaultValues?.label} required placeholder="ALAMAT KANTOR" />
      <TextArea label="Nilai" name="value" defaultValue={defaultValues?.value} required rows={3} />
      <Field label="Urutan" name="order" type="number" defaultValue={defaultValues?.order ?? "0"} />
      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Link
          href="/admin/contact"
          className="px-6 py-2.5 rounded-xl border border-outline-variant/50 text-secondary hover:bg-surface-container-low transition"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
