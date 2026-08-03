import NewsForm from "../NewsForm";
import { createNews } from "../actions";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NewNewsPage() {
  const dict = getDictionary(await getAdminLocale());
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">{dict.admin.news.addTitle}</h1>
      <NewsForm action={createNews} dict={dict} />
    </div>
  );
}
