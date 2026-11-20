import type { ReactNode } from "react";
import {
  ArrowRight, BookOpen, Building2, CalendarDays, Check, Clock, Cloud, Code2, Database, Download, Eye,
  HeartHandshake, ListPlus, Package, PlayCircle, Scale, Server, Settings2, Smartphone, Users,
  Wallet, Workflow,
} from "lucide-react";
import { Eyebrow, h2Class, IconTile, Section, SectionHead } from "../components/Layout";
import { Button } from "../components/Button";
import { DashboardMock } from "../components/DashboardMock";
import {
  ApprovalFlowCard, EmployeeMiniCard, FieldBuilderCard, LeaveRequestCard, PayrollRunCard, SelfServicePhone, TodayStrip,
} from "../components/ProductScenes";
import { ConnectorLines, EmployeeFigure, HrLeadFigure, PayrollAdminFigure } from "../components/People";
import { DOCS_URL } from "../components/Nav";

const proof = [
  { v: "Runs anywhere", d: "Your own servers, our hosted cloud, or an isolated dedicated instance." },
  { v: "Private by design", d: "One database per organisation — payroll can't leak across tenants." },
  { v: "Free core", d: "The full core under AGPL-3.0 — features are never locked behind a paid tier." },
];

const modules = [
  { i: Users, t: "Employees", d: "Profiles, documents and org structure." },
  { i: CalendarDays, t: "Leave", d: "Policies, balances, requests and approvals." },
  { i: Clock, t: "Attendance", d: "Check-ins, shifts and timesheets." },
  { i: Wallet, t: "Payroll", d: "Pay structures, runs and payslips." },
  { i: Workflow, t: "Workflows", d: "Multi-step approvals you design yourself." },
  { i: ListPlus, t: "Custom fields", d: "Add data to any record, per tenant." },
];

const deployments = [
  {
    i: Server,
    t: "Self-hosted",
    d: "Run the full stack with docker-compose on your own infrastructure. You own the servers, the network and the upgrade schedule.",
    fit: "Teams with in-house operations",
  },
  {
    i: Cloud,
    t: "Hosted SaaS",
    d: "We run and update the platform. You configure it and invite your team.",
    fit: "Teams that want zero infrastructure work",
  },
  {
    i: Building2,
    t: "Dedicated instance",
    d: "An isolated deployment with its own database, for residency and compliance requirements.",
    fit: "Regulated or residency-bound organisations",
  },
];

const comparison = [
  { f: "Who operates it", a: "You", b: "MiDee", c: "MiDee, isolated for you" },
  { f: "Data isolation", a: "Your database", b: "Database per tenant", c: "Dedicated database and deployment" },
  { f: "Data residency", a: "Wherever you deploy", b: "Hosted by MiDee", c: "Region of your choice" },
  { f: "Upgrades", a: "You pull new releases", b: "Rolled out by MiDee", c: "Scheduled with your team" },
  { f: "Core features", a: "Full AGPL-3.0 core", b: "Full core", c: "Full core" },
];

const steps = [
  { i: Download, t: "Install", d: "Clone the repo and run one docker-compose up. Or use our hosted SaaS.", code: "docker compose up -d" },
  { i: Settings2, t: "Configure", d: "Shape fields, forms, menus, leave policies and approval flows in the admin UI.", code: "" },
  { i: Users, t: "Run your HR", d: "Invite your team, let them self-serve on web or mobile, and run payroll.", code: "" },
];

type Tone = "default" | "surface" | "inverse";

function Hero() {
  return (
    <section id="product" className="relative scroll-mt-14 overflow-hidden border-b border-border">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-text-muted shadow-card">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            HRM + Payroll in one platform
          </p>
          <h1 className="mt-7 text-balance text-5xl font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl lg:text-[5rem]">
            Configurable <span className="text-accent">HR</span> and <span className="text-[0.92em] font-medium text-accent-2">payroll</span>, on infrastructure you control
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
            Leave, attendance, payroll and employee records in one place — configured to match how your
            organisation actually works. Self-host it or let us run it; your people data stays in a database that
            belongs to you alone.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button to="/demo" size="lg">
              Try the demo <ArrowRight className="size-4" />
            </Button>
            <Button to="/#platform" variant="secondary" size="lg">
              See the platform
            </Button>
          </div>
          <p className="mt-4 text-xs text-text-muted">No install needed — explore a fictional company in the live demo.</p>
          <div aria-label="Modules" className="mt-8 flex flex-wrap justify-center gap-2">
            {modules.map(({ i: Icon, t }) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-medium text-text"
              >
                <Icon className="size-3.5 text-accent" strokeWidth={1.75} aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-14 md:mt-20">
          <ConnectorLines className="pointer-events-none absolute inset-0 hidden lg:block" />
          <HrLeadFigure className="absolute -left-10 top-[24%] hidden w-[150px] lg:block" />
          <PayrollAdminFigure className="absolute -right-8 top-[42%] hidden w-[140px] lg:block" />
          <EmployeeFigure className="absolute bottom-[-3rem] right-[15%] hidden w-[105px] xl:block" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <TodayStrip />
          </div>
          <div className="relative mx-auto -mt-5 max-w-5xl rounded-2xl border border-border bg-surface/80 p-2 shadow-float">
            <DashboardMock />
            <p className="sr-only">
              Product preview: the myOfficeHRM admin dashboard with a sidebar, headcount statistics, an employee table
              and a leave approvals panel.
            </p>
          </div>
          <div className="absolute -left-2 top-[40%] hidden w-[300px] md:block">
            <LeaveRequestCard compact />
          </div>
          <div className="absolute -right-2 top-[52%] hidden w-[320px] lg:block">
            <PayrollRunCard />
          </div>
          <div className="absolute -bottom-12 left-[4%] hidden w-[280px] lg:block">
            <EmployeeMiniCard />
          </div>
          <div className="mt-6 md:hidden">
            <LeaveRequestCard compact />
          </div>
        </div>

        <dl className="mt-20 grid gap-8 border-t border-border pt-8 sm:grid-cols-3 md:mt-28">
          {proof.map((p) => (
            <div key={p.v}>
              <dt className="text-lg font-semibold tracking-tight">{p.v}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-text-muted">{p.d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const chapterTone: Record<Tone, { muted: string; eyebrow: string; check: string; plate: string; rule: string }> = {
  default: { muted: "text-text-muted", eyebrow: "text-accent", check: "text-accent", plate: "bg-surface", rule: "bg-border" },
  surface: { muted: "text-text-muted", eyebrow: "text-accent", check: "text-accent", plate: "bg-surface-elevated", rule: "bg-border" },
  inverse: {
    muted: "text-primary-foreground/70",
    eyebrow: "text-primary-foreground/60",
    check: "text-primary-foreground",
    plate: "bg-primary-foreground/[0.06]",
    rule: "bg-primary-foreground/20",
  },
};

function Chapter({
  id, n, eyebrow, title, body, points, visual, tone = "default", flip = false,
}: {
  id: string;
  n: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  visual: ReactNode;
  tone?: Tone;
  flip?: boolean;
}) {
  const t = chapterTone[tone];
  return (
    <Section id={id} tone={tone}>
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <div className="flex items-center gap-4">
            <span className={`font-mono text-sm tabular-nums ${t.eyebrow}`}>{n}</span>
            <span className={`h-px w-12 ${t.rule}`} aria-hidden="true" />
            <span className={`text-xs font-semibold uppercase tracking-[0.14em] ${t.eyebrow}`}>{eyebrow}</span>
          </div>
          <h2 className={`mt-6 ${h2Class}`}>{title}</h2>
          <p className={`mt-6 text-pretty text-base leading-relaxed md:text-lg ${t.muted}`}>{body}</p>
          <ul className="mt-8 space-y-4 text-sm">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <Check className={`mt-0.5 size-4 shrink-0 ${t.check}`} strokeWidth={2} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className={`relative w-full max-w-[520px] lg:col-span-7 ${flip ? "lg:order-1 lg:justify-self-start" : "lg:justify-self-end"}`}>
          <div aria-hidden="true" className={`absolute inset-x-8 -bottom-8 top-10 rounded-3xl ${t.plate}`} />
          <div className="relative z-10">{visual}</div>
        </div>
      </div>
    </Section>
  );
}

function Chapters() {
  return (
    <>
      <Chapter
        id="configuration"
        n="01"
        eyebrow="Configuration"
        title="Configurable without code"
        body="Fields, forms, dashboards, menus and approval workflows are settings, not pull requests. Your HR team changes them directly, and your developers stay on the work that matters."
        points={[
          "Add fields to any employee record, per tenant.",
          "Forms, menus and leave policies edited in the admin UI.",
          "Changes take effect without a deployment.",
        ]}
        visual={<FieldBuilderCard />}
        tone="surface"
      />
      <Chapter
        id="leave"
        n="02"
        eyebrow="Leave"
        title="Leave policies, balances and approvals in one queue"
        body="Employees request time off from the web or their phone. Managers and HR review each request against the policy you configured, with balances visible at every step."
        points={[
          "Leave types and accrual rules set per policy.",
          "Balances shown to the employee and the approver.",
          "Approvals routed through the workflow you designed.",
        ]}
        visual={<LeaveRequestCard />}
        flip
      />
      <Chapter
        id="payroll"
        n="03"
        eyebrow="Payroll"
        title="Review the whole run before it locks"
        body="Pay structures, runs and payslips sit on the same employee records as leave and attendance, so a run is built from data that already exists and checked before anyone is paid."
        points={[
          "Gross, deductions and net shown together for every run.",
          "Leave deductions pulled from approved requests.",
          "Approve once to lock the run and generate the bank file.",
        ]}
        visual={<PayrollRunCard />}
        tone="inverse"
      />
      <Chapter
        id="workflows"
        n="04"
        eyebrow="Workflows"
        title="Approval flows you design yourself"
        body="Chain approvals by department, leave type or amount. Each step is configured in the admin UI, so the process your company follows is the process the software enforces."
        points={[
          "Conditional steps triggered by rules you set.",
          "Every request shows where it is and who acts next.",
          "Flows are per tenant, so one company's rules never leak into another's.",
        ]}
        visual={<ApprovalFlowCard />}
        tone="surface"
        flip
      />
      <Chapter
        id="self-service"
        n="05"
        eyebrow="Self-service"
        title="Employees run their own HR from their phone"
        body="The ESS portal works on the web and in a mobile app. Employees check balances, request leave, download payslips and check in, all against the same records HR sees."
        points={[
          "Leave requests and balances on the go.",
          "Payslips and documents available to download.",
          "The same data as the admin UI, not a separate copy.",
        ]}
        visual={
          <div className="flex justify-center lg:justify-end">
            <SelfServicePhone />
          </div>
        }
      />
    </>
  );
}

function PlatformPillar() {
  return (
    <Section id="platform">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Eyebrow>06 · One platform</Eyebrow>
          <h2 className={h2Class}>HRM and payroll in one platform</h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-text-muted md:text-lg">
            Employees, leave, attendance and payroll share one set of records, so nothing is exported between tools.
          </p>
          <p className="mt-8 flex items-start gap-2.5 text-sm text-text-muted">
            <Smartphone className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
            Every employee gets an ESS portal on the web and in a mobile app.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-card sm:grid-cols-2 lg:col-span-8">
          {modules.map(({ i: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4 bg-surface-elevated p-7 transition-colors hover:bg-surface/60">
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-accent">
                <Icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function OpenSourcePillar() {
  const spec = [
    { i: Scale, k: "License", v: "AGPL-3.0 for the full core" },
    { i: Eye, k: "Source", v: "Public on GitHub. Read it, fork it, audit it." },
    { i: Server, k: "Hosting", v: "Self-host with one docker-compose up" },
    { i: HeartHandshake, k: "Core features", v: "Never locked behind a paid tier" },
    { i: Package, k: "Premium packs", v: "Optional and coming later. Core stays free." },
  ];
  return (
    <Section tone="surface" id="open-source">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>07 · Open source</Eyebrow>
          <h2 className={h2Class}>Open-source core under AGPL-3.0</h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-text-muted md:text-lg">
            The HR suite on GitHub is the real product, not a trial. Read the code, fork it and run it on infrastructure
            you manage.
          </p>
        </div>
        <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-card">
          {spec.map(({ i: Icon, k, v }) => (
            <div key={k} className="grid gap-1 px-6 py-5 sm:grid-cols-[11rem_1fr] sm:gap-4">
              <dt className="flex items-center gap-2.5 text-sm font-medium">
                <Icon className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                {k}
              </dt>
              <dd className="text-sm text-text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

function IsolationPillar() {
  const tenants = ["Tenant A", "Tenant B", "Tenant C", "Your org"];
  return (
    <Section id="isolation">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 lg:order-2">
          <Eyebrow>08 · Isolation</Eyebrow>
          <h2 className={h2Class}>Separated, not just filtered</h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-text-muted md:text-lg">
            Most multi-tenant apps keep everyone in one database and rely on a WHERE clause. We give every tenant its
            own database, so a missing filter cannot expose another company's payroll.
          </p>
          <ul className="mt-8 space-y-3.5 text-sm">
            <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />Each tenant has a dedicated database.</li>
            <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />Dedicated instances add a separate deployment and region.</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-6 lg:order-1" aria-hidden="true">
          {tenants.map((n, k) => {
            const own = k === 3;
            return (
              <div
                key={n}
                className={`rounded-xl border bg-surface-elevated p-6 shadow-card ${own ? "border-accent/60 shadow-lift" : "border-border"}`}
              >
                <span className={`inline-flex size-9 items-center justify-center rounded-lg border border-border ${own ? "text-accent" : "text-text-muted"}`}>
                  <Database className="size-4" strokeWidth={1.75} />
                </span>
                <p className="mt-5 text-sm font-medium">{n}</p>
                <p className="mt-1 font-mono text-xs text-text-muted">db_{n.toLowerCase().replace(/ /g, "_")}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function AudienceSplit() {
  const dev = [
    "API-first: every action in the UI is an API call",
    "OpenAPI spec to generate clients and documentation",
    "Webhooks for HR events in your own systems",
    "Self-host the full stack, from code to database",
  ];
  const hr = [
    "No-code configuration of fields, forms and menus",
    "Employee self-service on web and mobile",
    "Approval workflows designed in the admin UI",
    "Reports across headcount, leave and payroll",
  ];
  const panels = [
    { i: Code2, t: "For developers", items: dev },
    { i: Users, t: "For HR teams", items: hr },
  ];
  return (
    <Section tone="surface">
      <SectionHead eyebrow="09 · Audience" title="Built for developers and HR teams" />
      <div className="grid gap-5 md:grid-cols-2">
        {panels.map(({ i, t, items }) => (
          <article key={t} className="rounded-2xl border border-border bg-surface-elevated p-7 shadow-card md:p-9">
            <IconTile icon={i} />
            <h3 className="mt-8 text-xl font-semibold tracking-tight">{t}</h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed">
              {items.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Deployment() {
  return (
    <Section id="deployment">
      <SectionHead
        eyebrow="10 · Deployment"
        title="Three ways to run it. One product."
        sub="Start on your own servers, move to our cloud, or get an isolated instance for residency requirements."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {deployments.map(({ i, t, d, fit }) => (
          <article
            key={t}
            className="flex flex-col rounded-2xl border border-border bg-surface-elevated p-7 shadow-card transition duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lift"
          >
            <IconTile icon={i} />
            <h3 className="mt-8 text-lg font-semibold tracking-tight">{t}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-text-muted">{d}</p>
            <p className="mt-auto border-t border-border pt-5 text-sm">
              <span className="text-text-muted">Best for: </span>
              {fit}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface-elevated shadow-card">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">Feature comparison across deployment options</caption>
          <thead>
            <tr className="border-b border-border bg-surface/60 text-text-muted">
              <th scope="col" className="px-6 py-3.5 font-medium"><span className="sr-only">Feature</span></th>
              <th scope="col" className="px-6 py-3.5 font-medium text-text">Self-hosted</th>
              <th scope="col" className="px-6 py-3.5 font-medium text-text">Hosted SaaS</th>
              <th scope="col" className="px-6 py-3.5 font-medium text-text">Dedicated instance</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.f} className="border-b border-border last:border-0">
                <th scope="row" className="px-6 py-4 font-medium">{row.f}</th>
                <td className="px-6 py-4 text-text-muted">{row.a}</td>
                <td className="px-6 py-4 text-text-muted">{row.b}</td>
                <td className="px-6 py-4 text-text-muted">{row.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section tone="surface">
      <SectionHead eyebrow="11 · How it works" title="From clone to payroll run in three steps" />
      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map(({ i: Icon, t, d, code }, n) => (
          <li
            key={t}
            className="flex flex-col rounded-2xl border border-border bg-surface-elevated p-7 shadow-card transition duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-center justify-between">
              <IconTile icon={Icon} />
              <span className="font-mono text-xs text-text-muted">0{n + 1}</span>
            </div>
            <h3 className="mt-8 text-lg font-semibold tracking-tight">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{d}</p>
            {code && (
              <code className="mt-auto block rounded-lg border border-border bg-surface px-3 py-2.5 font-mono text-xs">
                $ {code}
              </code>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section className="pt-0">
      <div className="rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-float sm:px-12 md:py-24">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl">
          See it running before you install anything
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-primary-foreground/70">
          Open the live demo with a fictional org of about 50 employees, or read the docs and self-host today.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/demo" variant="accent" size="lg">
            <PlayCircle className="size-4" /> Try the demo
          </Button>
          <Button
            href={DOCS_URL}
            size="lg"
            className="border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <BookOpen className="size-4" /> Read the docs
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Chapters />
      <PlatformPillar />
      <OpenSourcePillar />
      <IsolationPillar />
      <AudienceSplit />
      <Deployment />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
