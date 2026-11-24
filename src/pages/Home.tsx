import {
  ArrowRight, BookOpen, CalendarDays, Clock, Code2, Database, Download, GitBranch, HeartHandshake,
  Layers, ListPlus, Lock, Package, PlayCircle, Server, Settings2, Smartphone, Star, Users, Wallet, Workflow,
} from "lucide-react";
import { Section, SectionHead } from "../components/Layout";
import { Button } from "../components/ui/button";
import { LogoFull } from "../components/Logo";
import { GithubIcon } from "../components/Icons";
import { DashboardMock } from "../components/DashboardMock";
import { DOCS_URL, GITHUB_URL } from "../components/Nav";

const values = [
  { i: Settings2, t: "Configurable without code", d: "Custom fields, forms, dashboards, menus, themes and workflows are all settings, not pull requests." },
  { i: GitBranch, t: "Open-source core", d: "The core is AGPL-3.0. Read it, fork it, self-host it. No hidden tier gating the basics." },
  { i: Layers, t: "Complete HR suite", d: "Employees, leave, attendance, payroll and an employee portal in one coherent system." },
  { i: Code2, t: "API-first + mobile", d: "Everything the UI does is an API call. A public self-service API powers the mobile app." },
];

const modules = [
  { i: Users, t: "Employees", d: "Profiles, documents and org structure." },
  { i: CalendarDays, t: "Leave", d: "Policies, balances, requests and approvals." },
  { i: Clock, t: "Attendance", d: "Check-ins, shifts and timesheets." },
  { i: Wallet, t: "Payroll", d: "Pay structures, runs and payslips." },
  { i: Workflow, t: "Workflows", d: "Multi-step approvals you design yourself." },
  { i: ListPlus, t: "Custom fields", d: "Add data to any record, per tenant." },
];

const steps = [
  { i: Download, t: "Install", d: "Clone the repo and run one docker-compose up. Or use our hosted SaaS.", code: "docker compose up -d" },
  { i: Settings2, t: "Configure", d: "Shape fields, forms, menus, leave policies and approval flows in the admin UI.", code: "" },
  { i: Users, t: "Run your HR", d: "Invite your team, let them self-serve on web or mobile, and run payroll.", code: "" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden" id="product">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <LogoFull className="items-center" />
          <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Configurable HRM &amp; Payroll — open source, self-hosted, fits your org
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Model your own fields, forms and workflows without touching code. Run it on your own server, or
            let us host it. Your HR data stays yours.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button to="/demo" variant="cta">
              Try the demo <ArrowRight className="size-4" />
            </Button>
            <Button href={GITHUB_URL} variant="cta-secondary">
              <GithubIcon className="size-4" /> Star on GitHub
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-5xl md:mt-20">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { i: GitBranch, t: "Open source (AGPL)" },
    { i: Server, t: "Self-host in minutes" },
    { i: Database, t: "Your data, physically isolated per tenant" },
  ];
  return (
    <div className="border-y border-border bg-muted">
      <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-5 sm:px-6 md:grid-cols-3 md:gap-6">
        {items.map(({ i: Icon, t }) => (
          <li key={t} className="flex items-center gap-2.5 text-sm font-medium md:justify-center">
            <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" /> {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({ icon: Icon, title, text }: { icon: typeof Users; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-accent-30">
      <div className="mb-4 inline-flex size-9 items-center justify-center rounded-lg bg-accent-10 text-accent">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Isolation() {
  return (
    <Section className="border-t border-border bg-muted">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-medium text-accent">Trust by architecture</p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Separated, not just filtered
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Most multi-tenant apps keep everyone in one database and add a WHERE clause. We give every tenant
            its own database, so a missing filter can never leak another company's payroll.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3" aria-hidden="true">
          {["Tenant A", "Tenant B", "Tenant C", "Your org"].map((n, k) => (
            <div
              key={n}
              className={`rounded-lg border p-4 ${k === 3 ? "border-accent bg-accent-10" : "border-border bg-background"}`}
            >
              <Database className={`size-5 ${k === 3 ? "text-accent" : "text-muted-foreground"}`} />
              <p className="mt-3 text-sm font-medium">{n}</p>
              <p className="font-mono text-xs text-muted-foreground">db_{n.toLowerCase().replace(" ", "_")}</p>
            </div>
          ))}
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

      <Section id="features">
        <SectionHead
          eyebrow="Why myOfficeHRM"
          title="Software that bends to your organisation, not the other way round"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => <Card key={v.t} icon={v.i} title={v.t} text={v.d} />)}
        </div>
      </Section>

      <Section className="border-t border-border bg-muted">
        <SectionHead eyebrow="Modules" title="Everything HR runs on, in one place" sub="Use what you need today and switch on the rest later." />
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ i: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-3 bg-background p-5">
              <Icon className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Smartphone className="size-4" aria-hidden="true" /> Employees get an ESS portal on web and a mobile app.
        </p>
      </Section>

      <Isolation />

      <Section>
        <SectionHead eyebrow="How it works" title="From clone to payroll run in three steps" />
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map(({ i: Icon, t, d, code }, n) => (
            <li key={t} className="rounded-xl border border-border p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {n + 1}
                </span>
                <Icon className="size-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              {code && (
                <code className="mt-4 block rounded-lg border border-border bg-muted px-3 py-2 font-mono text-xs">
                  $ {code}
                </code>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { i: Server, t: "Self-hosted", d: "One docker-compose on your infra." },
            { i: Lock, t: "Hosted SaaS", d: "We run it, you configure it." },
            { i: Database, t: "Dedicated instance", d: "Your own isolated deployment." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="flex items-center gap-3 rounded-lg bg-muted px-4 py-3">
              <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <p className="text-sm"><span className="font-medium">{t}.</span> <span className="text-muted-foreground">{d}</span></p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-muted">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-accent">
              <Package className="size-4" aria-hidden="true" /> Open core
            </p>
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Free forever core. Premium packs for what enterprises need.
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              The HR suite you see on GitHub is the real product, not a trial. Later, optional packs will cover
              things larger organisations ask for. We will never move core features behind them.
            </p>
          </div>
          <ul className="space-y-3 rounded-xl border border-border bg-background p-5 text-sm">
            <li className="flex gap-2.5"><HeartHandshake className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" /><span><b>Core</b> — free, AGPL-3.0, self-hostable</span></li>
            <li className="flex gap-2.5"><Star className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" /><span><b>Premium packs</b> — optional, coming later</span></li>
          </ul>
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-border bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 md:py-16">
          <h2 className="mx-auto max-w-2xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            See it running before you install anything
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/70">
            Open the live demo with a fictional org of about 50 employees, or read the docs and self-host today.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/demo" variant="accent" size="lg"><PlayCircle className="size-4" /> Try the demo</Button>
            <Button href={DOCS_URL} size="lg" className="border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <BookOpen className="size-4" /> Read the docs
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
