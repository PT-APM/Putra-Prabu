import NewsForm from "../NewsForm";
import { createNews } from "../actions";

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Tambah Berita</h1>
      <NewsForm action={createNews} />
    </div>
  );
}
