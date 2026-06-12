// History (de)serialization helpers for the Back-button state restore
// mechanism (Requirement 4c). Restorable UI state is written into
// history.state per entry and mirrored to sessionStorage as a durable backup.

const SESSION_PREFIX = "salesintel:restore:";

export interface RestorableSnapshot {
  [key: string]: unknown;
}

/** Build the per-route storage key (route + meaningful sub-state). */
export function snapshotKey(routeKey: string): string {
  return `${SESSION_PREFIX}${routeKey}`;
}

/**
 * Persist a snapshot for the current history entry: attach it to history.state
 * (so Back/Forward restores it without a refetch) and mirror to sessionStorage
 * (so a hard refresh of the same entry still rehydrates).
 */
export function writeSnapshot(routeKey: string, snapshot: RestorableSnapshot): void {
  const existing = (window.history.state as Record<string, unknown> | null) ?? {};
  const next = {
    ...existing,
    __salesintel: {
      ...(existing.__salesintel as Record<string, unknown> | undefined),
      [routeKey]: snapshot,
    },
  };
  window.history.replaceState(next, "");
  try {
    sessionStorage.setItem(snapshotKey(routeKey), JSON.stringify(snapshot));
  } catch {
    // sessionStorage may be unavailable (private mode quota) — non-fatal.
  }
}

/**
 * Read the snapshot for a route entry: prefer history.state (the per-entry
 * snapshot) and fall back to sessionStorage (durable backup after refresh).
 */
export function readSnapshot(routeKey: string): RestorableSnapshot | null {
  const state = window.history.state as Record<string, unknown> | null;
  const fromHistory = (
    state?.__salesintel as Record<string, RestorableSnapshot> | undefined
  )?.[routeKey];
  if (fromHistory) return fromHistory;

  try {
    const raw = sessionStorage.getItem(snapshotKey(routeKey));
    return raw ? (JSON.parse(raw) as RestorableSnapshot) : null;
  } catch {
    return null;
  }
}
