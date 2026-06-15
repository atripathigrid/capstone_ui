import type { ReactNode } from 'react';
import { Icon } from './Icon';

interface QueryStateProps<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
  onRetry?: () => void;
  isEmpty?: (data: T) => boolean;
  children: (data: T) => ReactNode;
  /** Compact inline variant for small elements. */
  compact?: boolean;
}

/**
 * Element-level loading / error / empty / data states (Requirement 3 & 5).
 * On a tool/backend failure the element shows an explicit error — never a
 * silent default or garbage value — and offers retry (the per-element reload).
 */
export function QueryState<T>({
  isLoading,
  isError,
  data,
  onRetry,
  isEmpty,
  children,
  compact = false,
}: QueryStateProps<T>) {
  const pad = compact ? 'py-6' : 'py-12';

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${pad} text-on-surface-variant`}>
        <Icon name="progress_activity" className="animate-spin text-xl" />
      </div>
    );
  }

  if (isError || data === undefined) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${pad} text-center`}>
        <Icon name="error" className="text-error text-xl" />
        <p className="text-xs text-on-surface-variant">Failed to load — the tool layer returned an error.</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 px-3 py-1 text-[11px] font-bold text-secondary bg-secondary/10 border border-secondary/20 rounded-lg hover:bg-secondary/20"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (isEmpty?.(data)) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${pad} text-center text-on-surface-variant`}>
        <Icon name="inbox" className="text-xl opacity-50" />
        <p className="text-xs">Nothing here yet.</p>
      </div>
    );
  }

  return <>{children(data)}</>;
}
