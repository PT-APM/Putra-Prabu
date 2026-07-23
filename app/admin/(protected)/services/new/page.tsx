import ServiceForm from "../ServiceForm";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Tambah Layanan</h1>
      <ServiceForm action={createService} />
    </div>
  );
}
