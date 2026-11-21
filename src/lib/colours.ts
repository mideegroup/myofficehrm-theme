/**
 * colourMap — named, accessibility-vetted colour schemes (spec 17 §3, §7).
 *
 * Same values are emitted as CSS custom properties on :root / .dark and are
 * the machine-readable source for surfaces CSS vars can't reach (React
 * Native, charts, canvas, email). Generate one from the other — never
 * maintain two copies.
 *
 * Step semantics: 10 tint fills · 30 mid/borders · 50 base accent ·
 * 70 hover/pressed · 90 dark anchor. `dk` inverts the scale.
 *
 * `default` is the brand scheme (green family shared with the marketing
 * site register) — it is what the app ships as and what "Reset to default"
 * restores. Everything else in the map is a tenant-selectable scheme.
 */

export type ScaleStep = 10 | 30 | 50 | 70 | 90;
export type Scale = Record<ScaleStep, string>;
export type ColorScheme = keyof typeof colourMap;

export const colourMap = {
  default: {
    lt: { 10: "#EBF5EF", 30: "#BFE0D2", 50: "#377B68", 70: "#225A4B", 90: "#163C35" },
    dk: { 10: "#0C1814", 30: "#21483F", 50: "#8CCDB1", 70: "#C1E3D4", 90: "#F4F8F2" },
  },
  teal: {
    lt: { 10: "#EBFFFF", 30: "#BDE8E7", 50: "#007373", 70: "#003A3B", 90: "#002022" },
    dk: { 10: "#002022", 30: "#003A3B", 50: "#3FA0A0", 70: "#BDE8E7", 90: "#EBFFFF" },
  },
  // Reserved for the tenant-theme catalog (D-th-1, D-th-2):
  // violet: { lt: {...}, dk: {...} },
} as const;

export const DEFAULT_SCHEME: ColorScheme = "default";

/**
 * Select a scheme by writing `data-scheme` on the root element — the CSS
 * cascade then provides the correct lt/dk scale for the current mode
 * (token-write only, spec 17 §8). Setting `default` removes the attribute
 * and falls back to the baked `:root`/`.dark` values.
 *
 * Deliberately attribute-based, not inline-style based: inline `--accent-*`
 * overrides would beat `.dark` forever and break dark-mode re-theming.
 */
export function applyScheme(scheme: ColorScheme, el = document.documentElement) {
  if (scheme === DEFAULT_SCHEME) el.removeAttribute("data-scheme");
  else el.dataset.scheme = scheme;
}

/** Reset = fall back to the baked `default` scheme. */
export function resetScheme(el = document.documentElement) {
  el.removeAttribute("data-scheme");
}

/** The currently applied scheme (`default` when no override is set). */
export function currentScheme(el = document.documentElement): ColorScheme {
  const v = el.dataset.scheme;
  return v && v in colourMap ? (v as ColorScheme) : DEFAULT_SCHEME;
}
