import { ConfirmDialog } from "./ConfirmDialog";

/** Standard unsaved-changes guard — every dirty form (sheet edits, settings,
 *  wizards) routes "leave?" through this so the copy and buttons never drift.
 *  Usage: intercept the leave action, show this dialog, run it on Discard. */
export function UnsavedChangesDialog({
  open,
  onDiscard,
  onCancel,
}: {
  open: boolean;
  onDiscard: () => void;
  onCancel: () => void;
}) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(o) => { if (!o) onCancel(); }}
      title="You have unsaved changes"
      description="Leaving now will discard them."
      confirmLabel="Discard"
      cancelLabel="Keep editing"
      onConfirm={onDiscard}
    />
  );
}
