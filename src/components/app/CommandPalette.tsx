import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CornerDownLeft, Search } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { appNavGroups } from "../../lib/nav";
import { guardedLeave } from "../../lib/navigationGuard";
import { cn } from "../../lib/utils";

interface Command {
  label: string;
  to: string;
  group: string;
}

const COMMANDS: Command[] = appNavGroups.flatMap((g) =>
  g.items.flatMap((i) => [
    ...(i.to ? [{ label: i.label, to: i.to, group: g.title }] : []),
    ...(i.children ?? [])
      .filter((c) => c.to)
      .map((c) => ({ label: `${i.label} — ${c.label}`, to: c.to!, group: g.title })),
  ]),
);

/** ⌘K / Ctrl-K command palette — flat navigation over nav-as-data (so it can
 *  never drift from the menu). Opened by the header search button, the key
 *  chord, or a `moh:command-palette` window event. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("moh:command-palette", onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("moh:command-palette", onEvent);
    };
  }, []);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => setCursor(0), [query, open]);

  const run = (c: Command) => {
    // Route-level navigation consults the screen's dirty guard (lib/navigationGuard)
    // so palette jumps can't silently discard in-progress edits.
    guardedLeave(() => {
      setOpen(false);
      setQuery("");
      navigate(c.to);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showClose={false}
        className="top-[18%] max-w-lg translate-y-0 gap-0 overflow-hidden p-0"
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <Search size={16} className="shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, hits.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
              if (e.key === "Enter" && hits[cursor]) run(hits[cursor]);
            }}
            placeholder="Jump to a page…"
            aria-label="Command palette search"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">ESC</kbd>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {hits.length === 0 && (
            <p className="px-3 py-6 text-center text-xs text-muted-foreground">No matches for “{query}”.</p>
          )}
          {hits.map((c, i) => (
            <button
              key={c.to}
              onClick={() => run(c)}
              onMouseEnter={() => setCursor(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                i === cursor ? "bg-accent-10 text-accent" : "text-foreground hover:bg-muted",
              )}
            >
              <ArrowRight size={14} className={cn("shrink-0", i === cursor ? "text-accent" : "text-muted-foreground")} />
              <span className="min-w-0 flex-1 truncate font-medium">{c.label}</span>
              <span className="shrink-0 text-[10px] font-semibold tracking-wide text-muted-foreground">{c.group}</span>
              {i === cursor && <CornerDownLeft size={13} className="shrink-0 text-accent" />}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
