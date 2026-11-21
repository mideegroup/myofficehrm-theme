import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Star, X } from "lucide-react";
import { LogoWordmark } from "./Logo";
import { Button } from "./Button";
import { GithubIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

export const GITHUB_URL = "https://github.com/mideegroup/myofficehrm";
export const DOCS_URL = "https://docs.myofficehrm.com";

const links = [
  { label: "Product", to: "/#product" },
  { label: "Features", to: "/#features" },
  { label: "Docs", href: DOCS_URL },
];

function StarBadge() {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <GithubIcon />
      GitHub
      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 text-xs text-foreground">
        <Star className="size-3 fill-warning text-warning" aria-hidden="true" />
        1.2k
      </span>
    </a>
  );
}

const linkCls = "rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:px-6">
        <LogoWordmark className="mr-4" />
        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((l) =>
            l.href ? (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={linkCls}>{l.label}</a>
            ) : (
              <NavLink key={l.label} to={l.to!} className={linkCls}>{l.label}</NavLink>
            ),
          )}
          <StarBadge />
          {/* Pricing is optional: <NavLink to="/pricing" className={linkCls}>Pricing</NavLink> */}
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Button variant="ghost" href="https://demo.myofficehrm.com/login" className="hidden sm:inline-flex">Log in</Button>
          <Button to="/demo" className="hidden sm:inline-flex">Try demo</Button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-muted md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col">
            {links.map((l) =>
              l.href ? (
                <a key={l.label} href={l.href} className={`${linkCls} py-2.5`}>{l.label}</a>
              ) : (
                <NavLink key={l.label} to={l.to!} onClick={() => setOpen(false)} className={`${linkCls} py-2.5`}>{l.label}</NavLink>
              ),
            )}
            <StarBadge />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button variant="secondary" href="https://demo.myofficehrm.com/login">Log in</Button>
            <Button to="/demo" onClick={() => setOpen(false)}>Try demo</Button>
          </div>
        </div>
      )}
    </header>
  );
}
