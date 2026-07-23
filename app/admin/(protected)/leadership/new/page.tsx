import LeaderForm from "../LeaderForm";
import { createLeader } from "../actions";

export default function NewLeaderPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Tambah Pengurus</h1>
      <LeaderForm action={createLeader} />
    </div>
  );
}
