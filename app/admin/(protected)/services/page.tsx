import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteService } from "./actions";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Layanan</h1>
        <Link
          href="/admin/services/new"
          className="bg-primary text-on-primary rounded-xl px-5 py-2.5 font-semibold hover:opacity-90 transition"
        >
          + Tambah Layanan
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Gambar</th>
              <th className="px-4 py-3">Judul</th>
              <th className="px-4 py-3">Urutan</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {services.map((item) => (
              <tr key={item.id} className="border-t border-outline-variant/20">
                <td className="px-4 py-3">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-surface-container-low">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
                  </div>
                </td>
                <td className="px-4 py-3 text-on-background max-w-xs truncate">{item.title}</td>
                <td className="px-4 py-3 text-secondary">{item.order}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-4">
                    <Link href={`/admin/services/${item.id}`} className="text-primary hover:underline text-sm font-medium">
                      Edit
                    </Link>
                    <DeleteButton action={deleteService.bind(null, item.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-secondary">
                  Belum ada layanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
