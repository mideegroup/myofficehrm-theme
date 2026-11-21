/**
 * colourMap — named, accessibility-vetted colour schemes (spec 17 §3, §7).
 *
 * Values live in ./colourmap.json — the single source of truth. The Vite
 * `scheme-css` plugin emits :root / .dark / [data-scheme] blocks from it
 * (virtual:schemes.css), and it is the machine-readable source for surfaces
 * CSS vars can't reach (React Native, charts, canvas, email).
 *
 * Step semantics: 10 tint fills · 30 mid/borders · 50 base accent ·
 * 70 hover/pressed · 90 dark anchor. `dk` inverts the scale.
 *
 * `default` is the brand scheme (green family shared with the marketing
 * site register) — it is what the app ships as and what "Reset to default"
 * restores. Everything else in the map is a tenant-selectable scheme.
 */
import data from "./colourmap.json";

export type ScaleStep = 10 | 30 | 50 | 70 | 90;
export type Scale = Record<ScaleStep, string>;
export type SchemeEntry = { lt: Scale; dk: Scale };

/** Literal keys keep `ColorScheme` strict — add the scheme name here when
 *  adding its values to colourmap.json. */
type Schemes = {
  default: SchemeEntry;
  teal: SchemeEntry;
  violet: SchemeEntry;
  blue: SchemeEntry;
};

export const colourMap = data as unknown as Schemes;
export type ColorScheme = keyof Schemes;

export const DEFAULT_SCHEME: ColorScheme = "default";

const SCHEME_KEY = "scheme";

/**
 * Select a scheme by writing `data-scheme` on the root element — the CSS
 * cascade then provides the correct lt/dk scale for the current mode
 * (token-write only, spec 17 §8). Setting `default` removes the attribute
 * and falls back to the baked `:root`/`.dark` values.
 *
 * Deliberately attribute-based, not inline-style based: inline `--accent-*`
 * overrides would beat `.dark` forever and break dark-mode re-theming.
 *
 * Persists to localStorage; `initScheme` restores it pre-paint.
 */
export function applyScheme(scheme: ColorScheme, el = document.documentElement) {
  if (scheme === DEFAULT_SCHEME) el.removeAttribute("data-scheme");
  else el.dataset.scheme = scheme;
  try {
    localStorage.setItem(SCHEME_KEY, scheme);
  } catch { /* storage unavailable */ }
}

/** Reset = fall back to the baked `default` scheme (clears persistence). */
export function resetScheme(el = document.documentElement) {
  el.removeAttribute("data-scheme");
  try {
    localStorage.removeItem(SCHEME_KEY);
  } catch { /* storage unavailable */ }
}

/** The currently applied scheme (`default` when no override is set). */
export function currentScheme(el = document.documentElement): ColorScheme {
  const v = el.dataset.scheme;
  return v && v in colourMap ? (v as ColorScheme) : DEFAULT_SCHEME;
}

/**
 * Restore the persisted scheme onto the root element. Call as early as
 * possible (index.html runs an inline equivalent pre-paint to avoid a
 * scheme flash — spec 17 §6).
 */
export function initScheme(el = document.documentElement) {
  try {
    const v = localStorage.getItem(SCHEME_KEY);
    if (v && v in colourMap) el.dataset.scheme = v;
  } catch { /* storage unavailable */ }
}
