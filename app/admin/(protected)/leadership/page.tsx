import Link from "next/link";
import { prisma } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteLeader } from "./actions";

export default async function AdminLeadershipPage() {
  const leaders = await prisma.leader.findMany({ orderBy: [{ group: "asc" }, { order: "asc" }] });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Kepengurusan</h1>
        <Link
          href="/admin/leadership/new"
          className="bg-primary text-on-primary rounded-xl px-5 py-2.5 font-semibold hover:opacity-90 transition"
        >
          + Tambah Pengurus
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Jabatan</th>
              <th className="px-4 py-3">Kelompok</th>
              <th className="px-4 py-3">Urutan</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((item) => (
              <tr key={item.id} className="border-t border-outline-variant/20">
                <td className="px-4 py-3 text-on-background">{item.name}</td>
                <td className="px-4 py-3 text-secondary">{item.role}</td>
                <td className="px-4 py-3 text-secondary">{item.group}</td>
                <td className="px-4 py-3 text-secondary">{item.order}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-4">
                    <Link href={`/admin/leadership/${item.id}`} className="text-primary hover:underline text-sm font-medium">
                      Edit
                    </Link>
                    <DeleteButton action={deleteLeader.bind(null, item.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {leaders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-secondary">
                  Belum ada data pengurus.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
