import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

/** List footer pagination — "Showing X–Y of N" + prev/pages/next.
 *  `itemLabel` is the noun ("employees", "requests"); `loading` renders the
 *  skeleton variant while data is in flight. */
export function Pagination({
  page,
  total,
  pageSize,
  onPage,
  itemLabel = "items",
  loading = false,
}: {
  page: number;
  total: number;
  pageSize: number;
  onPage: (page: number) => void;
  itemLabel?: string;
  loading?: boolean;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
      {loading ? (
        <Skeleton className="h-4 w-44" />
      ) : (
        <span>
          Showing <b className="text-foreground">{from}–{to}</b> of{" "}
          <b className="text-foreground">{total}</b> {itemLabel}
        </span>
      )}
      <div className="flex items-center gap-1">
        <button
          disabled={page === 1 || loading}
          onClick={() => onPage(page - 1)}
          aria-label="Previous page"
          className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors enabled:hover:bg-muted disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPage(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}
            className={`grid size-7 place-items-center rounded-md border text-xs font-medium transition-colors ${
              page === i + 1
                ? "border-accent-30 bg-accent-10 font-bold text-accent"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages || loading}
          onClick={() => onPage(page + 1)}
          aria-label="Next page"
          className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors enabled:hover:bg-muted disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
