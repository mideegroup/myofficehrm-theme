import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, CalendarCheck, CalendarDays, ChevronDown,
  Download, FileText, Filter, Mail, MoreHorizontal, Pencil, Plus, Search, SlidersHorizontal, Wallet, X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar } from "../components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Sheet, SheetCloseButton, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { PageIntro } from "../components/app/PageIntro";
import { StatusPill } from "../components/app/StatusPill";
import { EmptyState } from "../components/app/EmptyState";
import { Pagination } from "../components/app/Pagination";
import { TableSkeleton } from "../components/app/TableSkeleton";
import { UnsavedChangesDialog } from "../components/app/UnsavedChangesDialog";
import { SortableHead } from "../components/app/SortableHead";
import { toast } from "../components/ui/sonner";
import { employees, type Employee } from "../lib/employees";

const PAGE_SIZE = 8;
const TABS = ["Profile", "Employment", "Leave", "Payroll", "Documents", "Notes"];

const SELECT_CX =
  "h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground shadow-sm " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const profileRows = (p: Employee): [string, string][] => [
  ["Employee number", p.id],
  ["Email address", `${p.first.toLowerCase()}.${p.last.toLowerCase()}@northstar.example`],
  ["Phone number", "+61 4 12 345 678"],
  ["Department", p.dept],
  ["Manager", "Olivia Chen"],
  ["Emergency contact", "Jordan Mitchell · +61 4 98 765 432"],
  ["Location", `${p.loc}, Australia`],
  ["Start date", p.hire],
  ["Salary band", "Band 4 · $90k–$110k"],
];

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
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "last", dir: "asc" });
  const onSort = (key: string) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));
  const [tab, setTab] = useState("Profile");
  // Simulated fetch latency — the loading pattern every list screen follows:
  // skeleton rows while data loads, EmptyState when a filter yields nothing.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(t);
  }, []);

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
        .sort((a, b) => {
          const key = sort.key as keyof Employee;
          const av = key === "hire" ? Date.parse(a.hire) : String(a[key] ?? "");
          const bv = key === "hire" ? Date.parse(b.hire) : String(b[key] ?? "");
          const cmp = typeof av === "number" ? av - (bv as number) : av.localeCompare(String(bv));
          return sort.dir === "asc" ? cmp : -cmp;
        }),
    [query, department, location, status, type, sort],
  );

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
  // Read-by-default, edit-in-place: the record-sheet convention — Edit turns the
  // detail rows into inputs; Save commits (toast) and returns to view mode.
  // Leaving mid-edit (another record, closing the sheet) goes through the guard.
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const [pendingLeave, setPendingLeave] = useState<(() => void) | null>(null);
  const dirty = !!(editing && draft && selected && profileRows(selected).some(([k, v]) => draft[k] !== v));
  const cancelEdit = () => { setEditing(false); setDraft(null); };
  const guard = (leave: () => void) => { if (dirty) setPendingLeave(() => leave); else leave(); };
  const startEdit = (rows: [string, string][]) => {
    setDraft(Object.fromEntries(rows));
    setEditing(true);
  };
  const saveEdit = () => {
    cancelEdit();
    toast.success("Profile updated", { description: `${selected?.first} ${selected?.last}'s details were saved.` });
  };
  const openProfile = (p: Employee) =>
    guard(() => { setSelected(p); setTab("Profile"); cancelEdit(); });

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
        <Button variant="secondary" className="h-10" onClick={() => onSort("last")}>
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
              <SortableHead label="EMPLOYEE #" sortKey="id" sort={sort} onSort={onSort} />
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">PHOTO</TableHead>
              <SortableHead label="NAME" sortKey="last" sort={sort} onSort={onSort} />
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">EMAIL</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">DEPARTMENT</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">POSITION</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">LOCATION</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">EMPLOYMENT TYPE</TableHead>
              <TableHead className="text-[10px] font-bold tracking-[0.08em]">STATUS</TableHead>
              <SortableHead label="HIRE DATE" sortKey="hire" sort={sort} onSort={onSort} />
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableSkeleton
                rows={PAGE_SIZE}
                cells={[
                  "h-4 w-12", "size-7 rounded-full", "h-4 w-24", "h-3.5 w-40", "h-3.5 w-20",
                  "h-3.5 w-24", "h-3.5 w-14", "h-3.5 w-14", "h-5 w-16 rounded-full",
                  "h-3.5 w-16", "size-6 rounded-md",
                ]}
              />
            )}
            {!loading && shown.map((p, i) => (
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
            {!loading && shown.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={11}>
                  <EmptyState
                    icon={Search}
                    title="No employees found"
                    description="Try adjusting your search or filters."
                    action={
                      <Button variant="secondary" onClick={reset}>Clear filters</Button>
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination
          page={page}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          onPage={setPage}
          itemLabel="employees"
          loading={loading}
        />
      </section>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) guard(() => { setSelected(null); cancelEdit(); }); }}>
        <SheetContent aria-describedby={undefined} className="w-[min(540px,100%)]">
          {selected && (
            <>
            <SheetHeader>
              <SheetTitle>EMPLOYEE PROFILE</SheetTitle>
              <SheetDescription>Employee profile for {selected.first} {selected.last}</SheetDescription>
              <SheetCloseButton />
            </SheetHeader>

            <div className="flex flex-col items-center border-b border-border px-5 py-6 text-center">
              <Avatar initials={selected.initials} size="lg" className="size-16 text-lg" />
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                {selected.first} {selected.last}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{selected.title}</p>
              <span className="mt-2.5"><StatusPill status={selected.status} /></span>
              {!editing && (
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" className="h-9" onClick={() => startEdit(profileRows(selected))}>
                    <Pencil size={15} /> Edit
                  </Button>
                  <Button variant="secondary" className="h-9">
                    <Mail size={16} /> Message
                  </Button>
                  <Button variant="secondary" className="h-9 px-2.5">
                    <MoreHorizontal size={17} />
                  </Button>
                </div>
              )}
            </div>

            <Tabs value={tab} onValueChange={(v) => { setTab(v); cancelEdit(); }}>
              <TabsList className="flex gap-5 overflow-x-auto rounded-none border-b border-border bg-transparent p-0 px-5">
                {TABS.map((x) => (
                  <TabsTrigger
                    key={x}
                    value={x}
                    className="h-10 whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-0 text-[13px] font-medium text-muted-foreground shadow-none hover:text-foreground data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-accent data-[state=active]:shadow-none"
                  >
                    {x}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex-1 overflow-y-auto p-5">
              <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
                {tab === "Profile" ? "PERSONAL INFORMATION" : tab.toUpperCase()}
              </span>
              {tab === "Profile" ? (
                <div className="mt-3 space-y-2.5">
                  {profileRows(selected).map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-border px-3.5 py-2.5">
                      <span className="shrink-0 text-xs text-muted-foreground">{label}</span>
                      {editing && draft ? (
                        <Input
                          value={draft[label] ?? ""}
                          onChange={(e) => setDraft({ ...draft, [label]: e.target.value })}
                          className="h-8 w-56 text-right text-[13px]"
                          aria-label={label}
                        />
                      ) : (
                        <b className="text-right text-[13px] font-semibold">{value}</b>
                      )}
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

            {editing && (
              <div className="flex items-center justify-end gap-2.5 border-t border-border px-5 py-3.5">
                <Button variant="ghost" onClick={cancelEdit}>Cancel</Button>
                <Button className="bg-accent-70 font-bold hover:bg-accent-90" onClick={saveEdit}>
                  Save changes
                </Button>
              </div>
            )}
            </>
          )}
        </SheetContent>
      </Sheet>

      <UnsavedChangesDialog
        open={!!pendingLeave}
        onCancel={() => setPendingLeave(null)}
        onDiscard={() => {
          const leave = pendingLeave;
          setPendingLeave(null);
          cancelEdit();
          leave?.();
        }}
      />
    </>
  );
}
