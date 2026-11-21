import { CalendarDays, Clock, LayoutGrid, Settings2, Users, Wallet } from "lucide-react";

const nav = [
  { i: LayoutGrid, l: "Dashboard", a: true },
  { i: Users, l: "Employees" },
  { i: CalendarDays, l: "Leave" },
  { i: Clock, l: "Attendance" },
  { i: Wallet, l: "Payroll" },
  { i: Settings2, l: "Config" },
];
const bars = [45, 62, 38, 70, 55, 82, 64, 90, 58, 76, 68, 85];
const rows = [
  ["Aanya Rao", "Design", "Approved", "text-success"],
  ["Diego Silva", "Engineering", "Pending", "text-warning"],
  ["Mei Tanaka", "Finance", "Approved", "text-success"],
  ["Omar Haddad", "Support", "Declined", "text-destructive"],
];

export function DashboardMock() {
  return (
    <div
      role="img"
      aria-label="Illustration of the myOfficeHRM dashboard"
      className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-primary/10"
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="mx-auto rounded-md border border-border bg-background px-3 py-0.5 text-xs text-muted-foreground">
          demo.myofficehrm.com
        </span>
      </div>
      <div className="grid md:grid-cols-[170px_1fr]">
        <aside className="hidden border-r border-border bg-muted/60 p-3 md:block">
          {nav.map(({ i: Icon, l, a }) => (
            <div
              key={l}
              className={`mb-0.5 flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm ${
                a ? "bg-accent-10 font-medium text-accent" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-4" /> {l}
            </div>
          ))}
        </aside>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Headcount", "52"],
              ["On leave today", "4"],
              ["Present", "46"],
              ["Next payroll", "5 days"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border p-3">
                <p className="text-xs text-muted-foreground">{k}</p>
                <p className="mt-1 text-xl font-semibold">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-5">
            <div className="rounded-lg border border-border p-3 lg:col-span-3">
              <p className="text-xs font-medium text-muted-foreground">Attendance, last 12 weeks</p>
              <div className="mt-3 flex h-28 items-end gap-1.5">
                {bars.map((h, n) => (
                  <div
                    key={n}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-t ${n === bars.length - 1 ? "bg-accent" : "bg-accent-30"}`}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border p-3 lg:col-span-2">
              <p className="text-xs font-medium text-muted-foreground">Leave requests</p>
              <ul className="mt-2 space-y-2">
                {rows.map(([n, d, s, c]) => (
                  <li key={n} className="flex items-center justify-between text-xs">
                    <span>
                      <span className="font-medium">{n}</span>
                      <span className="block text-muted-foreground">{d}</span>
                    </span>
                    <span className={`font-medium ${c}`}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
