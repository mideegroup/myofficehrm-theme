import { useState } from "react";
import { toast } from "../components/ui/sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Sheet, SheetCloseButton, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { PageIntro } from "../components/app/PageIntro";
import { ConfirmDialog } from "../components/app/ConfirmDialog";
import { UnsavedChangesDialog } from "../components/app/UnsavedChangesDialog";
import { Pagination } from "../components/app/Pagination";
import { StatusPill } from "../components/app/StatusPill";
import { Stepper } from "../components/app/Stepper";
import { Avatar } from "../components/ui/avatar";
import { DatePicker } from "../components/ui/date-picker";
import { FileUpload } from "../components/ui/file-upload";
import { Field } from "../components/ui/field";
import { Alert } from "../components/ui/alert";
import { Trash2, PanelRight, CheckCircle2, ArrowLeft, ArrowRight, Pencil } from "lucide-react";

const DEMO_RECORD: [string, string][] = [
  ["Record ID", "LR-2041"],
  ["Owner", "Priya Sharma"],
  ["Type", "Annual leave"],
  ["Period", "24 – 28 May 2025"],
  ["Approver", "Olivia Chen"],
  ["Notes", "Family trip — approved pending coverage"],
];

/** Prototype → Overlays. Dialog (ConfirmDialog) and Sheet — the two overlay
 *  primitives, both on Radix Dialog (Esc, focus trap, scroll-lock). The sheet
 *  demo is a full miniature of the record-sheet convention: read-by-default,
 *  edit-in-place, footer actions, unsaved-changes guard on close. */
export function OverlaysPage() {
  const [confirm, setConfirm] = useState(false);
  const [confirmSoft, setConfirmSoft] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const [pendingClose, setPendingClose] = useState(false);
  const dirty = !!(draft && DEMO_RECORD.some(([k, v]) => draft[k] !== v));

  const closeSheet = () => { if (dirty) setPendingClose(true); else setSheet(false); };

  return (
    <div className="flex max-w-[720px] flex-col gap-6">
      <PageIntro
        eyebrow="PROTOTYPE"
        title="Overlays"
        description="Dialog for decisions, Sheet for detail. Both trap focus, close on Esc and overlay-click."
      />

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">CONFIRM DIALOG</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Required before every destructive or security-sensitive action — SettingsCard Reset and the 2FA
          disable switch both use it.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Button variant="destructive" onClick={() => setConfirm(true)}>
            <Trash2 size={15} /> Delete employee
          </Button>
          <Button variant="secondary" onClick={() => setConfirmSoft(true)}>Publish changes</Button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">SHEET — RECORD DETAIL</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          The employee-profile convention in miniature: view rows → Edit → inputs + Cancel/Save footer →
          toast. Leave mid-edit and the unsaved-changes guard fires.
        </p>
        <Button variant="secondary" className="mt-4" onClick={() => setSheet(true)}>
          <PanelRight size={15} /> Open sheet
        </Button>
      </section>

      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="Delete this employee?"
        description="This permanently removes the record and can't be undone. Payroll history is retained."
        confirmLabel="Delete employee"
        onConfirm={() => toast.success("Employee deleted")}
      />
      <ConfirmDialog
        open={confirmSoft}
        onOpenChange={setConfirmSoft}
        title="Publish changes?"
        description="These updates go live for everyone in the workspace."
        confirmLabel="Publish"
        destructive={false}
        onConfirm={() => toast.success("Changes published")}
      />

      <Sheet open={sheet} onOpenChange={(open) => { if (!open) closeSheet(); else setSheet(true); }}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>LEAVE REQUEST</SheetTitle>
            <SheetDescription>Demo record sheet — edit-in-place with unsaved-changes guard</SheetDescription>
            <SheetCloseButton />
          </SheetHeader>

          <div className="flex flex-col items-center border-b border-border px-5 py-6 text-center">
            <Avatar initials="PS" size="lg" className="size-16 text-lg" />
            <h2 className="mt-3 text-lg font-semibold tracking-tight">Annual leave · LR-2041</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">Priya Sharma · Engineering</p>
            <span className="mt-2.5"><StatusPill status="Pending" /></span>
            {!editing && (
              <Button variant="secondary" className="mt-4 h-9" onClick={() => { setDraft(Object.fromEntries(DEMO_RECORD)); setEditing(true); }}>
                <Pencil size={15} /> Edit
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground">REQUEST DETAILS</span>
            <div className="mt-3 space-y-2.5">
              {DEMO_RECORD.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-border px-3.5 py-2.5">
                  <span className="shrink-0 text-xs text-muted-foreground">{label}</span>
                  {editing && draft ? (
                    <Input
                      value={draft[label] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [label]: e.target.value })}
                      className="h-8 w-52 text-right text-[13px]"
                      aria-label={label}
                    />
                  ) : (
                    <b className="text-right text-[13px] font-semibold">{value}</b>
                  )}
                </div>
              ))}
            </div>
          </div>

          {editing && (
            <div className="flex items-center justify-end gap-2.5 border-t border-border px-5 py-3.5">
              <Button variant="ghost" onClick={() => { setEditing(false); setDraft(null); }}>Cancel</Button>
              <Button
                className="bg-accent-70 font-bold hover:bg-accent-90"
                onClick={() => { setEditing(false); setDraft(null); toast.success("Record updated"); }}
              >
                Save changes
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <UnsavedChangesDialog
        open={pendingClose}
        onCancel={() => setPendingClose(false)}
        onDiscard={() => { setPendingClose(false); setEditing(false); setDraft(null); setSheet(false); }}
      />
    </div>
  );
}

/** Prototype → Tabs & pagination. The boxed TabsList is the primitive default;
 *  the underline variant (as in the employee drawer) is a className override. */
export function TabsPage() {
  const [page, setPage] = useState(2);

  return (
    <div className="flex max-w-[720px] flex-col gap-6">
      <PageIntro
        eyebrow="PROTOTYPE"
        title="Tabs & pagination"
        description="Radix Tabs (boxed default + underline override) and the shared list Pagination footer."
      />

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">BOXED (DEFAULT)</h2>
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-sm text-muted-foreground">Overview content — keyboard navigable, aria-wired.</TabsContent>
          <TabsContent value="activity" className="text-sm text-muted-foreground">Activity content.</TabsContent>
          <TabsContent value="settings" className="text-sm text-muted-foreground">Settings content.</TabsContent>
        </Tabs>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">UNDERLINE (DRAWER STYLE)</h2>
        <Tabs defaultValue="profile" className="mt-4">
          <TabsList className="flex gap-5 overflow-x-auto rounded-none border-b border-border bg-transparent p-0">
            {["Profile", "Employment", "Leave", "Payroll"].map((x) => (
              <TabsTrigger
                key={x}
                value={x.toLowerCase()}
                className="h-10 whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-0 text-[13px] font-medium text-muted-foreground shadow-none hover:text-foreground data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-accent data-[state=active]:shadow-none"
              >
                {x}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <p className="mt-3 text-xs text-muted-foreground">Same primitive, className override — used in the employee profile sheet.</p>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">PAGINATION</h2>
        <p className="mt-1 text-xs text-muted-foreground">Live state — the employees table footer uses this component.</p>
        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          <Pagination page={page} total={96} pageSize={10} onPage={setPage} itemLabel="requests" />
        </div>
      </section>
    </div>
  );
}

/** Prototype → Date picker. Popover + hand-rolled month grid — no date
 *  dependency; selected day paints with accent, today marks bold. */
export function DatePickerPage() {
  const [start, setStart] = useState<Date | undefined>(new Date());
  const [end, setEnd] = useState<Date | undefined>();

  return (
    <div className="flex max-w-[720px] flex-col gap-6">
      <PageIntro
        eyebrow="PROTOTYPE · PHASE-2"
        title="Date picker"
        description="Popover + month grid on tokens. Field wraps label, hint and error — the stacked-form convention."
      />

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">IN A FIELD</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Start date" htmlFor="start" description="Leave begins on this day.">
            <DatePicker value={start} onChange={setStart} />
          </Field>
          <Field label="End date" htmlFor="end" error={end && start && end < start ? "End date must be after the start date." : undefined}>
            <DatePicker value={end} onChange={setEnd} placeholder="Select end date" />
          </Field>
          <Field label="Review date" htmlFor="review" description="Disabled — set by the review cycle.">
            <DatePicker value={new Date(2025, 5, 30)} onChange={() => {}} disabled />
          </Field>
        </div>
      </section>
    </div>
  );
}

/** Prototype → File upload. Dropzone (browse or drag) + typed file list with
 *  remove; size/type rejections surface through toasts. */
export function FileUploadPage() {
  const [docs, setDocs] = useState<File[]>([]);
  const [avatar, setAvatar] = useState<File[]>([]);

  return (
    <div className="flex max-w-[720px] flex-col gap-6">
      <PageIntro
        eyebrow="PROTOTYPE · PHASE-2"
        title="File upload"
        description="Dropzone + file list on tokens — contracts, certificates, receipts. Drag-over, browse, size/type limits, remove."
      />

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">DOCUMENTS — MULTIPLE</h2>
        <div className="mt-4">
          <Field label="Employee documents" htmlFor="docs" description="Contracts, visas, certifications.">
            <FileUpload files={docs} onFilesChange={setDocs} accept=".pdf,.doc,.docx,.png,.jpg" maxSizeMB={5} />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">PROFILE PHOTO — SINGLE</h2>
        <div className="mt-4">
          <Field label="Avatar" htmlFor="avatar" description="One image, up to 2 MB.">
            <FileUpload files={avatar} onFilesChange={setAvatar} accept=".png,.jpg,.jpeg" maxSizeMB={2} multiple={false} hint="PNG or JPG · Up to 2 MB · single file" />
          </Field>
        </div>
      </section>
    </div>
  );
}

const STEPS = ["Personal", "Employment", "Review"];

/** Prototype → Multi-step form. Stepper + per-step validation + review screen —
 *  the pattern for onboarding/invite flows. */
export function MultiStepPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", email: "", dept: "Engineering", type: "Full-time" });
  const [start, setStart] = useState<Date | undefined>();
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const next = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.first.trim()) e.first = "First name is required.";
      if (!form.last.trim()) e.last = "Last name is required.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid work email.";
    }
    if (step === 1 && !start) e.start = "Pick a start date.";
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(step + 1);
  };

  const submit = () => {
    setDone(true);
    toast.success("Employee invited", { description: `${form.first} ${form.last} joins ${form.dept} on ${start ? start.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "—"}.` });
  };

  if (done) {
    return (
      <div className="flex max-w-[720px] flex-col gap-6">
        <PageIntro eyebrow="PROTOTYPE · PHASE-2" title="Multi-step form" description="Onboarding complete." />
        <section className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-14 text-center shadow-sm">
          <CheckCircle2 size={36} className="text-status-success-foreground" />
          <b className="text-lg font-semibold">{form.first} {form.last} invited</b>
          <p className="max-w-sm text-sm text-muted-foreground">They'll get an email to set their password and enroll in two-factor authentication.</p>
          <Button variant="secondary" className="mt-2" onClick={() => { setDone(false); setStep(0); setAgree(false); setStart(undefined); setForm({ first: "", last: "", email: "", dept: "Engineering", type: "Full-time" }); }}>
            Start another
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div className="flex max-w-[720px] flex-col gap-6">
      <PageIntro
        eyebrow="PROTOTYPE · PHASE-2"
        title="Multi-step form"
        description="Stepper + per-step validation + review screen — the onboarding/invite pattern."
      />

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <Stepper steps={STEPS} current={step} />

        {Object.values(errors).some(Boolean) && (
          <Alert
            tone="danger"
            className="mt-5"
            title="Fix these to continue"
            items={Object.values(errors).filter(Boolean)}
          />
        )}

        <div className="mt-7">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" htmlFor="ms-first" required error={errors.first}>
                <Input id="ms-first" value={form.first} onChange={(e) => set("first", e.target.value)} placeholder="Priya" />
              </Field>
              <Field label="Last name" htmlFor="ms-last" required error={errors.last}>
                <Input id="ms-last" value={form.last} onChange={(e) => set("last", e.target.value)} placeholder="Sharma" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Work email" htmlFor="ms-email" required error={errors.email} description="The invite goes here.">
                  <Input id="ms-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="priya.sharma@northstar.example" />
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Department" htmlFor="ms-dept">
                <select
                  id="ms-dept"
                  value={form.dept}
                  onChange={(e) => set("dept", e.target.value)}
                  className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {["Engineering", "Finance", "People & Culture", "Sales"].map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Employment type" htmlFor="ms-type">
                <select
                  id="ms-type"
                  value={form.type}
                  onChange={(e) => set("type", e.target.value)}
                  className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {["Full-time", "Part-time", "Contract", "Casual"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Start date" htmlFor="ms-start" required error={errors.start}>
                  <DatePicker value={start} onChange={setStart} placeholder="Pick a start date" />
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <div className="grid gap-2 rounded-lg border border-border p-4">
                {[
                  ["Name", `${form.first} ${form.last}`],
                  ["Email", form.email],
                  ["Department", form.dept],
                  ["Employment type", form.type],
                  ["Start date", start ? start.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 text-[13px]">
                    <span className="text-muted-foreground">{k}</span>
                    <b className="text-right font-semibold">{v}</b>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-2.5 text-[13px]">
                <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" />
                <span className="leading-relaxed text-muted-foreground">
                  Send the invite email now. The employee sets their own password and enrolls in two-factor
                  authentication on first sign in.
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
            <ArrowLeft size={15} /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button className="bg-accent-70 font-bold hover:bg-accent-90" onClick={next}>
              Next <ArrowRight size={15} />
            </Button>
          ) : (
            <Button className="bg-accent-70 font-bold hover:bg-accent-90" disabled={!agree} onClick={submit}>
              Send invite
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

/** Prototype → Banners. Persistent inline feedback on status tokens — error
 *  summaries (multi-item), info, warning, success. Toasts are transient;
 *  banners stay until resolved. */
export function BannersPage() {
  return (
    <div className="flex max-w-[720px] flex-col gap-6">
      <PageIntro
        eyebrow="PROTOTYPE"
        title="Banners"
        description="Alert — in-context feedback that stays until resolved. `items` renders field-error summaries."
      />

      <section className="grid gap-3 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-[11px] font-bold tracking-[0.1em] text-accent">TONES</h2>
        <Alert
          tone="danger"
          title="We couldn't save this employee"
          items={[
            "First name is required.",
            "Enter a valid work email.",
            "Start date must be in the future.",
          ]}
        />
        <Alert tone="warning" title="Payroll runs in 2 days" >
          3 leave requests are still pending approval — unapproved leave won't appear in this run.
        </Alert>
        <Alert tone="info" title="You're viewing the demo environment">
          Data is illustrative and saved nowhere — this is also how the app-shell demo banner works.
        </Alert>
        <Alert tone="success" title="Import complete">
          24 of 25 employees imported. 1 row skipped (missing email).
        </Alert>
      </section>
    </div>
  );
}

/** Prototype → Toasts. Sonner is the transient-feedback convention — settings
 *  saves, resets and destructive confirms all report through it. */
export function ToastsPage() {
  return (
    <div className="flex max-w-[720px] flex-col gap-6">
      <PageIntro
        eyebrow="PROTOTYPE"
        title="Toasts"
        description="Transient feedback uses sonner — never inline 'saved' text. Theme-aware via the mounted Toaster."
      />
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap gap-2.5">
          <Button variant="secondary" onClick={() => toast.success("Changes saved", { description: "Localization preferences updated." })}>
            Success
          </Button>
          <Button variant="secondary" onClick={() => toast.error("Couldn't save", { description: "Check your connection and try again." })}>
            Error
          </Button>
          <Button variant="secondary" onClick={() => toast.info("Pay run scheduled", { description: "Thursday 22 May, 9:00 am." })}>
            Info
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast("Employee archived", { action: { label: "Undo", onClick: () => toast.success("Restored") } })}
          >
            With action
          </Button>
        </div>
      </section>
    </div>
  );
}
