import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Field } from "../components/ui/field";

/** Reset password — bare auth-boundary page like /login: request → sent.
 *  The link expiry/one-time semantics are server-side; the prototype shows
 *  the two states and the copy. */
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    window.setTimeout(() => { setSending(false); setSent(true); }, 600);
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <div className="w-full max-w-[400px]">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft size={15} /> Back to sign in
        </Link>

        <div className="mt-8">
          <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] text-accent">
            <i className="size-1.5 rounded-full bg-accent" /> SECURE SIGN-IN
          </span>
          <h1 className="mt-3 text-[30px] font-semibold leading-tight tracking-tight">
            {sent ? "Check your inbox" : "Reset your password"}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {sent
              ? "If an account exists for that address, a reset link is on its way — it expires in 30 minutes."
              : "Enter your work email and we'll send a link to choose a new password."}
          </p>
        </div>

        {sent ? (
          <div className="mt-7 flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-xl border border-status-success-foreground/20 bg-status-success/60 px-4 py-3.5">
              <Mail size={17} className="mt-0.5 shrink-0 text-status-success-foreground" />
              <p className="text-[13px] leading-relaxed">
                Reset link sent to <b className="font-semibold">{email}</b>. Didn't get it? Check spam,
                or{" "}
                <button
                  onClick={() => setSent(false)}
                  className="font-semibold text-status-success-foreground underline-offset-2 hover:underline"
                >
                  try another address
                </button>
                .
              </p>
            </div>
            <Button to="/login" className="h-12 w-full bg-accent-70 font-bold hover:bg-accent-90">
              Back to sign in
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
            <Field label="Work email" htmlFor="reset-email">
              <Input
                id="reset-email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </Field>
            <Button type="submit" disabled={sending} className="h-12 w-full bg-accent-70 font-bold hover:bg-accent-90">
              {sending ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        )}

        <p className="mt-10 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <CheckCircle2 size={12} className="text-accent" /> Reset links are single-use and expire in 30 minutes.
        </p>
      </div>
    </main>
  );
}
