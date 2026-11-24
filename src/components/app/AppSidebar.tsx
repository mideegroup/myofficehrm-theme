import { NavLink } from "react-router-dom";
import { Check, ChevronDown, CircleHelp, LogOut, PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";
import { LogoWordmark } from "../Logo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { toast } from "../ui/sonner";
import { appNavGroups, type AppNavItem } from "../../lib/nav";

const TENANTS = [
  { name: "Northstar Group", plan: "Business plan", initial: "N", current: true },
  { name: "Harbor Clinics", plan: "Starter plan", initial: "H", current: false },
  { name: "Atlas Retail", plan: "Trial", initial: "A", current: false },
];

const ITEM_CX =
  "flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] font-medium text-muted-foreground transition-colors";

function NavEntry({
  item,
  collapsed,
  onNavigate,
}: {
  item: AppNavItem;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  const title = collapsed ? item.label : undefined;
  const rowCx = collapsed ? `${ITEM_CX} justify-center px-0` : ITEM_CX;

  if (!item.to) {
    return (
      <span title={title} aria-disabled="true" className={`${rowCx} cursor-default opacity-55`}>
        <Icon size={17} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.badge != null && (
              <b className="grid size-[18px] place-items-center rounded-md bg-muted text-[9px] font-bold text-accent">
                {item.badge}
              </b>
            )}
          </>
        )}
      </span>
    );
  }

  return (
    <NavLink
      to={item.to}
      title={title}
      onClick={onNavigate}
      className={({ isActive }) =>
        `${rowCx} ${isActive ? "bg-accent-10 font-semibold text-accent" : "hover:bg-muted hover:text-foreground"}`
      }
    >
      <Icon size={17} className="shrink-0" />
      {!collapsed && (
        <>
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
          {item.badge != null && (
            <b className="grid size-[18px] place-items-center rounded-md bg-muted text-[9px] font-bold text-accent">
              {item.badge}
            </b>
          )}
        </>
      )}
    </NavLink>
  );
}

export function AppSidebar({
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onNavigate,
}: {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onNavigate: () => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex h-screen flex-none flex-col border-r border-border bg-card transition-all duration-200 lg:sticky lg:translate-x-0 ${
        collapsed ? "w-[72px]" : "w-[248px]"
      } ${mobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"}`}
    >
      <div
        className={`flex h-[66px] shrink-0 items-center border-b border-border/60 ${
          collapsed ? "justify-center px-0" : "justify-between px-4"
        }`}
      >
        {collapsed ? (
          <div className="flex items-center gap-1.5">
            <span aria-label="myOfficeHRM" className="text-[16px] font-extrabold leading-none tracking-[-0.1em] text-accent-70">
              m<b>O</b>
            </span>
            <button
              onClick={onToggleCollapsed}
              aria-label="Expand sidebar"
              className="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <PanelLeftOpen size={14} />
            </button>
          </div>
        ) : (
          <>
            <LogoWordmark />
            <button
              onClick={onToggleCollapsed}
              aria-label="Collapse sidebar"
              className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <PanelLeftClose size={17} />
            </button>
          </>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Switch workspace"
            className={`mx-3 mb-1 mt-3 flex h-[52px] items-center gap-2.5 rounded-lg border border-border bg-background px-2.5 text-left text-foreground transition-colors hover:border-accent-30 ${
              collapsed ? "justify-center px-0" : ""
            }`}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent-10 text-xs font-extrabold text-accent">
              N
            </span>
            {!collapsed && (
              <>
                <span className="min-w-0 flex-1 text-[13px] font-semibold leading-tight">
                  <span className="block truncate">Northstar Group</span>
                  <small className="block text-[10px] font-normal text-muted-foreground">Business plan</small>
                </span>
                <ChevronDown size={15} className="shrink-0 text-muted-foreground" />
              </>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right" sideOffset={8} className="w-64">
          <DropdownMenuLabel className="text-[11px] font-bold tracking-wide text-muted-foreground">WORKSPACES</DropdownMenuLabel>
          {TENANTS.map((t) => (
            <DropdownMenuItem
              key={t.name}
              disabled={t.current}
              onClick={() => toast(`${t.name} isn't part of the demo`, { description: "Workspace switching is illustrative here." })}
              className="flex items-center gap-2.5 py-2"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-accent-10 text-[11px] font-extrabold text-accent">
                {t.initial}
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[13px] font-semibold">{t.name}</span>
                <small className="block text-[10px] text-muted-foreground">{t.plan}</small>
              </span>
              {t.current && <Check size={14} className="shrink-0 text-accent" />}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => toast("Workspace creation is part of onboarding", { description: "Not in the demo scope." })} className="gap-2.5">
            <Plus size={14} /> Create workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <nav aria-label="Application navigation" className="flex-1 overflow-y-auto px-2.5 py-3">
        {appNavGroups.map((group, gi) => (
          <div key={group.title} className={gi === 0 ? "" : "mt-3 pt-3 " + (collapsed ? "border-t border-border/60" : "")}>
            {collapsed ? null : (
              <small className="mb-1.5 flex items-center justify-between px-2.5 text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
                {group.title}
                {group.badge != null && (
                  <b className="grid size-[18px] place-items-center rounded-md bg-muted text-[9px] font-bold text-accent">
                    {group.badge}
                  </b>
                )}
              </small>
            )}
            {group.items.map((item) => (
              <NavEntry
                key={item.label}
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-border/60 px-2.5 py-2.5">
        <span className="flex h-9 cursor-default items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium text-muted-foreground opacity-55">
          <CircleHelp size={17} className="shrink-0" />
          {!collapsed && "Help & support"}
        </span>
        <NavLink
          to="/"
          onClick={onNavigate}
          className={`flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${
            collapsed ? "justify-center px-0" : ""
          }`}
        >
          <LogOut size={17} className="shrink-0" />
          {!collapsed && "Exit demo"}
        </NavLink>
      </div>
    </aside>
  );
}
