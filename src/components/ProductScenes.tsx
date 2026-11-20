import { Banknote, CalendarDays, Check, ChevronRight, FileText, Fingerprint, Type, ListChecks } from "lucide-react";

const cardCls = "overflow-hidden rounded-xl border border-border bg-surface-elevated";

type StepState = "done" | "current" | "todo";

const dotCls: Record<StepState, string> = {
  done: "border-accent bg-accent text-accent-foreground",
  current: "border-accent bg-background text-accent",
  todo: "border-border bg-background text-text-muted",
};

function Timeline({ steps }: { steps: { t: string; meta: string; state: StepState }[] }) {
  return (
    <ol>
      {steps.map((s, k) => (
        <li key={s.t} className="relative flex gap-4 pb-6 last:pb-0">
          {k < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute left-[11px] top-6 bottom-0 w-px ${s.state === "done" ? "bg-accent" : "bg-border"}`}
            />
          )}
          <span className={`relative inline-flex size-6 shrink-0 items-center justify-center rounded-full border ${dotCls[s.state]}`}>
            {s.state === "done" ? (
              <Check className="size-3.5" strokeWidth={2.5} />
            ) : (
              <span className="size-1.5 rounded-full bg-current" />
            )}
          </span>
          <div className="pt-0.5">
            <p className={`text-sm font-medium ${s.state === "todo" ? "text-text-muted" : ""}`}>{s.t}</p>
            <p className="mt-0.5 text-xs text-text-muted">{s.meta}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Meter({ label, used, total }: { label: string; used: number; total: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="text-text-muted">
          {total - used} of {total} left
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface ring-1 ring-border">
        <div className="h-full rounded-full bg-accent" style={{ width: `${(used / total) * 100}%` }} />
      </div>
    </div>
  );
}

function Figure({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="px-5 py-4">
      <p className="text-xs text-text-muted">{label}</p>
      <p className={`mt-1 tracking-tight ${strong ? "text-2xl font-semibold" : "text-xl font-medium"}`}>{value}</p>
    </div>
  );
}

export function FieldBuilderCard() {
  const fields = [
    { i: Type, label: "Badge number", type: "Text", on: true },
    { i: CalendarDays, label: "Probation ends", type: "Date", on: true },
    { i: ListChecks, label: "Shirt size", type: "Select", on: false },
  ];
  return (
    <div aria-hidden="true" className={`${cardCls} shadow-float`}>
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="text-xs text-text-muted">Employee profile</p>
          <p className="font-semibold">Custom fields</p>
        </div>
        <span className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium">Add field</span>
      </div>
      <ul>
        {fields.map((f) => (
          <li key={f.label} className="flex items-center gap-3.5 border-b border-border px-5 py-3.5 last:border-0">
            <span className="inline-flex size-8 items-center justify-center rounded-md border border-border text-text-muted">
              <f.i className="size-4" strokeWidth={1.75} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium">{f.label}</p>
              <p className="text-xs text-text-muted">{f.type}</p>
            </div>
            <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${f.on ? "bg-accent" : "bg-border"}`}>
              <span className={`size-4 rounded-full bg-background shadow-card transition-transform ${f.on ? "translate-x-[18px]" : "translate-x-0.5"}`} />
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 bg-surface px-5 py-3 text-xs text-text-muted">
        <Check className="size-3.5 text-success" strokeWidth={2} />
        Saved to the employee form. No code change needed.
      </div>
    </div>
  );
}

export function LeaveRequestCard({ compact = false }: { compact?: boolean }) {
  const details = [
    { k: "Dates", v: "2–4 Dec" },
    { k: "Duration", v: "3 days" },
    { k: "Balance now", v: "11 days" },
  ];
  return (
    <div aria-hidden="true" className={`${cardCls} shadow-float`}>
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <p className="text-xs text-text-muted">Leave request · REQ-2041</p>
          <p className="font-semibold">Mei Tanaka · Annual leave</p>
        </div>
        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">Pending HR</span>
      </div>
      <dl className="grid grid-cols-3 divide-x divide-border border-b border-border">
        {details.map((d) => (
          <div key={d.k} className="px-5 py-4">
            <dt className="text-xs text-text-muted">{d.k}</dt>
            <dd className="mt-1 text-sm font-medium">{d.v}</dd>
          </div>
        ))}
      </dl>
      {!compact && (
        <div className="space-y-5 px-5 py-5">
          <Meter label="Annual leave" used={9} total={20} />
          <Meter label="Sick leave" used={2} total={10} />
        </div>
      )}
      <div className="flex justify-end gap-2 border-t border-border bg-surface px-5 py-3">
        <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium">Decline</span>
        <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Approve</span>
      </div>
    </div>
  );
}

export function TodayStrip() {
  const items = [
    { v: "231", l: "of 248 present", dot: "bg-success" },
    { v: "9", l: "on leave today", dot: "bg-accent" },
    { v: "3", l: "approvals pending", dot: "bg-warning" },
    { v: "Dec 1", l: "payroll draft", dot: "bg-accent" },
  ];
  return (
    <div aria-hidden="true" className={`${cardCls} shadow-card`}>
      <div className="grid grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
        {items.map(({ v, l, dot }) => (
          <div key={l} className="flex items-center gap-2.5 px-4 py-3.5">
            <span className={`size-1.5 shrink-0 rounded-full ${dot}`} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight">{v}</p>
              <p className="truncate text-[11px] text-text-muted">{l}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmployeeMiniCard() {
  return (
    <div aria-hidden="true" className={`${cardCls} shadow-lift`}>
      <div className="flex items-center gap-3 px-5 py-4">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold ring-1 ring-border">
          MT
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Mei Tanaka</p>
          <p className="truncate text-xs text-text-muted">Financial controller · Finance</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[11px] font-medium">
          <span className="size-1.5 rounded-full bg-success" />
          Active
        </span>
      </div>
      <dl className="grid grid-cols-2 divide-x divide-border border-t border-border">
        <div className="px-5 py-3">
          <dt className="text-[11px] text-text-muted">Leave balance</dt>
          <dd className="mt-0.5 text-xs font-medium">11 days</dd>
        </div>
        <div className="px-5 py-3">
          <dt className="text-[11px] text-text-muted">Badge number</dt>
          <dd className="mt-0.5 text-xs font-medium">ND-0042 · custom field</dd>
        </div>
      </dl>
    </div>
  );
}

export function PayrollRunCard() {
  const trend = [58, 63, 61, 68, 66, 74];
  const checks = [
    { t: "Tax tables applied", meta: "248 of 248 employees" },
    { t: "Leave deductions synced", meta: "3 approved requests" },
    { t: "Bank file generated", meta: "Awaiting approval" },
  ];
  return (
    <div aria-hidden="true" className={`${cardCls} shadow-float`}>
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <p className="text-xs text-text-muted">Payroll run · Pay date 1 Dec</p>
          <p className="font-semibold">November 2026 · 248 employees</p>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium">Draft</span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        <Figure label="Gross pay" value="412,850" />
        <Figure label="Deductions" value="61,928" />
        <Figure label="Net pay" value="350,922" strong />
      </div>
      <div className="border-b border-border px-5 pb-5 pt-4">
        <p className="text-xs text-text-muted">Net pay, last six runs</p>
        <div className="mt-3 flex h-16 items-end gap-2">
          {trend.map((h, k) => (
            <span
              key={k}
              className={`flex-1 rounded-sm ${k === trend.length - 1 ? "bg-accent" : "bg-border"}`}
              style={{ height: `${(h / 74) * 100}%` }}
            />
          ))}
        </div>
      </div>
      <ul className="divide-y divide-border">
        {checks.map((c) => (
          <li key={c.t} className="flex items-center gap-3 px-5 py-3">
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
              <Check className="size-3.5" strokeWidth={2.5} />
            </span>
            <p className="flex-1 text-sm font-medium">{c.t}</p>
            <p className="text-xs text-text-muted">{c.meta}</p>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-3 bg-surface px-5 py-3">
        <p className="text-xs text-text-muted">Review the run, then approve to lock it.</p>
        <span className="shrink-0 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">Approve run</span>
      </div>
    </div>
  );
}

export function ApprovalFlowCard() {
  const steps: { t: string; meta: string; state: StepState }[] = [
    { t: "Request submitted", meta: "Mei Tanaka · Annual leave, 3 days", state: "done" },
    { t: "Manager approval", meta: "Required for every leave request", state: "done" },
    { t: "HR review", meta: "Triggered for requests over 5 days", state: "current" },
    { t: "Payroll sync", meta: "Deducted in the next run", state: "todo" },
  ];
  return (
    <div aria-hidden="true" className={`${cardCls} shadow-float`}>
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="text-xs text-text-muted">Workflow · Leave approval</p>
          <p className="font-semibold">Four steps, designed in admin</p>
        </div>
        <span className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium">Edit flow</span>
      </div>
      <div className="px-5 py-6">
        <Timeline steps={steps} />
      </div>
    </div>
  );
}

export function SelfServicePhone() {
  const actions = [
    { i: CalendarDays, l: "Request leave" },
    { i: Banknote, l: "Payslips" },
    { i: Fingerprint, l: "Check in" },
    { i: FileText, l: "Documents" },
  ];
  return (
    <div aria-hidden="true" className="w-[260px] rounded-[2.25rem] border border-border bg-primary p-2.5 shadow-float">
      <div className="overflow-hidden rounded-[1.75rem] bg-background">
        <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-primary" />
          <span className="text-text-muted">100%</span>
        </div>
        <div className="space-y-5 px-5 pb-6 pt-5">
          <div>
            <p className="text-xs text-text-muted">Good morning</p>
            <p className="text-lg font-semibold tracking-tight">Mei Tanaka</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <Meter label="Annual leave" used={9} total={20} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {actions.map(({ i: Icon, l }) => (
              <div key={l} className="flex flex-col gap-2.5 rounded-xl border border-border p-3">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                <span className="text-xs font-medium">{l}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border px-3.5 py-3">
            <span className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-text-muted">
              <FileText className="size-4" strokeWidth={1.75} />
            </span>
            <div className="flex-1">
              <p className="text-xs font-medium">October payslip</p>
              <p className="text-[11px] text-text-muted">Available to download</p>
            </div>
            <ChevronRight className="size-4 text-text-muted" strokeWidth={1.75} />
          </div>
        </div>
      </div>
    </div>
  );
}
