import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;

/** Slide-over panel on the Dialog primitive — Esc, overlay dismiss, focus
 *  trap and scroll-lock come free from Radix. `side` chooses the edge. */
export function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: ComponentProps<typeof SheetPrimitive.Content> & { side?: "right" | "left" }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-40 bg-foreground/40" />
      <SheetPrimitive.Content
        className={cn(
          "animate-drawer-in fixed top-0 z-50 flex h-screen w-[min(470px,100%)] flex-col bg-card shadow-lg",
          side === "right" ? "right-0" : "left-0",
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between border-b border-border px-5 py-3.5", className)}
      {...props}
    />
  );
}

export function SheetTitle({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn("text-[11px] font-bold tracking-[0.12em] text-muted-foreground", className)}
      {...props}
    />
  );
}

export function SheetDescription({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description className={cn("sr-only", className)} {...props} />;
}

/** Standard header close button — place inside SheetHeader. */
export function SheetCloseButton() {
  return (
    <SheetPrimitive.Close
      aria-label="Close"
      className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <X size={19} />
    </SheetPrimitive.Close>
  );
}
