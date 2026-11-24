import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, type LucideIcon } from "lucide-react";
import type { StatusTone } from "../../lib/status";
import { cn } from "../../lib/utils";

const TONES: Record<Exclude<StatusTone, "neutral">, { icon: LucideIcon; cx: string }> = {
  info: { icon: Info, cx: "bg-status-info/50 text-status-info-foreground border-status-info-foreground/20" },
  success: { icon: CheckCircle2, cx: "bg-status-success/60 text-status-success-foreground border-status-success-foreground/20" },
  warning: { icon: AlertTriangle, cx: "bg-status-warning/60 text-status-warning-foreground border-status-warning-foreground/20" },
  danger: { icon: AlertTriangle, cx: "bg-status-danger/60 text-status-danger-foreground border-status-danger-foreground/20" },
};

/** Inline banner for persistent, in-context feedback — unlike toasts it stays
 *  on screen until resolved. `items` renders a bulleted list (field-error
 *  summaries); `children` for free-form body content. */
export function Alert({
  tone = "info",
  title,
  items,
  children,
  className,
}: {
  tone?: Exclude<StatusTone, "neutral">;
  title?: string;
  items?: string[];
  children?: ReactNode;
  className?: string;
}) {
  const { icon: Icon, cx } = TONES[tone];
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cn("flex items-start gap-3 rounded-lg border px-4 py-3", cx, className)}>
      <Icon size={17} className="mt-0.5 shrink-0" />
      <div className="min-w-0 text-[13px] leading-relaxed">
        {title && <b className="font-semibold">{title}</b>}
        {items && items.length > 0 && (
          <ul className={cn("list-disc pl-4", title && "mt-1")}>
            {items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        )}
        {children && <div className={cn(title || items?.length ? "mt-1" : "")}>{children}</div>}
      </div>
    </div>
  );
}
