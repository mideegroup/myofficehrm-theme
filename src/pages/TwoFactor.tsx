import { useState, type FormEvent } from "react";
import { CheckCircle2, KeyRound, QrCode, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { PageIntro } from "../components/app/PageIntro";
import { StatusPill } from "../components/app/StatusPill";
import { ConfirmDialog } from "../components/app/ConfirmDialog";
import { toast } from "../components/ui/sonner";

type EnrollState = "off" | "enrolling" | "enabled";

const RECOVERY_CODES = [
  "K7PQ-2MNX", "RD4H-9WFT", "B3ZT-8GLC", "Y6VJ-5QKP",
  "H9CM-7XNB", "W2KD-4RJY", "T8FP-6SHZ", "M5NX-3BQV",
];

/** Security → Two-factor authentication. When the admin flips the policy on,
 *  the enroll panel appears: scan QR (placeholder art in the demo), enter the
 *  authenticator code, confirm. Same design language as the login MFA step. */
export default function TwoFactorPage() {
  const [state, setState] = useState<EnrollState>("off");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDisable, setConfirmDisable] = useState(false);

  const toggle = (on: boolean) => {
    // Turning an enabled policy off is a security-sensitive action — confirm first.
    if (!on && state === "enabled") { setConfirmDisable(true); return; }
    setError("");
    setCode("");
    setState(on ? "enrolling" : "off");
  };

  const confirm = (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    window.setTimeout(() => {
      setSaving(false);
      if (/^\d{6}$/.test(code)) {
        setState("enabled");
        toast.success("Two-factor authentication enabled", { description: "Members will be asked for a code at sign in." });
      } else setError("Enter the 6-digit code from your authenticator app.");
    }, 500);
  };

  return (
    <div className="flex max-w-[720px] flex-col gap-5">
      <PageIntro
        eyebrow="SECURITY"
        title="Two-factor authentication"
        description="Additional verification required at sign in."
        action={<StatusPill status={state === "enabled" ? "Enabled" : "Disabled"} />}
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-5">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="mt-0.5 text-accent" />
            <div>
              <p className="text-sm font-semibold">Require two-factor authentication</p>
              <p className="mt-0.5 max-w-md text-xs leading-relaxed text-muted-foreground">
                Everyone in this workspace will need an authenticator app to sign in.
              </p>
            </div>
          </div>
          <Switch checked={state !== "off"} onCheckedChange={toggle} aria-label="Require two-factor authentication" />
          <ConfirmDialog
            open={confirmDisable}
            onOpenChange={setConfirmDisable}
            title="Disable two-factor authentication?"
            description="Everyone in this workspace will sign in with password only. This lowers account security."
            confirmLabel="Disable"
            onConfirm={() => { setState("off"); toast.success("Two-factor authentication disabled"); }}
          />
        </div>

        {state === "enrolling" && (
          <form onSubmit={confirm} className="border-t border-border bg-muted/40 px-6 py-6">
            <div className="flex flex-col gap-6 sm:flex-row">
              {/* QR placeholder — real flow renders the TOTP QR image here */}
              <div className="grid size-40 shrink-0 place-items-center rounded-xl border-2 border-dashed border-border bg-card">
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <QrCode size={40} />
                  <span className="text-[10px] font-medium tracking-wide">QR CODE</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <ol className="space-y-2 text-[13px] leading-relaxed">
                  <li className="flex gap-2.5">
                    <b className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-10 text-[11px] text-accent">1</b>
                    <span>Open your authenticator app (Google Authenticator, Authy, 1Password…).</span>
                  </li>
                  <li className="flex gap-2.5">
                    <b className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-10 text-[11px] text-accent">2</b>
                    <span>Scan the QR code, or enter the setup key <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">MOHR M4DE MOXY</code> manually.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <b className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-10 text-[11px] text-accent">3</b>
                    <span>Enter the 6-digit code shown by the app to confirm.</span>
                  </li>
                </ol>
                <div className="flex items-center gap-3">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="h-11 w-32 text-center font-mono text-base tracking-[0.3em]"
                    required
                  />
                  <Button type="submit" disabled={saving || code.length !== 6} className="bg-accent-70 font-bold hover:bg-accent-90">
                    {saving ? "Confirming…" : "Confirm & enable"}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => toggle(false)}>Cancel</Button>
                </div>
                {error && <p className="text-xs font-medium text-destructive">{error}</p>}
              </div>
            </div>
          </form>
        )}

        {state === "enabled" && (
          <div className="border-t border-border bg-status-success/60 px-6 py-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={17} className="mt-0.5 text-status-success-foreground" />
              <div className="min-w-0 flex-1 text-[13px] leading-relaxed">
                <b className="font-semibold text-status-success-foreground">Two-factor authentication is active.</b>
                <p className="mt-0.5 text-muted-foreground">
                  Members will be asked for a 6-digit code after their password.
                </p>
              </div>
            </div>
            {/* Recovery codes are emitted ONCE at confirm — shown inline here,
                not behind a button: this is the only moment the user sees them. */}
            <div className="mt-4 rounded-lg border border-border bg-card p-4">
              <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
                RECOVERY CODES — SAVE THESE NOW
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                Each code signs in once if the authenticator is lost. They won't be shown again.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-1.5 font-mono text-xs sm:grid-cols-4">
                {RECOVERY_CODES.map((c) => (
                  <code key={c} className="rounded-md bg-muted px-2.5 py-1.5 text-center font-medium">
                    {c}
                  </code>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="secondary" size="sm"><KeyRound size={14} /> Copy codes</Button>
                <Button variant="secondary" size="sm"><Smartphone size={14} /> Re-enroll device</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
