import {
  Activity, ArrowRight, ArrowUpRight, BriefcaseBusiness, CalendarDays, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, Clock3, MoreHorizontal, Plus, UserRound, Users, Wallet,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../components/Button";
import { PageIntro } from "../components/app/PageIntro";

const TINTS: Record<string, string> = {
  default: "bg-accent-10 text-accent",
  lavender: "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  blue: "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
  mint: "bg-teal-100 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300",
};

function StatCard({
  icon: Icon, label, value, change, tint = "default",
}: {
  icon: LucideIcon; label: string; value: string; change: ReactNode; tint?: keyof typeof TINTS;
}) {
  return (
    <article className="flex min-h-[120px] flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
      <span className={`mb-3 grid size-9 place-items-center rounded-lg ${TINTS[tint]}`}>
        <Icon size={18} />
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <strong className="mt-0.5 text-2xl font-semibold tracking-tight">{value}</strong>
      <small className="mt-auto pt-2 text-xs text-muted-foreground">{change}</small>
    </article>
  );
}

function WidgetCard({
  title, subtitle, action, children, className = "",
}: {
  title: string; subtitle: string; action?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <section className={`min-w-0 rounded-xl border border-border bg-card p-5 shadow-sm ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {action ?? (
          <button
            aria-label={`More ${title.toLowerCase()} options`}
            className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MoreHorizontal size={18} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

const STATS: { icon: LucideIcon; label: string; value: string; change: ReactNode; tint?: keyof typeof TINTS }[] = [
  { icon: Users, label: "Total employees", value: "1,248", change: <><i className="not-italic text-accent">↑ 8.2%</i> vs last month</> },
  { icon: UserRound, label: "New hires", value: "32", change: <><i className="not-italic text-accent">↑ 12%</i> this month</>, tint: "lavender" },
  { icon: CalendarDays, label: "Active leave requests", value: "17", change: "5 awaiting approval", tint: "amber" },
  { icon: Wallet, label: "Payroll pending", value: "2 days", change: "Next pay run · 22 May", tint: "blue" },
  { icon: BriefcaseBusiness, label: "Open positions", value: "21", change: "Across 6 departments", tint: "rose" },
  { icon: Activity, label: "Attendance rate", value: "98.4%", change: <><i className="not-italic text-accent">↑ 1.4%</i> this week</>, tint: "mint" },
];

const DEPARTMENTS = [
  ["Engineering", "32%", "#397d62"],
  ["People & Culture", "21%", "#83ad94"],
  ["Operations", "18%", "#bdd2b7"],
  ["Finance", "16%", "#d7c89e"],
  ["Other", "13%", "#dfe9df"],
] as const;

const ACTIVITY = [
  ["AM", "Ava Mitchell", "submitted a leave request", "Annual leave · 24–28 May", "12 min ago"],
  ["IC", "Isabella Chen", "completed payroll review", "May fortnightly cycle", "48 min ago"],
  ["OP", "Oliver Patel", "updated employee details", "Emergency contact updated", "2 hours ago"],
  ["EN", "Ethan Nguyen", "welcomed a new team member", "New starter · Product team", "Yesterday"],
] as const;

const AVATAR_TINTS = ["bg-accent-10 text-accent", "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300", "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300", "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300"];

const EVENTS = [
  ["21", "Mia Thompson", "Marketing · Birthday", "Birthday"],
  ["23", "Jack Anderson", "Engineering · 1 year", "Anniversary"],
  ["26", "Grace Taylor", "Customer Success · Birthday", "Birthday"],
] as const;

const CUSTOM_WIDGETS = [
  [Activity, "Team engagement", "Engagement pulse · 86%"],
  [CalendarDays, "Upcoming holidays", "King's Birthday · 9 Jun"],
  [Users, "Headcount by location", "Melbourne 38% · Sydney 32%"],
] as const;

const LEAVE_DAYS = [5, 14, 19, 20, 21, 27];
const MONTH_LABELS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

export default function Dashboard() {
  return (
    <>
      <PageIntro
        eyebrow="MONDAY, 20 MAY 2025"
        title="Good morning, Demo User"
        description="Here's a snapshot of what's happening across your organization today."
        action={
          <Button variant="secondary" className="h-10">
            <CalendarDays size={16} /> This month <ChevronDown size={14} />
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1.45fr_1fr_1fr]">
        <WidgetCard title="Workforce overview" subtitle="Employee headcount over the last 12 months">
          <div className="mt-4 flex items-baseline gap-2">
            <strong className="text-3xl font-semibold tracking-tight">1,248</strong>
            <span className="text-xs text-muted-foreground">
              <i className="not-italic text-accent">↑ 8.2%</i> vs last year
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <div className="flex flex-col justify-between pb-6 text-right text-[10px] text-muted-foreground">
              <span>1,400</span><span>1,200</span><span>1,000</span><span>800</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="relative">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((i) => (
                    <i key={i} className="border-t border-border/70" />
                  ))}
                </div>
                <svg viewBox="0 0 600 160" preserveAspectRatio="none" aria-label="Headcount trend line" className="block h-40 w-full">
                  <defs>
                    <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="var(--accent-50)" stopOpacity=".22" />
                      <stop offset="1" stopColor="var(--accent-50)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 135 C42 130 46 119 95 122 S150 108 184 111 S240 91 276 100 S335 77 368 82 S410 61 456 70 S510 43 548 51 S578 30 600 23 V160 H0Z"
                    fill="url(#area-fill)"
                  />
                  <path
                    d="M0 135 C42 130 46 119 95 122 S150 108 184 111 S240 91 276 100 S335 77 368 82 S410 61 456 70 S510 43 548 51 S578 30 600 23"
                    fill="none"
                    stroke="var(--accent-70)"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                {MONTH_LABELS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title="Department distribution" subtitle="Employees by department">
          <div className="mt-4 flex flex-col items-center gap-5">
            <div
              className="relative size-36 rounded-full"
              style={{
                background:
                  "conic-gradient(#397d62 0 32%, #83ad94 32% 53%, #bdd2b7 53% 71%, #d7c89e 71% 87%, #dfe9df 87% 100%)",
              }}
            >
              <div className="absolute inset-[26%] grid place-items-center rounded-full bg-card text-center">
                <div>
                  <strong className="block text-xl font-semibold">1,248</strong>
                  <small className="text-[10px] text-muted-foreground">Employees</small>
                </div>
              </div>
            </div>
            <div className="w-full space-y-1.5">
              {DEPARTMENTS.map(([name, pct, color]) => (
                <span key={name} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <i className="size-2.5 rounded-full" style={{ background: color }} />
                  {name}
                  <b className="ml-auto font-semibold text-foreground">{pct}</b>
                </span>
              ))}
            </div>
          </div>
        </WidgetCard>

        <WidgetCard
          title="Leave calendar"
          subtitle="Upcoming team absences"
          action={
            <button className="flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent-70">
              View calendar <ArrowUpRight size={14} />
            </button>
          }
        >
          <div className="mt-4 flex items-center gap-1.5">
            <button aria-label="Previous month" className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <ChevronLeft size={16} />
            </button>
            <b className="text-sm font-semibold">May 2025</b>
            <button aria-label="Next month" className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <ChevronRight size={16} />
            </button>
            <span className="ml-auto text-[10px] font-semibold text-muted-foreground">Today</span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-0.5 text-center text-[10px] font-semibold text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-0.5 text-center text-[11px]">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2;
              const out = day < 1 || day > 31;
              return (
                <span
                  key={i}
                  className={`relative grid h-7 place-items-center rounded-md ${
                    out ? "text-muted-foreground/40" : "text-foreground"
                  } ${day === 20 ? "bg-accent-70 font-bold text-white" : ""}`}
                >
                  {out ? (day < 1 ? 30 + day : day - 31) : day}
                  {!out && LEAVE_DAYS.includes(day) && day !== 20 && (
                    <i className="absolute bottom-0.5 size-1 rounded-full bg-accent" />
                  )}
                </span>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <i className="size-1.5 rounded-full bg-accent" /> 4 people away today
            </span>
            <a href="#leave" className="flex items-center gap-1 font-semibold text-accent">
              View leave schedule <ArrowRight size={13} />
            </a>
          </div>
        </WidgetCard>

        <WidgetCard title="Recent activity" subtitle="Latest updates across your team">
          <div className="mt-3 divide-y divide-border">
            {ACTIVITY.map(([initials, name, action, detail, time], i) => (
              <div key={name} className="flex items-center gap-3 py-2.5">
                <span className={`grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-bold ${AVATAR_TINTS[i]}`}>
                  {initials}
                </span>
                <span className="min-w-0 flex-1 text-[13px] leading-snug">
                  <b className="font-semibold">{name}</b>{" "}
                  <span className="text-muted-foreground">{action}</span>
                  <small className="block truncate text-xs text-muted-foreground">{detail}</small>
                </span>
                <time className="shrink-0 text-[10px] text-muted-foreground">{time}</time>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Payroll processing" subtitle="May · Fortnightly pay cycle">
          <div className="mt-4 flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-10 text-accent">
              <Check size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <b className="block text-sm font-semibold">On track for payday</b>
              <small className="text-xs text-muted-foreground">Payroll closes in 2 days · 22 May</small>
            </div>
            <span className="rounded-full bg-accent-10 px-2.5 py-1 text-[10px] font-bold text-accent">
              In progress
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2.5">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <i className="block h-full w-[72%] rounded-full bg-accent" />
            </span>
            <b className="text-xs font-semibold">72%</b>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 text-accent">
              <CheckCircle2 size={15} /> Employee data
            </span>
            <span className="flex items-center gap-1.5 text-accent">
              <CheckCircle2 size={15} /> Timesheets
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 size={15} /> Final review
            </span>
          </div>
        </WidgetCard>

        <WidgetCard title="Coming up" subtitle="Birthdays & work anniversaries">
          <div className="mt-3 divide-y divide-border">
            {EVENTS.map(([day, name, detail, type]) => (
              <div key={name} className="flex items-center gap-3 py-2.5">
                <span className="grid w-9 shrink-0 place-items-center rounded-lg border border-border bg-muted/50 py-1 leading-none">
                  <b className="text-sm font-semibold">{day}</b>
                  <small className="text-[8px] font-bold text-muted-foreground">MAY</small>
                </span>
                <span className="min-w-0 flex-1 leading-snug">
                  <b className="block truncate text-[13px] font-semibold">{name}</b>
                  <small className="text-xs text-muted-foreground">{detail}</small>
                </span>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.12em] text-accent">MAKE IT YOURS</span>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight">Custom dashboard widgets</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Arrange your workspace around the information that matters most.
            </p>
          </div>
          <Button variant="secondary" className="h-10">
            <Plus size={16} /> Add widget
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CUSTOM_WIDGETS.map(([Icon, title, detail]) => (
            <article key={title} className="rounded-xl border border-dashed border-border bg-card p-4">
              <div className="flex items-center gap-1 pb-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="size-1 rounded-full bg-border" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-accent-10 text-accent">
                  <Icon size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <b className="block text-sm font-semibold">{title}</b>
                  <small className="text-xs text-muted-foreground">{detail}</small>
                </div>
                <button aria-label={`More ${title} options`} className="text-muted-foreground transition-colors hover:text-foreground">
                  <MoreHorizontal size={17} />
                </button>
              </div>
              <div className="mt-3 flex h-10 items-end gap-1">
                {[40, 65, 50, 80, 60, 90, 70].map((v, i) => (
                  <i key={i} style={{ height: `${v}%` }} className="flex-1 rounded-t-sm bg-accent-30/60" />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
