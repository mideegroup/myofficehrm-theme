import { statusTone, type StatusTone } from "../../lib/status";

const TONES: Record<StatusTone, string> = {
  success: "bg-status-success text-status-success-foreground [&_i]:bg-status-success-foreground",
  warning: "bg-status-warning text-status-warning-foreground [&_i]:bg-status-warning-foreground",
  info: "bg-status-info text-status-info-foreground [&_i]:bg-status-info-foreground",
  danger: "bg-status-danger text-status-danger-foreground [&_i]:bg-status-danger-foreground",
  neutral: "bg-muted text-muted-foreground [&_i]:bg-muted-foreground",
};

/** Status badge — the canonical way to render any enumerated status.
 *  Tone resolves via lib/status.ts; pass `tone` only to override. */
export function StatusPill({ status, tone }: { status: string; tone?: StatusTone }) {
  const t = tone ?? statusTone(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${TONES[t]}`}
    >
      <i className="size-1.5 rounded-full" />
      {status}
    </span>
  );
}
