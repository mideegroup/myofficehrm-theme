import { PageIntro } from "../components/app/PageIntro";
import { StatusPill } from "../components/app/StatusPill";
import { EmptyState } from "../components/app/EmptyState";
import { Skeleton } from "../components/ui/skeleton";
import { statusTints, type StatusTone } from "../lib/status";
import { Inbox } from "lucide-react";

const TONE_ROWS: { tone: StatusTone; note: string }[] = [
  { tone: "success", note: "Positive / complete — active records, approved requests" },
  { tone: "warning", note: "Attention — pending approvals, expiring items, on-leave" },
  { tone: "info", note: "Neutral progress — in-flight work, probation, informational" },
  { tone: "danger", note: "Negative / blocked — rejected, expired, errors" },
  { tone: "neutral", note: "Inert — disabled or off states; muted tokens, not an alarm" },
];

const TONE_SAMPLE: Record<StatusTone, string> = {
  success: "Approved",
  warning: "Pending",
  info: "In progress",
  danger: "Rejected",
  neutral: "Disabled",
};

/** Prototype → Status pills. Reference sheet for the enumerated status system:
 *  every domain status maps to one of four tones (lib/status.ts); tones are
 *  scheme-independent tokens so tenant accent can never repaint them. */
export default function StatusesPage() {
  return (
    <div className="flex max-w-[720px] flex-col gap-6">
      <PageIntro
        eyebrow="PROTOTYPE"
        title="Status pills"
        description="Enumerated statuses → semantic tones. Add statuses to statusTints — never hand-roll colours."
      />

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">TONES</h2>
        <div className="mt-4 flex flex-col gap-3">
          {TONE_ROWS.map(({ tone, note }) => (
            <div key={tone} className="flex items-center gap-4">
              <div className="w-28">
                <StatusPill status={TONE_SAMPLE[tone]} tone={tone} />
              </div>
              <code className="w-20 text-[11px] font-semibold text-muted-foreground">{tone}</code>
              <span className="text-xs text-muted-foreground">{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">ENUMERATED STATUSES</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Everything in <code className="rounded bg-muted px-1 font-mono text-[11px]">statusTints</code> — unknown strings fall back to the info tone.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.keys(statusTints).map((s) => (
            <StatusPill key={s} status={s} />
          ))}
          <StatusPill status="Unmapped example" />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">LIST STATES</h2>
        <p className="mt-1 text-xs text-muted-foreground">The two states every list/table screen implements — shown live on the employees page.</p>
        <div className="mt-4 space-y-2.5 rounded-lg border border-border p-4">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3.5 w-3/4" />
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3.5 w-3/5" />
        </div>
        <div className="mt-3 rounded-lg border border-border">
          <EmptyState icon={Inbox} title="Nothing here yet" description="EmptyState — shared component, reused by tables, cards and module placeholders." />
        </div>
      </section>
    </div>
  );
}
