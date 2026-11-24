/** Enumerated domain statuses → semantic tone. Tones resolve to the global
 *  --status-* tokens (scheme-independent by design); `neutral` maps to the
 *  muted tokens — Disabled/Off is an inert state, not an alarm. Extend this
 *  map as new statuses are modelled — never hand-roll status colours in
 *  pages. */
export type StatusTone = "success" | "warning" | "info" | "danger" | "neutral";

export const statusTints: Record<string, StatusTone> = {
  Active: "success",
  "On leave": "warning",
  Probation: "info",
  Pending: "warning",
  "In progress": "info",
  Approved: "success",
  Rejected: "danger",
  Expired: "danger",
  "On track": "success",
  Enabled: "success",
  Disabled: "neutral",
  Inactive: "neutral",
  Off: "neutral",
};

export const statusTone = (status: string): StatusTone => statusTints[status] ?? "info";
