import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

/** Horizontal step indicator for multi-step flows — done steps check off in
 *  accent, the current step is the accent ring, upcoming steps are muted. */
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-start">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-start last:flex-none">
            <div className="flex w-16 flex-col items-center gap-1.5">
              <span
                aria-current={active ? "step" : undefined}
                className={cn(
                  "grid size-7 place-items-center rounded-full border-2 text-xs font-bold transition-colors",
                  done && "border-accent bg-accent text-primary-foreground",
                  active && "border-accent bg-accent-10 text-accent",
                  !done && !active && "border-border bg-card text-muted-foreground",
                )}
              >
                {done ? <Check size={14} /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-center text-[10px] font-semibold leading-tight",
                  active ? "text-accent" : done ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className={cn("mx-1 mt-3.5 h-0.5 flex-1 rounded", done ? "bg-accent" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
