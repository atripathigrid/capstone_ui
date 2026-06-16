import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { readSnapshot, storageKey, writeSnapshot } from "@/lib/history";
import { useUiStore } from "@/store/ui";

/**
 * Plan Requirement 4c — restore the user's modifications, not the default render.
 *
 * - Capture: whenever the restorable UI slice changes, serialize it into the
 *   current history entry (history.replaceState) and mirror it to sessionStorage.
 * - Restore: on mount and on every popstate (Back/Forward), read the snapshot
 *   for the resolved entry and hydrate the store BEFORE the view paints, so
 *   controlled elements render the user's last state instead of defaults.
 * - History intact: state is attached per entry, so each point in the journey
 *   keeps its own snapshot.
 */
export function useRestorableState(): void {
  const location = useLocation();
  const key = storageKey(location.pathname, location.search);

  const slice = useUiStore(
    useShallow((s) => ({
      authModalOpen: s.authModalOpen,
      activeCapabilityTab: s.activeCapabilityTab,
      usernameDraft: s.usernameDraft,
      passwordDraft: s.passwordDraft,
    })),
  );

  // Restore on entry + on Back/Forward.
  useEffect(() => {
    const restore = () => {
      const snapshot = readSnapshot<typeof slice>(key);
      if (snapshot) useUiStore.getState().hydrate(snapshot);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
    // key changes on navigation; re-bind restore for the new entry.
  }, [key]);

  // Capture on every change of the restorable slice.
  useEffect(() => {
    writeSnapshot(key, slice);
  }, [key, slice]);
}
