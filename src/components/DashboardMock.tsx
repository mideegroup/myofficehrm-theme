import { Bell, Building2, CalendarDays, Check, ChevronDown, Clock, Lock, LayoutDashboard, Search, Settings2, TrendingUp, Users, Wallet, Workflow, X } from "lucide-react";

const nav = [
  {
    group: "Workspace",
    items: [
      { i: LayoutDashboard, l: "Dashboard", active: true },
      { i: Users, l: "Employees" },
      { i: CalendarDays, l: "Leave", count: 3 },
      { i: Clock, l: "Attendance" },
    ],
  },
  { group: "Finance", items: [{ i: Wallet, l: "Payroll" }] },
  {
    group: "Admin",
    items: [
      { i: Workflow, l: "Workflows" },
      { i: Settings2, l: "Configuration" },
    ],
  },
];

const stats = [
  { label: "Headcount", value: "248", delta: "+6 this month", up: true },
  { label: "Present today", value: "231", delta: "93% of team" },
  { label: "On leave today", value: "9", delta: "2 starting this week" },
  { label: "Next payroll", value: "1 Dec", delta: "Draft ready" },
];

const people = [
  { n: "Aanya Rao", r: "Product designer", d: "Design", s: "Active", j: "Mar 2022", c: "bg-success" },
  { n: "Diego Silva", r: "Backend engineer", d: "Engineering", s: "Probation", j: "Jan 2026", c: "bg-warning" },
  { n: "Mei Tanaka", r: "Financial controller", d: "Finance", s: "Active", j: "Jun 2019", c: "bg-success" },
  { n: "Omar Haddad", r: "Support lead", d: "Support", s: "On leave", j: "Sep 2023", c: "bg-accent" },
  { n: "Lena Fischer", r: "HR business partner", d: "People", s: "Active", j: "Feb 2021", c: "bg-success" },
];

const requests = [
  { n: "Mei Tanaka", t: "Annual leave", meta: "3 days · 2–4 Dec" },
  { n: "Diego Silva", t: "Sick leave", meta: "1 day · 24 Nov" },
  { n: "Lena Fischer", t: "Casual leave", meta: "2 days · 27–28 Nov" },
];

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

export function DashboardMock() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-border bg-background text-left shadow-card"
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1 text-xs text-text-muted">
          <Lock className="size-3" strokeWidth={1.75} />
          demo.myofficehrm.com
        </div>
        <div className="hidden w-12 sm:block" />
      </div>

      <div className="grid md:grid-cols-[200px_1fr]">
        <aside className="hidden border-r border-border bg-surface/50 p-3 md:block">
          <div className="mb-4 flex items-center gap-2.5 rounded-lg border border-border bg-background px-2.5 py-2 shadow-card">
            <span className="inline-flex size-6 items-center justify-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">
              <Building2 className="size-3.5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">Northwind Ltd</span>
            <ChevronDown className="size-3.5 text-text-muted" strokeWidth={1.75} />
          </div>
          {nav.map((group) => (
            <div key={group.group} className="mb-3">
              <p className="px-2.5 pb-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">{group.group}</p>
              {group.items.map(({ i: Icon, l, active, count }) => (
                <div
                  key={l}
                  className={`mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm ${
                    active ? "bg-background font-medium text-text ring-1 ring-border shadow-card" : "text-text-muted"
                  }`}
                >
                  <Icon className={`size-4 shrink-0 ${active ? "text-accent" : ""}`} strokeWidth={1.75} />
                  <span className="flex-1">{l}</span>
                  {count && (
                    <span className="rounded-full bg-accent/10 px-1.5 text-[11px] font-medium text-accent">{count}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </aside>

        <div className="min-w-0 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <p className="text-xs text-text-muted">Dashboard</p>
              <p className="truncate text-base font-semibold tracking-tight">Good morning, Priya</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden w-40 items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-text-muted lg:flex">
                <Search className="size-3.5" strokeWidth={1.75} />
                <span>Search people</span>
                <kbd className="ml-auto rounded border border-border bg-background px-1 font-mono text-[10px]">⌘K</kbd>
              </div>
              <span className="relative inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background">
                <Bell className="size-4 text-text-muted" strokeWidth={1.75} />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" />
              </span>
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-surface text-[11px] font-semibold ring-1 ring-border">
                PN
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map(({ label, value, delta, up }) => (
              <div key={label} className="rounded-lg border border-border bg-background p-3 shadow-card">
                <p className="text-xs text-text-muted">{label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-text-muted">
                  {up && <TrendingUp className="size-3 text-success" strokeWidth={2} />}
                  {delta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="min-w-0 overflow-hidden rounded-lg border border-border lg:col-span-2">
              <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
                <p className="text-sm font-medium">Employees</p>
                <span className="rounded-md border border-border px-2 py-0.5 text-xs text-text-muted">Filter</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[360px] text-left text-xs">
                  <thead className="text-text-muted">
                    <tr className="border-b border-border">
                      <th scope="col" className="px-3.5 py-2 font-medium">Name</th>
                      <th scope="col" className="hidden px-3.5 py-2 font-medium sm:table-cell">Department</th>
                      <th scope="col" className="px-3.5 py-2 font-medium">Status</th>
                      <th scope="col" className="hidden px-3.5 py-2 font-medium sm:table-cell">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {people.map((p) => (
                      <tr key={p.n} className="border-b border-border last:border-0">
                        <td className="px-3.5 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-semibold ring-1 ring-border">
                              {initials(p.n)}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-medium">{p.n}</p>
                              <p className="truncate text-text-muted">{p.r}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-3.5 py-2.5 text-text-muted sm:table-cell">{p.d}</td>
                        <td className="px-3.5 py-2.5">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[11px] font-medium">
                            <span className={`size-1.5 rounded-full ${p.c}`} />
                            {p.s}
                          </span>
                        </td>
                        <td className="hidden whitespace-nowrap px-3.5 py-2.5 text-text-muted sm:table-cell">{p.j}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-border lg:col-span-1">
              <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
                <p className="text-sm font-medium">Leave approvals</p>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">3 pending</span>
              </div>
              <ul>
                {requests.map((r) => (
                  <li key={r.n} className="flex items-center gap-2.5 border-b border-border px-3.5 py-2.5 last:border-0">
                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-semibold ring-1 ring-border">
                      {initials(r.n)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{r.n}</p>
                      <p className="truncate text-text-muted">{r.t} · {r.meta}</p>
                    </div>
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-border text-text-muted">
                      <X className="size-3.5" strokeWidth={1.75} />
                    </span>
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Check className="size-3.5" strokeWidth={2} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-border px-3.5 py-2.5 text-xs font-medium text-accent">View all requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
