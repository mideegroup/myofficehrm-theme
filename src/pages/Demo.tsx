import { useState, type FormEvent } from "react";
import { CheckCircle2, Copy, ExternalLink, Info, Mail, Smartphone, Users } from "lucide-react";
import { Section } from "../components/Layout";
import { Button } from "../components/Button";

const DEMO_URL = "https://demo.myofficehrm.com";

const todo = [
  "Add an employee",
  "Request leave as an employee",
  "Approve it as a manager",
  "Explore the config engine: add a custom field",
  "View reports",
];

function CopyField({ label, value }: { label: string; value: string }) {
  const [done, setDone] = useState(false);
  return (
    <div>
      <dt className="text-xs font-medium text-text-muted">{label}</dt>
      <dd className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <code className="truncate font-mono text-sm">{value}</code>
        <button
          type="button"
          aria-label={`Copy ${label}`}
          onClick={() => {
            navigator.clipboard?.writeText(value);
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          }}
          className="rounded p-1 text-text-muted hover:bg-surface hover:text-text"
        >
          {done ? <CheckCircle2 className="size-4 text-success" /> : <Copy className="size-4" />}
        </button>
      </dd>
    </div>
  );
}

function SharedCard() {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-background p-6 md:p-8">
      <span className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Users className="size-5" aria-hidden="true" />
      </span>
      <h2 className="text-xl font-semibold">Explore the shared demo</h2>
      <p className="mt-1.5 text-sm text-text-muted">Sign in with shared credentials. Everyone on this account sees the same data.</p>
      <dl className="mt-6 space-y-3 rounded-xl bg-surface p-4">
        <CopyField label="Email" value="demo@myofficehrm.com" />
        <CopyField label="Password" value="demo1234" />
      </dl>
      <div className="mt-6">
        <Button href={DEMO_URL} size="lg" className="w-full sm:w-auto">
          Launch demo <ExternalLink className="size-4" />
        </Button>
      </div>
      <div className="mt-6 border-t border-border pt-5">
        <h3 className="text-sm font-semibold">What's seeded</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-text-muted">
          <li>A fictional org with about 50 employees</li>
          <li>Departments, leave policies and sample requests</li>
          <li>A few weeks of attendance and a sample payroll run</li>
        </ul>
      </div>
    </article>
  );
}

function OwnSpaceCard() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <article className="flex flex-col rounded-2xl border border-accent/40 bg-background p-6 md:p-8">
      <span className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Mail className="size-5" aria-hidden="true" />
      </span>
      <h2 className="text-xl font-semibold">Get your own space</h2>
      <p className="mt-1.5 text-sm text-text-muted">
        We create a private department inside the demo org. You see only your team, so you can add and edit freely.
      </p>
      {sent ? (
        <div role="status" className="mt-6 flex gap-3 rounded-xl border border-success/40 bg-success/10 p-4 text-sm">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
          <p>Check <b>{email}</b> for your sign-in link. Your space is ready in a minute or so.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6">
          <label htmlFor="email" className="text-sm font-medium">Work email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-base placeholder:text-text-muted/70"
          />
          <Button type="submit" variant="accent" size="lg" className="mt-4 w-full sm:w-auto">Create my space</Button>
          <p className="mt-3 text-xs text-text-muted">We only use your email to send the sign-in link.</p>
        </form>
      )}
    </article>
  );
}

export default function Demo() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <p className="mb-3 text-sm font-medium text-accent">Live demo</p>
          <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Try myOfficeHRM with no install
          </h1>
          <p className="mt-4 max-w-2xl text-text-muted md:text-lg">
            Use the shared demo in one click, or get a private space for your team.
          </p>
        </div>
      </section>

      <Section className="!pb-8 md:!pb-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <SharedCard />
          <OwnSpaceCard />
        </div>
      </Section>

      <Section className="!pt-8 md:!pt-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">What to try</h2>
            <ul className="mt-5 space-y-3">
              {todo.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-xl border border-border bg-surface p-5">
            <Smartphone className="size-5 text-accent" aria-hidden="true" />
            <h3 className="mt-3 font-semibold">Got the mobile app?</h3>
            <p className="mt-1 text-sm text-text-muted">
              Point it at <code className="font-mono text-text">demo.myofficehrm.com</code> in the server setting and sign in with the same account.
            </p>
          </aside>
        </div>

        <div role="note" className="mt-12 flex gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
          <Info className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
          <p>Demo resets nightly · fictional data only · this demo runs our docker-compose on minimal infra, so expect it to be a bit slow.</p>
        </div>
      </Section>
    </>
  );
}
