import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Canonical empty state — icon + title + hint, centered. Use inside tables,
 *  cards and pages whenever a list can be empty. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-14 text-center">
      <Icon size={22} className="text-muted-foreground" />
      <b className="text-sm font-semibold">{title}</b>
      {description && <span className="max-w-xs text-xs text-muted-foreground">{description}</span>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
