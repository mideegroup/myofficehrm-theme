/** Decorative category tints — an ENUMERATED, scheme-independent exception
 *  (spec 17 §4-style enumeration): categorical variety on stat tiles and
 *  avatars is a deliberate design constant — these hues do NOT follow the
 *  tenant accent scheme, so they must never be painted from accent tokens.
 *  Both light and dark variants are enumerated here; pages never write raw
 *  hue classes inline. */
export const decorativeTints = {
  default: "bg-accent-10 text-accent",
  lavender: "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  blue: "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
  mint: "bg-teal-100 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300",
} as const;

export type DecorativeTint = keyof typeof decorativeTints;

/** Cyclic order for avatar/category assignment — deterministic by index. */
export const avatarTintCycle: string[] = [
  decorativeTints.default,
  decorativeTints.lavender,
  decorativeTints.amber,
  decorativeTints.blue,
];

/** Chart/category swatch hexes (same enumerated-exception rule as the class
 *  tints above) — inline-style chart fills, not Tailwind utilities. */
export const chartSwatches = [
  "#397d62", "#83ad94", "#bdd2b7", "#d7c89e", "#dfe9df",
] as const;
