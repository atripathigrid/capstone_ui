import { Icon } from './Icon';

interface ReloadButtonProps {
  onClick: () => void;
  loading?: boolean;
  title?: string;
}

/**
 * Per-element reload affordance (Requirement 4a). Calls the element's own
 * query.refetch(); because query keys are per-element, reloading one element
 * does not remount or refetch the others.
 */
export function ReloadButton({ onClick, loading = false, title = 'Reload' }: ReloadButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className="text-on-surface-variant hover:text-secondary transition-colors"
    >
      <Icon name="refresh" className={`text-base ${loading ? 'animate-spin' : ''}`} />
    </button>
  );
}
