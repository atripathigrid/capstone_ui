import { Icon } from "./Icon";

interface ReloadButtonProps {
  onReload: () => void;
  busy?: boolean;
  label?: string;
}

/**
 * Per-element reload affordance (Requirement 4a). Calls that element's own
 * query refetch() — forces a network round-trip through the backend, never a
 * cache-only or hard-coded value. Sized to sit unobtrusively on a card header.
 */
export function ReloadButton({ onReload, busy = false, label = "Reload" }: ReloadButtonProps) {
  return (
    <button
      type="button"
      onClick={onReload}
      disabled={busy}
      title={label}
      aria-label={label}
      className="text-on-surface-variant/40 hover:text-secondary transition-colors disabled:opacity-50"
    >
      <Icon name="refresh" className={`text-sm ${busy ? "animate-spin" : ""}`} />
    </button>
  );
}
