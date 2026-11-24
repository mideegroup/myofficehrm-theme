import { useState } from "react";
import { Check } from "lucide-react";
import { PageIntro } from "../components/app/PageIntro";
import { applyScheme, colourMap, currentScheme, type ColorScheme } from "../lib/colours";

const SCHEMES = Object.keys(colourMap) as ColorScheme[];

/** Organization → Colour scheme — tenant branding picker. Applying a scheme
 *  retints the whole workspace live (the white-label story). */
export function ColourSchemePage() {
  const [scheme, setScheme] = useState<ColorScheme>(currentScheme());

  return (
    <>
      <PageIntro
        eyebrow="ORGANIZATION"
        title="Colour scheme"
        description="The accent palette applied across your workspace."
      />
      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.12em] text-accent">BRANDING</span>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight">Colour scheme</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The accent palette applied across this workspace — try one, it updates live.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
          {SCHEMES.map((s) => (
            <button
              key={s}
              onClick={() => {
                applyScheme(s);
                setScheme(s);
              }}
              aria-pressed={scheme === s}
              className={`flex h-12 items-center gap-2.5 rounded-lg border px-3 text-left text-xs font-semibold capitalize transition-colors ${
                scheme === s
                  ? "border-accent bg-accent-10 text-foreground"
                  : "border-border text-muted-foreground hover:border-accent-30 hover:text-foreground"
              }`}
            >
              <span className="relative grid size-5 place-items-center">
                <i className="size-5 rounded-full" style={{ background: colourMap[s].lt["50"] }} />
                {scheme === s && <Check size={12} className="absolute text-white" />}
              </span>
              {s}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
