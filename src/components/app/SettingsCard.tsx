import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { toast } from "../ui/sonner";
import { ConfirmDialog } from "./ConfirmDialog";
import {
  INITIAL_PREFS, SETTING_DESCRIPTIONS, SETTING_NUMBER_KEYS, SETTING_SELECT_OPTIONS, SETTING_TOGGLE_KEYS,
} from "../../lib/settingsMeta";

const SELECT_CX =
  "h-9 w-52 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground shadow-sm " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Configuration card: a titled card rendering a list of setting options
 *  (label + description + input/select/switch) with save/reset. Used by the
 *  Organization page and module settings pages alike. */
export function SettingsCard({
  title,
  description,
  optionKeys,
  adminOnly = true,
  children,
}: {
  title: string;
  description: string;
  optionKeys: string[];
  adminOnly?: boolean;
  children?: React.ReactNode;
}) {
  const [prefs, setPrefs] = useState<Record<string, string>>(INITIAL_PREFS);
  const [confirmReset, setConfirmReset] = useState(false);
  const setValue = (key: string, val: string) => {
    setPrefs((c) => ({ ...c, [key]: val }));
  };

  const save = () => toast.success("Changes saved", { description: `${title} preferences updated.` });

  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div>
          <span className="text-[11px] font-bold tracking-[0.12em] text-accent">CONFIGURATION</span>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {adminOnly && (
          <span className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-muted px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground">
            <ShieldCheck size={15} /> Admin only
          </span>
        )}
      </div>

      <div className="px-5">
        {optionKeys.map((key, index) => (
          <div
            key={key}
            className="flex min-h-[68px] items-center justify-between gap-8 border-b border-border/60 py-3 last:border-0"
          >
            <div className="min-w-0">
              <label htmlFor={`${title}-${index}`} className="text-sm font-semibold">
                {key}
              </label>
              <small className="mt-0.5 block text-xs text-muted-foreground">
                {SETTING_DESCRIPTIONS[key] ?? "Configure this preference for your organization."}
              </small>
            </div>
            {SETTING_TOGGLE_KEYS.has(key) ? (
              <Switch
                id={`${title}-${index}`}
                checked={prefs[key] === "on"}
                onCheckedChange={(v) => setValue(key, v ? "on" : "off")}
                aria-label={`${key} ${prefs[key] === "on" ? "enabled" : "disabled"}`}
              />
            ) : SETTING_SELECT_OPTIONS[key] ? (
              <select
                id={`${title}-${index}`}
                value={prefs[key]}
                onChange={(e) => setValue(key, e.target.value)}
                className={SELECT_CX}
              >
                {SETTING_SELECT_OPTIONS[key].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            ) : (
              <Input
                id={`${title}-${index}`}
                type={SETTING_NUMBER_KEYS.has(key) ? "number" : key === "Organization email" ? "email" : "text"}
                min={SETTING_NUMBER_KEYS.has(key) ? 0 : undefined}
                value={prefs[key] ?? ""}
                onChange={(e) => setValue(key, e.target.value)}
                className="h-9 w-52"
              />
            )}
          </div>
        ))}
        {children}
      </div>

      <div className="flex items-center justify-end gap-2.5 border-t border-border p-5">
        <Button variant="secondary" onClick={() => setConfirmReset(true)}>
          Reset
        </Button>
        <Button className="bg-accent-70 font-bold hover:bg-accent-90" onClick={save}>
          Save changes <ArrowRight size={15} />
        </Button>
      </div>

      <ConfirmDialog
        open={confirmReset}
        onOpenChange={setConfirmReset}
        title={`Reset ${title.toLowerCase()}?`}
        description="All values on this page return to their defaults. This can't be undone."
        confirmLabel="Reset"
        onConfirm={() => { setPrefs(INITIAL_PREFS); toast.success("Settings reset to defaults"); }}
      />
    </section>
  );
}
