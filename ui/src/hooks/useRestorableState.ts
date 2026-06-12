import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { readSnapshot, writeSnapshot } from "@/lib/history";
import { useUiStore } from "@/store/uiStore";

/**
 * Drives the Back-button "in-app time machine" (Requirement 4c).
 *
 * Capture  — on every store change the current restorable slice is written into
 *            history.state for the active entry (+ mirrored to sessionStorage).
 * Restore  — when the route/entry changes (Back/Forward or hard refresh) the
 *            saved slice is read and the store is hydrated *before paint*
 *            (useLayoutEffect), so controlled elements render the user's last
 *            state instead of defaults. History stays intact because each entry
 *            keeps its own snapshot (replaceState on the current entry only).
 */
export function useRestorableState() {
  const location = useLocation();
  const routeKey = location.key; // unique per history entry
  const hydrate = useUiStore((s) => s.hydrate);
  const lastRouteKey = useRef<string | null>(null);

  // Restore before paint whenever we land on a (different) history entry.
  useLayoutEffect(() => {
    if (lastRouteKey.current === routeKey) return;
    lastRouteKey.current = routeKey;

    const saved = readSnapshot(routeKey);
    if (saved) {
      hydrate(saved);
    } else {
      // Fresh entry — reset to defaults so a new location starts clean.
      hydrate({});
    }
  }, [routeKey, hydrate]);

  // Capture: persist the restorable slice for this entry on every change.
  useEffect(() => {
    const persist = () => writeSnapshot(routeKey, useUiStore.getState().snapshot());
    persist(); // write current value immediately for this entry
    const unsub = useUiStore.subscribe(persist);
    return unsub;
  }, [routeKey]);
}
