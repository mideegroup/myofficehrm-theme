import { useEffect, useState, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "../components/app/AppSidebar";
import { AppHeader } from "../components/app/AppHeader";
import { CommandPalette } from "../components/app/CommandPalette";

const COLLAPSED_KEY = "mo.sidebar.collapsed";

/** Main page template — owns all application chrome: left menu, header,
 *  environment banners. Pages render into the content slot only, so the
 *  chrome can be restructured once and inherited everywhere. */
export function AppShell({ children }: { children?: ReactNode }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSED_KEY) === "1");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMobileOpen(false), [pathname]);

  const toggleCollapsed = () =>
    setCollapsed((c) => {
      localStorage.setItem(COLLAPSED_KEY, c ? "0" : "1");
      return !c;
    });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
        mobileOpen={mobileOpen}
        onNavigate={() => setMobileOpen(false)}
      />
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-20 bg-foreground/40 lg:hidden"
        />
      )}
      <div className="min-w-0 flex-1">
        <AppHeader onToggleMenu={() => setMobileOpen((o) => !o)} />
        <CommandPalette />
        <div className="mx-auto w-full max-w-[1600px] px-4 pb-10 pt-5 sm:px-6 lg:px-10">
          <div className="mb-6 flex h-9 items-center justify-between gap-4 rounded-lg border border-accent-30/60 bg-accent-10/60 px-3 text-[11px] text-accent">
            <span className="flex items-center gap-2 font-bold tracking-[0.06em]">
              <i className="size-1.5 rounded-full bg-accent" />
              Demo Environment <span className="font-normal">·</span> Mock Data Only
            </span>
            <span className="hidden sm:inline">Data is illustrative and saved nowhere.</span>
          </div>
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  );
}
