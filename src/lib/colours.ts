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

/** Write a scheme's scale as CSS vars. Token-write only — never injects CSS (spec 17 §8). */
export function applyScheme(scheme: ColorScheme, el = document.documentElement) {
  const mode = el.classList.contains("dark") ? "dk" : "lt";
  const scale = colourMap[scheme][mode];
  for (const step of [10, 30, 50, 70, 90] as const) {
    el.style.setProperty(`--accent-${step}`, scale[step]);
  }
}

/** Reset = re-apply the brand scheme. */
export function resetScheme(el = document.documentElement) {
  applyScheme(DEFAULT_SCHEME, el);
}
