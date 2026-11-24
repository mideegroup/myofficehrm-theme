import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Activity, ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, CalendarCheck, CalendarDays,
  Check, CheckCircle2, ChevronDown, ChevronLeft, Clock3, Eye, EyeOff, LayoutDashboard,
  MoreHorizontal, ShieldCheck, Sparkles, UserRound, Users, Wallet,
} from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";
import { LogoWordmark } from "../components/Logo";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../components/ui/dialog";
import { BRAND_PANEL_BG, BRAND_PANEL_DOTS } from "../lib/brand";

const MODULES = [
  { name: "Human Resources", icon: Users },
  { name: "Payroll", icon: Wallet },
  { name: "Leave Management", icon: CalendarDays },
  { name: "Attendance", icon: Clock3 },
  { name: "Recruitment", icon: BriefcaseBusiness },
  { name: "Performance Management", icon: Activity },
  { name: "Employee Self Service", icon: UserRound },
  { name: "Workflow Automation", icon: Sparkles },
];

const SELECT_CX =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Users, label: "Employees" },
  { icon: CalendarDays, label: "Time & leave" },
  { icon: Wallet, label: "Payroll" },
  { icon: Activity, label: "Reports" },
];

const KPIS = [
  { label: "Total employees", value: "1,248", note: "↑ 8.2%" },
  { label: "On leave today", value: "17", note: "View requests" },
  { label: "Attendance", value: "98.4%", note: "↑ 1.4%" },
];

const CHART_BARS = [35, 48, 40, 62, 55, 71, 58, 85, 75, 92, 82, 100];

function Kicker({ children }: { children: string }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] text-accent">
      <i className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

function MockProductVisual() {
  return (
    <div className="relative" aria-label="Preview of the myOfficeHRM employee dashboard">
      <div className="overflow-hidden rounded-xl border border-white/25 bg-card text-card-foreground shadow-lg">
        <div className="flex h-9 items-center justify-between border-b border-border px-3.5">
          <span className="flex gap-1.5">
            <i className="size-2 rounded-full bg-border" />
            <i className="size-2 rounded-full bg-border" />
            <i className="size-2 rounded-full bg-border" />
          </span>
          <b className="text-xs font-semibold">
            myOfficeHRM <small className="font-normal text-muted-foreground">/ People overview</small>
          </b>
          <MoreHorizontal size={15} className="text-muted-foreground" />
        </div>
        <div className="grid grid-cols-[110px_1fr]">
          <aside className="border-r border-border p-2.5">
            <div className="mb-2 flex items-center gap-1.5 border-b border-border pb-2">
              <span className="grid size-6 place-items-center rounded-md bg-accent-10 text-[10px] font-bold text-accent">
                N
              </span>
              <div className="min-w-0 text-[9px] font-semibold leading-tight">
                Northstar Group
                <small className="block font-normal text-muted-foreground">Workspace</small>
              </div>
              <ChevronDown size={11} className="ml-auto shrink-0 text-muted-foreground" />
            </div>
            {NAV_ITEMS.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[9px] ${
                  i === 0 ? "bg-accent-10 font-bold text-accent" : "text-muted-foreground"
                }`}
              >
                <Icon size={11} />
                {label}
              </div>
            ))}
          </aside>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <small className="text-[8px] font-bold tracking-[0.1em] text-muted-foreground">
                  MONDAY, 20 MAY 2025
                </small>
                <strong className="block text-sm font-semibold">Good morning, Olivia</strong>
              </div>
              <span className="rounded-md bg-accent-70 px-2 py-1 text-[9px] font-semibold text-white">
                + Invite
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {KPIS.map((k) => (
                <div key={k.label} className="rounded-md border border-border p-2">
                  <small className="text-[8px] text-muted-foreground">{k.label}</small>
                  <b className="block text-sm font-semibold">{k.value}</b>
                  <i className="text-[8px] not-italic text-accent">{k.note}</i>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-md border border-border p-2.5">
              <div className="flex items-center justify-between">
                <b className="text-[10px] font-semibold">Workforce overview</b>
                <small className="flex items-center gap-0.5 text-[8px] text-muted-foreground">
                  Employee growth <ChevronDown size={10} />
                </small>
              </div>
              <div className="mt-2 flex h-16 items-end gap-1 border-b border-border px-1 [background:repeating-linear-gradient(to_bottom,transparent_0,transparent_15px,var(--border)_15px,var(--border)_16px)]">
                {CHART_BARS.map((v, i) => (
                  <i key={i} style={{ height: `${v}%` }} className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-70 to-accent-30" />
                ))}
              </div>
            </div>
            <div className="mt-2 rounded-md border border-border p-2.5">
              <span className="flex items-center justify-between">
                <b className="text-[10px] font-semibold">Leave requests</b>
                <small className="flex items-center gap-0.5 text-[8px] text-accent">
                  See all <ArrowUpRight size={10} />
                </small>
              </span>
              <div className="mt-1.5 flex items-center gap-2">
                <i className="grid size-6 place-items-center rounded-full bg-accent-10 text-[8px] font-bold not-italic text-accent">
                  AM
                </i>
                <span className="flex-1 text-[9px]">
                  <b className="block font-semibold">Ava Mitchell</b>
                  <small className="text-muted-foreground">Annual leave · 24–28 May</small>
                </span>
                <em className="rounded-md bg-accent-10 px-2 py-1 text-[8px] font-semibold not-italic text-accent">
                  Review
                </em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -right-2 bottom-8 flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-lg">
        <div className="grid size-8 place-items-center rounded-lg bg-accent-10 text-accent">
          <CalendarCheck size={17} />
        </div>
        <div>
          <small className="block text-[8px] font-bold tracking-[0.08em] text-muted-foreground">
            PAYROLL RUN
          </small>
          <b className="text-xs font-semibold">Ready to review</b>
        </div>
        <CheckCircle2 size={18} className="text-accent" />
      </div>
    </div>
  );
}

export default function Demo() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const change = (key: string, value: string) => setValues((c) => ({ ...c, [key]: value }));
  const toggle = (item: string) =>
    setSelected((c) => (c.includes(item) ? c.filter((x) => x !== item) : [...c, item]));

  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(480px,45%)_1fr]">
      {/* ---- form panel ---- */}
      <section className="flex min-h-screen flex-col bg-background px-6 py-7 sm:px-10">
        <LogoWordmark />
        <Link
          to="/"
          className="mt-6 inline-flex w-max items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft size={16} /> Back to home
        </Link>

        <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-center py-8">
          <div className="flex items-baseline justify-between text-[11px] font-bold tracking-[0.1em] text-muted-foreground">
            <span>DEMO REQUEST</span>
            <b className="text-accent">STEP {step} OF 3</b>
          </div>
          <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-muted">
            <i
              className="block h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${step * 33.33}%` }}
            />
          </div>

          {step === 1 && (
            <div className="mt-9">
              <Kicker>YOUR NEXT STEP</Kicker>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">Get a Demo</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us what solutions you're interested in.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-2.5" aria-label="Choose product modules">
                {MODULES.map(({ name, icon: Icon }) => {
                  const active = selected.includes(name);
                  return (
                    <button
                      type="button"
                      key={name}
                      aria-pressed={active}
                      onClick={() => toggle(name)}
                      className={`relative flex h-20 items-center gap-3 rounded-lg border px-4 text-left text-[13px] font-semibold transition-all ${
                        active
                          ? "border-accent bg-accent-10 text-foreground shadow-sm"
                          : "border-border bg-background text-muted-foreground hover:border-accent-30 hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-lg ${
                          active ? "bg-accent-10 text-accent" : "bg-muted text-accent"
                        }`}
                      >
                        <Icon size={19} />
                      </span>
                      {name}
                      {active && <Check size={15} className="absolute right-2.5 top-2.5 text-accent" />}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Select all the areas you'd like to explore.
              </p>
              <Button
                className="mt-6 h-11 w-full bg-accent-70 font-bold hover:bg-accent-90"
                onClick={() => setStep(2)}
              >
                Next <ArrowRight size={16} />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-9">
              <Kicker>TELL US A LITTLE MORE</Kicker>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                Tell us about your organization
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Help us tailor a walkthrough to your team.
              </p>
              <form
                className="mt-7 space-y-4"
                onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                  setStep(3);
                }}
              >
                <label className="block text-sm font-medium">
                  Number of employees
                  <select
                    required
                    value={values.employees || ""}
                    onChange={(e) => change("employees", e.target.value)}
                    className={`mt-2 ${SELECT_CX}`}
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    {["1-10", "11-50", "51-100", "101-250", "251-500", "500+"].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Payroll country
                  <select
                    required
                    value={values.country || ""}
                    onChange={(e) => change("country", e.target.value)}
                    className={`mt-2 ${SELECT_CX}`}
                  >
                    <option value="" disabled>
                      Select a country
                    </option>
                    {["Australia", "New Zealand", "Singapore", "United Kingdom", "United States"].map(
                      (x) => (
                        <option key={x}>{x}</option>
                      ),
                    )}
                  </select>
                </label>
                <fieldset>
                  <legend className="text-sm font-medium">Do you use roster scheduling?</legend>
                  <div className="mt-2 flex gap-2.5">
                    {["Yes", "No"].map((x) => (
                      <label
                        key={x}
                        className={`flex h-10 min-w-22 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors ${
                          values.roster === x
                            ? "border-accent bg-accent-10 text-foreground"
                            : "border-border text-muted-foreground hover:border-accent-30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="roster"
                          value={x}
                          required
                          checked={values.roster === x}
                          onChange={(e) => change("roster", e.target.value)}
                          className="size-3.5 accent-[var(--accent-70)]"
                        />
                        {x}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="flex justify-between gap-2.5 pt-1">
                  <Button type="button" variant="secondary" className="h-11" onClick={() => setStep(1)}>
                    <ArrowLeft size={15} /> Back
                  </Button>
                  <Button className="h-11 min-w-40 bg-accent-70 font-bold hover:bg-accent-90">
                    Next <ArrowRight size={16} />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="mt-9">
              <Kicker>ALMOST THERE</Kicker>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">Create Demo Access</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your details and we'll prepare your personalized demo.
              </p>
              <form className="mt-7 space-y-4" onSubmit={(e: FormEvent) => { e.preventDefault(); setSuccess(true); }}>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-sm font-medium">
                    First name
                    <Input autoComplete="given-name" required placeholder="e.g. Olivia" className="mt-2 h-11" />
                  </label>
                  <label className="block text-sm font-medium">
                    Last name
                    <Input autoComplete="family-name" required placeholder="e.g. Chen" className="mt-2 h-11" />
                  </label>
                </div>
                <label className="block text-sm font-medium">
                  Email address
                  <Input required type="email" autoComplete="email" placeholder="you@company.com" className="mt-2 h-11" />
                </label>
                <label className="block text-sm font-medium">
                  Phone number
                  <Input required type="tel" autoComplete="tel" placeholder="+61 400 000 000" className="mt-2 h-11" />
                </label>
                <label className="block text-sm font-medium">
                  Password
                  <span className="relative mt-2 block">
                    <Input
                      required
                      type={showPassword ? "text" : "password"}
                      minLength={8}
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      className="h-11 pr-11"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-sm font-medium">
                    Company name
                    <Input required autoComplete="organization" placeholder="Company name" className="mt-2 h-11" />
                  </label>
                  <label className="block text-sm font-medium">
                    Job title
                    <Input required autoComplete="organization-title" placeholder="Your role" className="mt-2 h-11" />
                  </label>
                </div>
                <div className="flex justify-between gap-2.5 pt-1">
                  <Button type="button" variant="secondary" className="h-11" onClick={() => setStep(2)}>
                    <ArrowLeft size={15} /> Back
                  </Button>
                  <Button className="h-11 min-w-40 bg-accent-70 font-bold hover:bg-accent-90">
                    Start Demo <ArrowRight size={16} />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {!success && (
            <p className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck size={14} className="text-accent" /> Your information is kept private and
              secure.
            </p>
          )}
        </div>
      </section>

      {/* ---- showcase panel ---- */}
      <aside className={`relative hidden flex-col justify-between gap-8 overflow-hidden px-10 py-8 text-primary-foreground lg:flex xl:px-14 ${BRAND_PANEL_BG}`}>
        <div aria-hidden="true" className={`absolute inset-0 ${BRAND_PANEL_DOTS}`} />
        <div className="relative flex items-center justify-between">
          <LogoWordmark inverse />
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-primary-foreground/70">
            <i className="size-1.5 rounded-full bg-accent-30" /> PRODUCT PREVIEW
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <span className="text-[10px] font-bold tracking-[0.14em] text-accent-30">
            ONE CONNECTED PEOPLE PLATFORM
          </span>
          <h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight xl:text-5xl">
            Make room for
            <br />
            your people.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/75">
            Bring HR, payroll and everyday work together in one thoughtful workspace.
          </p>

          <div className="mt-8">
            <MockProductVisual />
          </div>

          <div className="mt-7 flex flex-wrap justify-between gap-3 text-[11px] text-primary-foreground/80">
            {["Employee records", "Leave & attendance", "Payroll insights"].map((x) => (
              <span key={x} className="flex items-center gap-1.5">
                <Check size={14} className="text-accent-30" /> {x}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex justify-between border-t border-primary-foreground/20 pt-4 text-[9px] font-bold tracking-[0.14em] text-primary-foreground/60">
          <span>YOUR PEOPLE. YOUR PLATFORM.</span>
          <span>0{step} / 03</span>
        </div>
      </aside>

      {/* ---- success modal ---- */}
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="max-w-md text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent-10 text-accent">
            <CheckCircle2 size={28} />
          </span>
          <span className="mt-2 text-[11px] font-bold tracking-[0.12em] text-muted-foreground">
            REQUEST RECEIVED
          </span>
          <DialogTitle className="mt-2 text-2xl font-semibold tracking-tight">
            Demo Access Requested
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Thank you for your interest in myOfficeHRM.
            <br />
            <br />A demo access email has been sent.
            <br />
            Our team will contact you shortly.
          </DialogDescription>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="secondary" onClick={() => setSuccess(false)}>
              Close
            </Button>
            <Button to="/" className="bg-accent-70 font-bold hover:bg-accent-90">
              Return to Home <ArrowRight size={15} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
