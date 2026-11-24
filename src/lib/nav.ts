import {
  Activity, ArrowRight, Building2, CalendarCheck, CalendarDays, CircleUserRound, Clock3,
  CreditCard, FileText, FlaskConical, LayoutDashboard, ShieldCheck, Users, Wallet,
  type LucideIcon,
} from "lucide-react";

export interface AppNavChild {
  label: string;
  to?: string;
  badge?: number;
  /** Divider label in the module sidemenu (e.g. "PHASE-2"). */
  section?: string;
}

export interface AppNavItem {
  label: string;
  icon: LucideIcon;
  to?: string;
  badge?: number;
  children?: AppNavChild[];
}

export interface AppNavGroup {
  title: string;
  badge?: number;
  items: AppNavItem[];
}

/** Application navigation — the single source of truth for the left menu and
 *  any future presentation of the same structure (rail, tabs, folded groups). */
export const appNavGroups: AppNavGroup[] = [
  {
    title: "WORKSPACE",
    items: [{ label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" }],
  },
  {
    title: "PEOPLE",
    items: [
      { label: "Employee", icon: CircleUserRound, to: "/employees" },
      { label: "Work Schedules", icon: CalendarCheck },
      { label: "Workflows", icon: Activity },
    ],
  },
  {
    title: "TIME & LEAVE",
    badge: 8,
    items: [
      {
        label: "Leave",
        icon: CalendarDays,
        to: "/leave",
        children: [
          { label: "Leave Types", to: "/leave/types" },
          { label: "Holidays", to: "/leave/holidays" },
          { label: "Workflow", to: "/leave/workflow" },
          { label: "Leave Settings", to: "/leave/settings" },
        ],
      },
      { label: "Attendance", icon: Clock3 },
    ],
  },
  {
    title: "PAYROLL",
    items: [
      {
        label: "Payroll",
        icon: Wallet,
        to: "/payroll",
        children: [
          { label: "Pay Type", to: "/payroll/pay-type" },
          { label: "Pay Group", to: "/payroll/pay-group" },
          { label: "Pay Process", to: "/payroll/pay-process" },
          { label: "Payroll Settings", to: "/payroll/settings" },
        ],
      },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      {
        label: "Organization",
        icon: Building2,
        to: "/organization",
        children: [
          { label: "Company", to: "/organization/company" },
          { label: "Localization", to: "/organization/localization" },
          { label: "Notifications", to: "/organization/notifications" },
          { label: "Colour scheme", to: "/organization/colour-scheme" },
        ],
      },
      {
        label: "User Management",
        icon: CircleUserRound,
        to: "/user-management",
        children: [
          { label: "Users", to: "/user-management/users" },
          { label: "Roles", to: "/user-management/roles" },
          { label: "Permissions", to: "/user-management/permissions" },
          { label: "Defaults", to: "/user-management/defaults" },
        ],
      },
      {
        label: "Security",
        icon: ShieldCheck,
        to: "/security",
        children: [
          { label: "Password Policy", to: "/security/password-policy" },
          { label: "Session timeout", to: "/security/session-timeout" },
          { label: "Two-factor authentication", to: "/security/two-factor" },
          { label: "SSO", to: "/security/sso" },
        ],
      },
      {
        label: "Prototype",
        icon: FlaskConical,
        to: "/prototype",
        children: [
          { label: "Status pills", to: "/prototype/statuses" },
          { label: "Overlays", to: "/prototype/overlays" },
          { label: "Tabs & pagination", to: "/prototype/tabs" },
          { label: "Toasts", to: "/prototype/toasts" },
          { label: "Banners", to: "/prototype/banners" },
          { label: "Colour scheme", to: "/prototype/colour-scheme" },
          { label: "403 — Access restricted", to: "/prototype/403" },
          { label: "404 — Not found", to: "/prototype/404" },
          { label: "500 — Server error", to: "/prototype/500" },
          { label: "Date picker", to: "/prototype/date-picker", section: "PHASE-2" },
          { label: "File upload", to: "/prototype/file-upload", section: "PHASE-2" },
          { label: "Multi-step form", to: "/prototype/multi-step", section: "PHASE-2" },
          { label: "Command palette (⌘K)", to: "/prototype/command-palette", section: "BACKLOG" },
          { label: "Notifications panel", to: "/prototype/notifications", section: "BACKLOG" },
          { label: "User profile & settings", to: "/prototype/user-profile", section: "BACKLOG" },
          { label: "Sortable column headers", to: "/prototype/sortable-headers", section: "BACKLOG" },
          { label: "Dark-mode QA pass", to: "/prototype/dark-mode", section: "BACKLOG" },
        ],
      },
      { label: "Workflows", icon: Activity },
    ],
  },
];

/** Module sidemenu items derived from nav children. */
export function moduleNavItems(parentLabel: string) {
  for (const g of appNavGroups)
    for (const i of g.items)
      if (i.label === parentLabel) return (i.children ?? []).filter((c): c is AppNavChild & { to: string } => !!c.to);
  return [];
}

/** Top-of-header breadcrumb titles by route. */
export const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/employees": "Employee Directory",
  "/organization": "Organization",
  "/profile": "Profile & settings",
};

/** Resolve a breadcrumb title for any registered route (falls back to the
 *  nav child label for module sub-pages). */
export function pageTitleFor(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  for (const g of appNavGroups)
    for (const i of g.items)
      for (const c of i.children ?? [])
        if (c.to === pathname) return c.label;
  return "Dashboard";
}
