import { useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, CalendarCheck, CalendarDays, ChevronDown, ChevronLeft, ChevronRight,
  Download, FileText, Filter, Mail, MoreHorizontal, Plus, Search, SlidersHorizontal, Wallet, X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";
import { Avatar } from "../components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { PageIntro } from "../components/app/PageIntro";
import { employees, type Employee } from "../lib/employees";

const PAGE_SIZE = 8;
const TABS = ["Profile", "Employment", "Leave", "Payroll", "Documents", "Notes"];

const SELECT_CX =
  "h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground shadow-sm " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const STATUS_STYLES: Record<Employee["status"], string> = {
  Active: "bg-accent-10 text-accent [&_i]:bg-accent",
  "On leave": "bg-amber-100 text-amber-700 [&_i]:bg-amber-500 dark:bg-amber-400/15 dark:text-amber-300",
  Probation: "bg-sky-100 text-sky-700 [&_i]:bg-sky-500 dark:bg-sky-400/15 dark:text-sky-300",
};

function StatusPill({ status }: { status: Employee["status"] }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[status]}`}>
      <i className="size-1.5 rounded-full" />
      {status}
    </span>
  );
}

function Insight({ icon: Icon, title, detail }: { icon: LucideIcon; title: string; detail: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-10 text-accent">
        <Icon size={17} />
      </span>
      <span className="min-w-0 flex-1 leading-snug">
        <b className="block text-[13px] font-semibold">{title}</b>
        <small className="text-xs text-muted-foreground">{detail}</small>
      </span>
      <ArrowUpRight size={15} className="shrink-0 text-muted-foreground" />
    </div>
  );
}

export default function Employees() {
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState<Employee | null>(null);
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [tab, setTab] = useState("Profile");

  const filtered = useMemo(
    () =>
      employees
        .filter(
          (p) =>
            `${p.first} ${p.last} ${p.id} ${p.dept} ${p.title} ${p.loc}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            (!department || p.dept === department) &&
            (!location || p.loc === location) &&
            (!status || p.status === status) &&
            (!type || p.type === type),
        )
        .sort((a, b) => (sortAsc ? a.last.localeCompare(b.last) : b.last.localeCompare(a.last))),
    [query, department, location, status, type, sortAsc],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeFilters: [string, string, (v: string) => void][] = [
    [department, "Department", setDepartment],
    [location, "Location", setLocation],
    [type, "Type", setType],
    [status, "Status", setStatus],
  ];
  const filterCount = activeFilters.filter(([v]) => v).length;
  const reset = () => {
    setQuery(""); setDepartment(""); setLocation(""); setStatus(""); setType(""); setPage(1);
  };
  const openProfile = (p: Employee) => {
    setSelected(p);
    setTab("Profile");
  };

  const departments = [...new Set(employees.map((x) => x.dept))].sort();
  const locations = [...new Set(employees.map((x) => x.loc))].sort();

  return (
    <>
      <PageIntro
        eyebrow="PEOPLE DIRECTORY"
        title="Employee Directory"
        description="Manage your people, their details and their employee lifecycle."
        action={
          <>
            <Button variant="secondary" className="h-10">
              <Download size={16} /> Export
            </Button>
            <Button className="h-10 bg-accent-70 font-bold hover:bg-accent-90">
              <Plus size={16} /> Add employee
            </Button>
          </>
        }
      />

      <div className="flex items-center gap-2.5">
        <label className="flex h-10 w-full max-w-sm items-center gap-2 rounded-lg border border-input bg-background px-3 text-muted-foreground transition-colors focus-within:ring-2 focus-within:ring-ring">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search by name, number or role..."
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
        <Button
          variant="secondary"
          className={`h-10 ${filtersOpen ? "border-accent-30 bg-accent-10 text-accent" : ""}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <Filter size={16} /> Filters
          {filterCount > 0 && (
            <span className="grid size-[18px] place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              {filterCount}
            </span>
          )}
          <ChevronDown size={15} />
        </Button>
        <Button variant="secondary" className="h-10" onClick={() => setSortAsc(!sortAsc)}>
          <SlidersHorizontal size={16} /> Sort
        </Button>
      </div>

      {filtersOpen && (
        <section className="mt-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            <label className="text-xs font-medium text-muted-foreground">
              Employee number
              <Input
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="e.g. E-1042"
                className="mt-1.5 h-9"
              />
            </label>
            <label className="text-xs font-medium text-muted-foreground">
              Name
              <Input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search employee name"
                className="mt-1.5 h-9"
              />
            </label>
            <label className="text-xs font-medium text-muted-foreground">
              Department
              <select value={department} onChange={(e) => { setDepartment(e.target.value); setPage(1); }} className={`mt-1.5 ${SELECT_CX}`}>
                <option value="">All departments</option>
                {departments.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
            <label className="text-xs font-medium text-muted-foreground">
              Location
              <select value={location} onChange={(e) => { setLocation(e.target.value); setPage(1); }} className={`mt-1.5 ${SELECT_CX}`}>
                <option value="">All locations</option>
                {locations.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
            <label className="text-xs font-medium text-muted-foreground">
              Employment type
              <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} className={`mt-1.5 ${SELECT_CX}`}>
                <option value="">All types</option>
                {["Full-time", "Part-time", "Contract"].map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
            <label className="text-xs font-medium text-muted-foreground">
              Status
              <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className={`mt-1.5 ${SELECT_CX}`}>
                <option value="">All statuses</option>
                {["Active", "On leave", "Probation"].map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-border pt-3.5">
            <div className="flex flex-wrap gap-1.5">
              {activeFilters.filter(([v]) => v).map(([v, label, setter]) => (
                <button
                  key={label}
                  onClick={() => setter("")}
                  className="flex h-7 items-center gap-1.5 rounded-full border border-accent-30 bg-accent-10 px-2.5 text-[11px] font-semibold text-accent transition-colors hover:bg-accent-30/40"
                >
                  {label}: {v} <X size={12} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="h-9" onClick={reset}>Reset</Button>
              <Button className="h-9 bg-accent-70 font-bold hover:bg-accent-90" onClick={() => setPage(1)}>Search</Button>
            </div>
          </div>
        </section>
      )}

      <section className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-start justify-between border-b border-border p-4">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight">
              All employees <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">{filtered.length}</span>
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">A complete view of your organization's people</p>
          </div>
          <button aria-label="More employee table options" className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <MoreHorizontal size={19} />
          </button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">
                EMPLOYEE #{" "}
                <button onClick={() => setSortAsc(!sortAsc)} className="align-middle text-muted-foreground">↕</button>
              </TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">PHOTO</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">NAME</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">EMAIL</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">DEPARTMENT</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">POSITION</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">LOCATION</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">EMPLOYMENT TYPE</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">STATUS</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">HIRE DATE</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.map((p, i) => (
              <TableRow
                key={p.id}
                tabIndex={0}
                onClick={() => openProfile(p)}
                onKeyDown={(e) => { if (e.key === "Enter") openProfile(p); }}
                className="cursor-pointer"
              >
                <TableCell className="text-xs text-muted-foreground">{p.id}</TableCell>
                <TableCell><Avatar initials={p.initials} size="sm" /></TableCell>
                <TableCell className="text-[13px] font-semibold">{p.first} {p.last}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {p.first.toLowerCase()}.{p.last.toLowerCase()}@northstar.example
                </TableCell>
                <TableCell className="text-xs">{p.dept}</TableCell>
                <TableCell className="text-xs">{p.title}</TableCell>
                <TableCell className="text-xs">{p.loc}</TableCell>
                <TableCell className="text-xs">{p.type}</TableCell>
                <TableCell><StatusPill status={p.status} /></TableCell>
                <TableCell className="text-xs text-muted-foreground">{p.hire}</TableCell>
                <TableCell>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(p); }}
                    aria-label={`More options for ${p.first} ${p.last}`}
                    className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {shown.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={11} className="py-14 text-center">
                  <Search size={21} className="mx-auto text-muted-foreground" />
                  <b className="mt-2 block text-sm font-semibold">No employees found</b>
                  <span className="text-xs text-muted-foreground">Try adjusting your search or filters.</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>
            Showing <b className="text-foreground">{filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, filtered.length)}</b> of{" "}
            <b className="text-foreground">{filtered.length}</b> employees
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              aria-label="Previous page"
              className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors enabled:hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`grid size-7 place-items-center rounded-md border text-xs font-medium transition-colors ${
                  page === i + 1
                    ? "border-accent-30 bg-accent-10 font-bold text-accent"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {i + 1}
              </button>
            )).slice(0, 4)}
            {totalPages > 4 && <span className="px-1">…</span>}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              aria-label="Next page"
              className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors enabled:hover:bg-muted disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {selected && (
        <>
          <div
            className="fixed inset-0 z-40 bg-foreground/40"
            onClick={() => setSelected(null)}
            aria-hidden="true"
          />
          <aside
            aria-label={`Employee profile for ${selected.first} ${selected.last}`}
            className="animate-drawer-in fixed right-0 top-0 z-50 flex h-screen w-[min(470px,100%)] flex-col bg-card shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <span className="text-[11px] font-bold tracking-[0.12em] text-muted-foreground">EMPLOYEE PROFILE</span>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close employee profile"
                className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X size={19} />
              </button>
            </div>

            <div className="flex flex-col items-center border-b border-border px-5 py-6 text-center">
              <Avatar initials={selected.initials} size="lg" className="size-16 text-lg" />
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                {selected.first} {selected.last}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{selected.title}</p>
              <span className="mt-2.5"><StatusPill status={selected.status} /></span>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" className="h-9">
                  <Mail size={16} /> Message
                </Button>
                <Button variant="secondary" className="h-9 px-2.5">
                  <MoreHorizontal size={17} />
                </Button>
              </div>
            </div>

            <div role="tablist" className="flex gap-5 overflow-x-auto border-b border-border px-5">
              {TABS.map((x) => (
                <button
                  role="tab"
                  aria-selected={tab === x}
                  key={x}
                  onClick={() => setTab(x)}
                  className={`h-10 whitespace-nowrap border-b-2 text-[13px] transition-colors ${
                    tab === x
                      ? "border-accent font-bold text-accent"
                      : "border-transparent font-medium text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
                {tab === "Profile" ? "PERSONAL INFORMATION" : tab.toUpperCase()}
              </span>
              {tab === "Profile" ? (
                <div className="mt-3 space-y-2.5">
                  {[
                    ["Employee number", selected.id],
                    ["Email address", `${selected.first.toLowerCase()}.${selected.last.toLowerCase()}@northstar.example`],
                    ["Phone number", "+61 4 12 345 678"],
                    ["Department", selected.dept],
                    ["Manager", "Olivia Chen"],
                    ["Emergency contact", "Jordan Mitchell · +61 4 98 765 432"],
                    ["Location", `${selected.loc}, Australia`],
                    ["Start date", selected.hire],
                    ["Salary band", "Band 4 · $90k–$110k"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-border px-3.5 py-2.5">
                      <span className="text-xs text-muted-foreground">{label}</span>
                      <b className="text-right text-[13px] font-semibold">{value}</b>
                    </div>
                  ))}
                  <div className="grid gap-2.5 pt-1">
                    <Insight icon={CalendarDays} title="Annual leave balance" detail="14.5 days available" />
                    <Insight icon={CalendarCheck} title="Recent leave requests" detail="Annual leave · 24–28 May · Pending approval" />
                    <Insight icon={Activity} title="Performance summary" detail="Strong performance · Last reviewed Mar 2025" />
                    <Insight icon={Wallet} title="Payroll summary" detail="Next pay date · 22 May 2025" />
                  </div>
                </div>
              ) : (
                <div className="mt-8 flex flex-col items-center gap-2 py-10 text-center">
                  <FileText size={23} className="text-muted-foreground" />
                  <b className="text-sm font-semibold">{tab} information</b>
                  <span className="text-xs text-muted-foreground">
                    Mock {tab.toLowerCase()} records for {selected.first} {selected.last}.
                  </span>
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
