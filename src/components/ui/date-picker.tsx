import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../../lib/utils";

const DAY_MS = 86_400_000;
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function monthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  // Monday-first offset (getDay: Sun=0 … Sat=6)
  const lead = (first.getDay() + 6) % 7;
  const start = first.getTime() - lead * DAY_MS;
  return Array.from({ length: 42 }, (_, i) => new Date(start + i * DAY_MS));
}

const sameDay = (a?: Date, b?: Date) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const fmt = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric" });
const fmtMonth = new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric" });

function Calendar({
  selected,
  onSelect,
  month,
  onMonth,
}: {
  selected?: Date;
  onSelect: (d: Date) => void;
  month: Date;
  onMonth: (d: Date) => void;
}) {
  const today = new Date();
  const days = monthGrid(month.getFullYear(), month.getMonth());

  return (
    <div className="w-[272px]">
      <div className="flex items-center justify-between px-1 pb-2">
        <b className="text-sm font-semibold">{fmtMonth.format(month)}</b>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => onMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
            className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => onMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
            className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1 text-[10px] font-bold tracking-wide text-muted-foreground">{d}</span>
        ))}
        {days.map((d) => {
          const inMonth = d.getMonth() === month.getMonth();
          const sel = sameDay(d, selected);
          const isToday = sameDay(d, today);
          return (
            <button
              key={d.getTime()}
              type="button"
              onClick={() => onSelect(d)}
              aria-pressed={sel}
              className={cn(
                "grid h-8 place-items-center rounded-md text-[13px] transition-colors",
                !inMonth && "text-muted-foreground/45",
                inMonth && !sel && "text-foreground hover:bg-muted",
                isToday && !sel && "font-bold text-accent",
                sel && "bg-accent font-bold text-primary-foreground hover:bg-accent",
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Date picker — button + popover month-grid calendar. `value`/`onChange`
 *  controlled; pass `placeholder` for the empty state label. */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
}: {
  value?: Date;
  onChange: (d: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(value ?? new Date());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-9 w-52 items-center gap-2 rounded-lg border border-input bg-background px-2.5 text-left text-sm shadow-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <CalendarDays size={15} className="shrink-0 text-muted-foreground" />
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value ? fmt.format(value) : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-3">
        <Calendar
          selected={value}
          month={month}
          onMonth={setMonth}
          onSelect={(d) => { onChange(d); setOpen(false); setMonth(d); }}
        />
      </PopoverContent>
    </Popover>
  );
}
