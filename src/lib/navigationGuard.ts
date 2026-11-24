/** Global leave-guard for dirty forms.
 *
 *  A screen with unsaved changes registers a guard via `setNavigationGuard`;
 *  any navigation that would unmount it (command palette, menu links, future
 *  router-level blockers) routes through `guardedLeave`, which defers the
 *  action to the screen's own unsaved-changes dialog instead of bypassing it.
 *
 *  Why not `useBlocker`: router-level blocking requires the data-router
 *  (createBrowserRouter); this app uses declarative <Routes>, so the guard
 *  is a consultative pattern instead — same contract, no router migration. */
let guard: ((leave: () => void) => void) | null = null;

export function setNavigationGuard(g: typeof guard) {
  guard = g;
}

/** Run `leave` immediately, or hand it to the registered dirty-form guard. */
export function guardedLeave(leave: () => void) {
  if (guard) guard(leave);
  else leave();
}
