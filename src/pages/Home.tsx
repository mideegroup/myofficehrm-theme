import {
  ArrowRight, BookOpen, Building2, CalendarDays, Check, Clock, Cloud, Code2, Database, Download, Eye,
  HeartHandshake, ListChecks, ListPlus, Package, PlayCircle, Scale, Server, Settings2, Smartphone, Type, Users,
  Wallet, Workflow, GitBranch,
} from "lucide-react";
import { Eyebrow, IconTile, Section, SectionHead } from "../components/Layout";
import { Button } from "../components/Button";
import { GithubIcon } from "../components/Icons";
import { DashboardMock } from "../components/DashboardMock";
import { DOCS_URL, GITHUB_URL } from "../components/Nav";

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

const h2 = "text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl";

function Hero() {
  return (
    <section id="product" className="relative scroll-mt-14 overflow-hidden border-b border-border">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div aria-hidden="true" className="bg-accent-wash absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-text-muted shadow-card">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            Open source · AGPL-3.0 · Self-hostable
          </p>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            Configurable HR and payroll, on infrastructure you control
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
            Model your own fields, forms and workflows without writing code. Run it on your own server or let us
            host it, with employee and payroll data kept in a database that belongs to your organisation alone.
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button to="/demo" size="lg">
              Try the demo <ArrowRight className="size-4" />
            </Button>
            <Button href={GITHUB_URL} variant="secondary" size="lg">
              <GithubIcon className="size-4" /> Star on GitHub
            </Button>
          </div>
          <p className="mt-4 text-xs text-text-muted">The demo uses fictional data and needs no install.</p>
        </div>
        <div className="relative mx-auto mt-16 max-w-5xl rounded-2xl border border-border bg-surface/70 p-2 shadow-float md:mt-20">
          <DashboardMock />
          <p className="sr-only">
            Product preview: the myOfficeHRM admin dashboard with a sidebar, headcount statistics, an employee table
            and a leave approvals panel.
          </p>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { i: GitBranch, t: "Open source under AGPL-3.0" },
    { i: Server, t: "Self-host in minutes" },
    { i: Database, t: "Your data isolated per tenant" },
  ];
  return (
    <div className="border-b border-border bg-surface">
      <ul className="mx-auto grid max-w-6xl divide-y divide-border px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map(({ i: Icon, t }) => (
          <li key={t} className="flex items-center gap-3 py-5 text-sm font-medium md:justify-center md:px-6">
            <Icon className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
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
    <Section id="open-source">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>01 · Open source</Eyebrow>
          <h2 className={h2}>Open-source core under AGPL-3.0</h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-text-muted md:text-lg">
            The HR suite on GitHub is the real product, not a trial. Read the code, fork it and run it on infrastructure
            you manage.
          </p>
        </div>
        <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-background shadow-card">
          {spec.map(({ i: Icon, k, v }) => (
            <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4">
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
    <Section tone="surface" id="isolation">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <Eyebrow>02 · Isolation</Eyebrow>
          <h2 className={h2}>Separated, not just filtered</h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-text-muted md:text-lg">
            Most multi-tenant apps keep everyone in one database and rely on a WHERE clause. We give every tenant its
            own database, so a missing filter cannot expose another company's payroll.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />Each tenant has a dedicated database.</li>
            <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />Dedicated instances add a separate deployment and region.</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:order-1" aria-hidden="true">
          {tenants.map((n, k) => {
            const own = k === 3;
            return (
              <div
                key={n}
                className={`rounded-xl border bg-background p-5 shadow-card ${own ? "border-accent/60 shadow-lift" : "border-border"}`}
              >
                <span className={`inline-flex size-9 items-center justify-center rounded-lg border border-border ${own ? "text-accent" : "text-text-muted"}`}>
                  <Database className="size-4" strokeWidth={1.75} />
                </span>
                <p className="mt-4 text-sm font-medium">{n}</p>
                <p className="mt-1 font-mono text-xs text-text-muted">db_{n.toLowerCase().replace(/ /g, "_")}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function FieldBuilder() {
  const fields = [
    { i: Type, label: "Badge number", type: "Text", on: true },
    { i: CalendarDays, label: "Probation ends", type: "Date", on: true },
    { i: ListChecks, label: "Shirt size", type: "Select", on: false },
  ];
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-xl border border-border bg-background shadow-lift">
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

function ConfigPillar() {
  const areas = ["Custom fields", "Forms", "Menus", "Leave policies", "Approval flows", "Themes"];
  return (
    <Section id="configuration">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>03 · Configuration</Eyebrow>
          <h2 className={h2}>Configurable without code</h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-text-muted md:text-lg">
            Fields, forms, dashboards, menus and approval workflows are settings, not pull requests. Your HR team
            changes them directly, and your developers stay on the work that matters.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a} className="rounded-full border border-border bg-surface px-3 py-1 text-sm">{a}</li>
            ))}
          </ul>
        </div>
        <FieldBuilder />
      </div>
    </Section>
  );
}

function PlatformPillar() {
  return (
    <Section tone="surface" id="platform">
      <SectionHead
        eyebrow="04 · One platform"
        title="HRM and payroll in one platform"
        sub="Employees, leave, attendance and payroll share one set of records, so nothing is exported between tools."
      />
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border shadow-card sm:grid-cols-2 lg:grid-cols-3">
        {modules.map(({ i: Icon, t, d }) => (
          <div key={t} className="flex items-start gap-4 bg-background p-6 transition-colors hover:bg-surface/60">
            <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-accent">
              <Icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">{d}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-2.5 text-sm text-text-muted">
        <Smartphone className="size-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
        Every employee gets an ESS portal on the web and in a mobile app.
      </p>
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
    <Section>
      <SectionHead title="Built for developers and HR teams" />
      <div className="grid gap-5 md:grid-cols-2">
        {panels.map(({ i, t, items }) => (
          <article key={t} className="rounded-2xl border border-border bg-surface p-6 shadow-card md:p-8">
            <IconTile icon={i} />
            <h3 className="mt-6 text-xl font-semibold">{t}</h3>
            <ul className="mt-5 space-y-3.5 text-sm leading-relaxed">
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
    <Section tone="surface" id="deployment">
      <SectionHead
        eyebrow="Deployment"
        title="Three ways to run it. One product."
        sub="Start on your own servers, move to our cloud, or get an isolated instance for residency requirements."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {deployments.map(({ i, t, d, fit }) => (
          <article
            key={t}
            className="flex flex-col rounded-xl border border-border bg-background p-6 shadow-card transition duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lift"
          >
            <IconTile icon={i} />
            <h3 className="mt-6 text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{d}</p>
            <p className="mt-auto border-t border-border pt-5 text-sm">
              <span className="text-text-muted">Best for: </span>
              {fit}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background shadow-card">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">Feature comparison across deployment options</caption>
          <thead>
            <tr className="border-b border-border bg-surface/60 text-text-muted">
              <th scope="col" className="px-5 py-3 font-medium"><span className="sr-only">Feature</span></th>
              <th scope="col" className="px-5 py-3 font-medium text-text">Self-hosted</th>
              <th scope="col" className="px-5 py-3 font-medium text-text">Hosted SaaS</th>
              <th scope="col" className="px-5 py-3 font-medium text-text">Dedicated instance</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.f} className="border-b border-border last:border-0">
                <th scope="row" className="px-5 py-3.5 font-medium">{row.f}</th>
                <td className="px-5 py-3.5 text-text-muted">{row.a}</td>
                <td className="px-5 py-3.5 text-text-muted">{row.b}</td>
                <td className="px-5 py-3.5 text-text-muted">{row.c}</td>
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
    <Section>
      <SectionHead eyebrow="How it works" title="From clone to payroll run in three steps" />
      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map(({ i: Icon, t, d, code }, n) => (
          <li
            key={t}
            className="flex flex-col rounded-xl border border-border bg-background p-6 shadow-card transition duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-center justify-between">
              <IconTile icon={Icon} />
              <span className="font-mono text-xs text-text-muted">0{n + 1}</span>
            </div>
            <h3 className="mt-6 text-lg font-semibold">{t}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{d}</p>
            {code && (
              <code className="mt-auto block rounded-lg border border-border bg-surface px-3 py-2 pt-2.5 font-mono text-xs">
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
      <div className="rounded-2xl border border-border bg-primary px-6 py-14 text-center text-primary-foreground shadow-float sm:px-12 md:py-20">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          See it running before you install anything
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/70">
          Open the live demo with a fictional org of about 50 employees, or read the docs and self-host today.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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
      <TrustStrip />
      <OpenSourcePillar />
      <IsolationPillar />
      <ConfigPillar />
      <PlatformPillar />
      <AudienceSplit />
      <Deployment />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
