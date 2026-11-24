/** Deep brand surface — radial accent bloom over the accent-90 anchor, used
 *  for auth/flow side panels. Scheme-aware (follows the active accent ramp). */
export const BRAND_PANEL_BG =
  "bg-[radial-gradient(ellipse_at_80%_15%,color-mix(in_oklab,var(--accent-50)_80%,transparent)_0,color-mix(in_oklab,var(--accent-70)_45%,transparent)_37%,transparent_72%),linear-gradient(150deg,var(--accent-90),color-mix(in_oklab,var(--accent-90)_78%,black))]";

/** Subtle dot texture layered over BRAND_PANEL_BG (decorative, aria-hidden). */
export const BRAND_PANEL_DOTS =
  "opacity-30 [background-image:radial-gradient(color-mix(in_oklab,var(--accent-10)_12%,transparent)_0.7px,transparent_0.7px)] [background-size:18px_18px]";
