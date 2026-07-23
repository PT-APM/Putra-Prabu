import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
}

type PageItem = number | "ellipsis";

function getPageWindow(page: number, totalPages: number): PageItem[] {
  const items: PageItem[] = [];
  const windowSize = 1;

  const start = Math.max(2, page - windowSize);
  const end = Math.min(totalPages - 1, page + windowSize);

  items.push(1);
  if (start > 2) items.push("ellipsis");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < totalPages - 1) items.push("ellipsis");
  if (totalPages > 1) items.push(totalPages);

  return items;
}

const arrowButtonClass =
  "w-10 h-10 rounded-full border border-outline-variant/60 flex items-center justify-center transition-colors shadow-sm bg-surface-container-lowest";

export default function Pagination({ page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(page, totalPages);
  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <section className="flex justify-center items-center space-x-2 mt-8">
      {prevPage >= 1 ? (
        <Link
          href={`/news?page=${prevPage}`}
          className={`${arrowButtonClass} text-secondary hover:text-primary hover:border-primary`}
          aria-label="Halaman sebelumnya"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </Link>
      ) : (
        <span className={`${arrowButtonClass} text-secondary opacity-50`}>
          <span className="material-symbols-outlined">chevron_left</span>
        </span>
      )}

      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="text-secondary px-2">
            ...
          </span>
        ) : item === page ? (
          <span
            key={item}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center shadow-md"
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={`/news?page=${item}`}
            className="w-10 h-10 rounded-full border border-outline-variant/60 text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center hover:bg-surface-variant transition-all shadow-sm bg-surface-container-lowest"
          >
            {item}
          </Link>
        )
      )}

      {nextPage <= totalPages ? (
        <Link
          href={`/news?page=${nextPage}`}
          className={`${arrowButtonClass} text-secondary hover:text-primary hover:border-primary`}
          aria-label="Halaman berikutnya"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </Link>
      ) : (
        <span className={`${arrowButtonClass} text-secondary opacity-50`}>
          <span className="material-symbols-outlined">chevron_right</span>
        </span>
      )}
    </section>
  );
}
