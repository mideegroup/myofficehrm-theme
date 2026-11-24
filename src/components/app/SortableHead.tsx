import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { TableHead } from "../ui/table";

export type SortDir = "asc" | "desc";

/** Sortable column header — the pattern for every data table. `sortKey`
 *  identifies the column; the parent owns {key, dir} state. */
export function SortableHead({
  label,
  sortKey,
  sort,
  onSort,
  className,
}: {
  label: string;
  sortKey: string;
  sort: { key: string; dir: SortDir };
  onSort: (key: string) => void;
  className?: string;
}) {
  const active = sort.key === sortKey;
  const Icon = active ? (sort.dir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <TableHead className={className ?? "text-[10px] font-bold tracking-[0.08em]"}>
      <button
        onClick={() => onSort(sortKey)}
        aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
        className={`inline-flex items-center gap-1 transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        {label}
        <Icon size={12} className={active ? "text-accent" : "opacity-60"} />
      </button>
    </TableHead>
  );
}
