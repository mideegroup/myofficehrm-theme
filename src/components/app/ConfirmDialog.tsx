import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

/** Canonical destructive/irreversible confirmation — every "delete / disable /
 *  reset" action goes through this, never a bare onClick. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = true,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <div className="flex items-start gap-3.5">
          <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${destructive ? "bg-status-danger text-status-danger-foreground" : "bg-accent-10 text-accent"}`}>
            <AlertTriangle size={19} />
          </span>
          <DialogHeader>
            <DialogTitle className="text-base">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-[13px] leading-relaxed text-muted-foreground">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? "destructive" : "primary"}
            onClick={() => { onConfirm(); onOpenChange(false); }}
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
