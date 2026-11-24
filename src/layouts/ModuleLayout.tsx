import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export interface ModuleNavItem {
  label: string;
  to: string;
  icon?: LucideIcon;
  badge?: number;
  /** Optional divider label rendered above the item (e.g. "PHASE-2") —
   *  starts a new section; consecutive items sharing it group together. */
  section?: string;
}

/** Main content template — owns a module's section sub-navigation (the
 *  "mini sidemenu") plus the content slot. Modules without sub-nav render
 *  their content full-width. On mobile the sidemenu collapses to a dropdown.
 *  Swapping this presentation (rail → tabs, or folding sections into the
 *  left menu) is a change confined to this file. */
export function ModuleLayout({
  title,
  items,
}: {
  title?: string;
  items?: ModuleNavItem[];
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hasNav = !!items?.length;
  const current = items?.find((i) => i.to === pathname)?.to ?? items?.[0]?.to;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
      {hasNav && (
        <>
          <label className="block lg:hidden">
            <span className="sr-only">{title ? `${title} sections` : "Section"}</span>
            <select
              value={current}
              onChange={(e) => navigate(e.target.value)}
              className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {items.filter((i) => !i.section).map((item) => (
                <option key={item.to + item.label} value={item.to}>
                  {item.label}
                </option>
              ))}
              {[...new Set(items.filter((i) => i.section).map((i) => i.section!))].map((sec) => (
                <optgroup key={sec} label={sec}>
                  {items.filter((i) => i.section === sec).map((item) => (
                    <option key={item.to + item.label} value={item.to}>
                      {item.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <nav
            aria-label={title ? `${title} sections` : "Section navigation"}
            className="hidden w-52 flex-none self-start rounded-xl border border-border bg-card p-2.5 shadow-sm lg:block"
          >
            {title && (
              <small className="mb-1.5 block px-2.5 pt-1 text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
                {title}
              </small>
            )}
            {items.map((item, idx) => (
              <div key={item.to + item.label}>
                {item.section && (idx === 0 || items[idx - 1].section !== item.section) && (
                  <small className="mb-1.5 mt-3 block border-t border-border/60 px-2.5 pt-3 text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
                    {item.section}
                  </small>
                )}
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex min-h-9 items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] font-medium leading-snug transition-colors ${
                    isActive
                      ? "bg-accent-10 font-semibold text-accent"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                {item.icon && <item.icon size={15} className="shrink-0 self-center" />}
                <span className="min-w-0 flex-1">{item.label}</span>
                {item.badge != null && (
                  <b className="grid size-[18px] shrink-0 place-items-center rounded-md bg-muted text-[9px] font-bold text-accent">
                    {item.badge}
                  </b>
                )}
              </NavLink>
              </div>
            ))}
          </nav>
        </>
      )}
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
