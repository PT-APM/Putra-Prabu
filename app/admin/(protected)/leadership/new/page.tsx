import LeaderForm from "../LeaderForm";
import { createLeader } from "../actions";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NewLeaderPage() {
  const dict = getDictionary(await getAdminLocale());
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">{dict.admin.leadership.addTitle}</h1>
      <LeaderForm action={createLeader} dict={dict} />
    </div>
  );
}
