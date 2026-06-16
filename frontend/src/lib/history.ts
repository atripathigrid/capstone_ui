/**
 * Pure helpers for serializing restorable UI state into history.state and a
 * sessionStorage mirror (plan Requirement 4c).
 */

const PREFIX = "evoforge:restore:";

export function storageKey(pathname: string, search: string): string {
  return `${PREFIX}${pathname}${search}`;
}

export function readSnapshot<T>(key: string): T | undefined {
  // history.state holds the per-entry snapshot; sessionStorage is the durable
  // backup used after a hard refresh of that entry.
  const fromHistory = (window.history.state ?? {}) as Record<string, unknown>;
  if (fromHistory.__ui !== undefined) return fromHistory.__ui as T;

  const raw = sessionStorage.getItem(key);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export function writeSnapshot<T>(key: string, snapshot: T): void {
  const current = (window.history.state ?? {}) as Record<string, unknown>;
  // Attach to the current entry without clobbering router-owned state.
  window.history.replaceState({ ...current, __ui: snapshot }, "");
  try {
    sessionStorage.setItem(key, JSON.stringify(snapshot));
  } catch {
    /* sessionStorage may be unavailable (private mode); history.state still works */
  }
}
