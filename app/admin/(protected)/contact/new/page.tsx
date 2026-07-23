import ContactForm from "../ContactForm";
import { createContactInfo } from "../actions";

export default function NewContactInfoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Tambah Info Kontak</h1>
      <ContactForm action={createContactInfo} />
    </div>
  );
}
