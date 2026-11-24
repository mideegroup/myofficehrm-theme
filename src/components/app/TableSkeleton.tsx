import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

/** Loading placeholder rows for a table body — `rows` skeleton rows whose
 *  cells mirror the real column shapes. `cells` is one Skeleton className per
 *  column (widths approximate the expected content so layout stays stable).
 *  Render inside the table's own <TableBody> while data is in flight. */
export function TableSkeleton({
  rows = 8,
  cells,
}: {
  rows?: number;
  cells: string[];
}) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <TableRow key={`sk-${i}`} className="hover:bg-transparent">
          {cells.map((cx, j) => (
            <TableCell key={j}>
              <Skeleton className={cx} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
