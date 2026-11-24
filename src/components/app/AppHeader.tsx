import { Link, useLocation } from "react-router-dom";
import { Bell, ChevronDown, ChevronRight, CircleHelp, Menu, Search } from "lucide-react";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { pageTitleFor } from "../../lib/nav";
import { NotificationList } from "./NotificationList";

export function AppHeader({ onToggleMenu }: { onToggleMenu: () => void }) {
  const { pathname } = useLocation();
  const title = pageTitleFor(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-[66px] items-center justify-between gap-4 border-b border-border bg-card px-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMenu}
          aria-label="Toggle navigation"
          className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
        >
          <Menu size={20} />
        </button>
        <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <span className="hidden sm:inline">Northstar Group</span>
          <ChevronRight size={14} className="hidden sm:inline" />
          <b className="font-semibold text-foreground">{title}</b>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => window.dispatchEvent(new Event("moh:command-palette"))}
          className="hidden h-9 w-60 items-center gap-2 rounded-lg border border-input bg-background px-2.5 text-muted-foreground transition-colors hover:border-accent-30 hover:text-foreground md:flex"
        >
          <Search size={16} />
          <span className="min-w-0 flex-1 text-left text-sm">Jump to a page...</span>
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
            ⌘ K
          </kbd>
        </button>

        <button
          aria-label="Help"
          className="hidden size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:grid"
        >
          <CircleHelp size={19} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Notifications"
              className="relative grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bell size={19} />
              <i className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-3">
            <DropdownMenuLabel className="text-sm font-semibold">Notifications</DropdownMenuLabel>
            <NotificationList />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-left transition-colors hover:bg-muted">
              <Avatar initials="OC" size="sm" />
              <span className="hidden text-[13px] font-semibold leading-tight text-foreground sm:block">
                Olivia Chen
                <small className="block text-[10px] font-normal text-muted-foreground">
                  HR Administrator
                </small>
              </span>
              <ChevronDown size={14} className="hidden text-muted-foreground sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-sm font-semibold">Olivia Chen</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Account settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/">Exit demo environment</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
