import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, Check, Eye, EyeOff, LockKeyhole, MoreHorizontal, UserRound, X,
} from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";
import { LogoWordmark } from "../components/Logo";
import { BRAND_PANEL_BG, BRAND_PANEL_DOTS } from "../lib/brand";

const DEMO_EMAIL = "demo@myofficehrm.com";
const DEMO_PASSWORD = "demouser";

const FEATURES = [
  "Employee Management",
  "Payroll Processing",
  "Leave Management",
  "Attendance Tracking",
  "Self Hosted or Cloud",
];

const BARS = [30, 45, 37, 60, 48, 72, 56, 77, 65, 90, 73, 100];

function BrandPanel() {
  return (
    <aside className={`relative flex flex-col justify-between gap-8 overflow-hidden px-6 py-8 text-primary-foreground sm:px-10 lg:min-h-screen xl:px-14 ${BRAND_PANEL_BG}`}>
      <div aria-hidden="true" className={`absolute inset-0 ${BRAND_PANEL_DOTS}`} />
      <div className="relative flex items-center justify-between">
        <LogoWordmark inverse />
        <span className="text-[10px] font-bold tracking-[0.14em] text-primary-foreground/70">
          PEOPLE OPERATIONS, IN SYNC
        </span>
      </div>

      <div className="relative mx-auto my-10 w-full max-w-[450px]">
        <div aria-label="myOfficeHRM" className="w-max text-[69px] font-extrabold leading-[0.9] tracking-[-0.12em]">
          <span className="text-accent-30">m</span>
          <b className="text-accent-10">O</b>
          <small className="mt-2.5 block text-center text-[8px] font-bold tracking-[0.16em] text-accent-30/80">
            YOUR PEOPLE. YOUR PLATFORM.
          </small>
        </div>
        <h1 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-tight xl:text-[54px]">
          myOfficeHRM
          <br />
          <span className="text-accent-30">&amp; Payroll</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/75">
          Clarity for your people operations. Confidence in every process.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 text-[13px] text-primary-foreground/85">
          {FEATURES.map((f) => (
            <span key={f} className="flex items-center gap-2">
              <Check size={15} className="text-accent-30" />
              {f}
            </span>
          ))}
        </div>

        <div className="mt-9 hidden overflow-hidden rounded-[10px] border border-white/20 bg-card text-card-foreground shadow-lg sm:block">
          <div className="flex h-9 items-center justify-between border-b border-border px-3.5 text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
            <span>WORKFORCE OVERVIEW</span>
            <MoreHorizontal size={16} />
          </div>
          <div className="flex items-end justify-between px-4 pt-4">
            <div>
              <small className="block text-[9px] font-bold tracking-[0.1em] text-muted-foreground">
                ACTIVE EMPLOYEES
              </small>
              <b className="mt-1 block text-xl font-semibold">
                1,248 <i className="not-italic text-[11px] text-accent">+8.2%</i>
              </b>
            </div>
            <div className="flex h-[72px] w-[52%] items-end gap-1">
              {BARS.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-70 to-accent-30" />
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <i className="size-1.5 rounded-full bg-accent-70" /> Payroll cycle <b className="text-foreground">On track</b>
            </span>
            <span className="flex items-center gap-1.5">
              <i className="size-1.5 rounded-full bg-accent-70" /> Attendance <b className="text-foreground">98.4%</b>
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex justify-between border-t border-primary-foreground/20 pt-4 text-[9px] font-bold tracking-[0.14em] text-primary-foreground/60">
        <span>SECURE PEOPLE MANAGEMENT</span>
        <span>EST. FOR BETTER WORK</span>
      </div>
    </aside>
  );
}

function MicrosoftMark() {
  return (
    <span className="grid shrink-0 grid-cols-2 gap-[2px]" aria-hidden="true">
      <i className="size-[5px] bg-[#f25022]" />
      <i className="size-[5px] bg-[#7fba00]" />
      <i className="size-[5px] bg-[#00a4ef]" />
      <i className="size-[5px] bg-[#ffb900]" />
    </span>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        navigate("/dashboard");
      } else {
        setError("Incorrect email or password.");
      }
    }, 750);
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(460px,45%)_1fr]">
      <BrandPanel />

      <section className="flex items-center justify-center bg-background px-6 py-10">
        <div className="w-full max-w-[400px]">
          <div>
            <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] text-accent">
              <i className="size-1.5 rounded-full bg-accent" />
              YOUR WORKSPACE
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block text-sm font-medium">
              Email address
              <span className="relative mt-2 block">
                <UserRound size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  autoFocus
                  type="email"
                  autoComplete="username"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-10"
                />
              </span>
            </label>

            <label className="block text-sm font-medium">
              Password
              <span className="relative mt-2 block">
                <LockKeyhole size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10 pr-11"
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

            <div className="flex justify-end">
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  setError("Password reset is unavailable in this demo environment.");
                }}
                className="text-sm font-medium text-accent hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {error && (
              <div role="alert" className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
                <X size={15} className="shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="h-12 w-full gap-3 bg-accent-70 font-bold hover:bg-accent-90"
            >
              {loading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={17} />
                </>
              )}
            </Button>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              Or continue with
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="secondary"
                className="h-11 w-full gap-3 text-sm"
                onClick={() => setError("Single sign-on is not enabled in this demo environment.")}
              >
                <MicrosoftMark />
                Sign in with Microsoft Entra ID
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="h-11 w-full gap-3 text-sm"
                onClick={() => setError("Single sign-on is not enabled in this demo environment.")}
              >
                <span className="text-base font-bold text-[#4285F4]">G</span>
                Sign in with Google Workspace
              </Button>
            </div>
          </form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/demo" className="font-semibold text-accent hover:underline">
              Sign Up
            </Link>
          </p>

          <div className="mt-8 rounded-xl border border-border bg-muted/40 p-4 text-sm">
            <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
              DEMO ACCESS
            </span>
            <p className="mt-2.5 flex justify-between text-muted-foreground">
              Email <b className="font-medium text-foreground">{DEMO_EMAIL}</b>
            </p>
            <p className="mt-1 flex justify-between text-muted-foreground">
              Password <b className="font-medium text-foreground">{DEMO_PASSWORD}</b>
            </p>
          </div>

          <div className="mt-10 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>© 2026 myOfficeHRM</span>
            <a href="#privacy" className="hover:text-foreground">
              Privacy &amp; security
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
