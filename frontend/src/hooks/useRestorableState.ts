import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useUiStore } from '@/store/uiStore';

const STORAGE_PREFIX = 'evoforge:ui:';

/**
 * Requirement 4c — restore the user's modifications, not the default render.
 *
 * Capture : on each navigation the current UI slice is serialized and written
 *           into history.state (history.replaceState) keyed by route, and
 *           mirrored to sessionStorage as a durable backup for hard refreshes.
 * Restore : on a popstate (Back/Forward) the saved slice for the target route
 *           is read back and hydrated into the Zustand store *before paint*
 *           (useLayoutEffect) so elements render the user's last state.
 * Intact  : because each entry carries its own snapshot, walking Back replays
 *           each point's saved modifications in order.
 */
export function useRestorableState() {
  const location = useLocation();
  const routeKey = location.pathname;
  const hydratedFor = useRef<string | null>(null);

  // Restore before paint when the route key changes (initial load + popstate).
  useLayoutEffect(() => {
    if (hydratedFor.current === routeKey) return;
    hydratedFor.current = routeKey;

    const fromHistory = (window.history.state?.evoUi ?? null) as Record<string, unknown> | null;
    let slice = fromHistory;
    if (!slice) {
      try {
        const raw = sessionStorage.getItem(STORAGE_PREFIX + routeKey);
        slice = raw ? JSON.parse(raw) : null;
      } catch {
        slice = null;
      }
    }
    if (slice) {
      useUiStore.getState().hydrate(slice);
    }
  }, [routeKey]);

  // Capture: persist the slice into the current history entry + sessionStorage
  // whenever the restorable UI state changes.
  useEffect(() => {
    const persist = () => {
      const snapshot = useUiStore.getState().snapshot();
      try {
        window.history.replaceState(
          { ...window.history.state, evoUi: snapshot },
          '',
        );
        sessionStorage.setItem(STORAGE_PREFIX + routeKey, JSON.stringify(snapshot));
      } catch {
        /* storage may be unavailable; history.state still holds the snapshot */
      }
    };

    persist();
    const unsub = useUiStore.subscribe(persist);
    return unsub;
  }, [routeKey]);
}
