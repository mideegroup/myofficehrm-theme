import { useLayoutEffect } from "react";

/**
 * Pin the page to light while mounted — auth surfaces (/login,
 * /forgot-password) are always light: the brand panel is a dark marketing
 * surface and the form side a light task surface, in every theme.
 *
 * Done at document level, not a scoped `.light` class: the `.dark` block
 * rewrites the raw accent ramps on <html>, so a subtree cannot recover
 * light values by re-mapping roles.
 */
export function usePinLight() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    root.classList.remove("dark");
    return () => {
      if (wasDark) {
        root.classList.add("dark");
        // ThemeToggle snapshots the class during render — which happens
        // before this cleanup — and its listener mounts after this
        // commit. Defer the resync signal past both.
        setTimeout(() => window.dispatchEvent(new Event("moh:theme-restored")), 0);
      }
    };
  }, []);
}
