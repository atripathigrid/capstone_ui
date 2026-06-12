import type { ReactNode } from "react";
import { Icon } from "./Icon";

interface ElementStateProps<T> {
  /** React Query status flags for this element. */
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  data: T | undefined;
  /** Treat the data as empty (e.g. zero-length list). */
  isEmpty?: boolean;
  onRetry?: () => void;
  /** Render the success branch. */
  children: (data: T) => ReactNode;
  loadingClassName?: string;
}

/**
 * Renders the explicit loading / error / empty / data states every element
 * must show — no silent defaults or garbage fallbacks (Requirement 3 & 5). On
 * error it surfaces the typed message and offers retry (which re-runs 4a).
 */
export function ElementState<T>({
  isLoading,
  isError,
  error,
  data,
  isEmpty = false,
  onRetry,
  children,
  loadingClassName = "h-20",
}: ElementStateProps<T>) {
  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center text-on-surface-variant/40 ${loadingClassName}`}
      >
        <Icon name="progress_activity" className="animate-spin text-lg" />
      </div>
    );
  }

  if (isError) {
    const message =
      error instanceof Error ? error.message : "Something went wrong loading this element.";
    return (
      <div className="flex flex-col items-start gap-2 rounded-lg border border-error/20 bg-error/[0.03] p-4">
        <div className="flex items-center gap-2 text-error">
          <Icon name="error" className="text-base" />
          <span className="text-xs font-semibold">Unable to load</span>
        </div>
        <p className="text-[11px] leading-normal text-on-surface-variant/80">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 flex items-center gap-1.5 rounded border border-white/10 bg-surface-container px-2.5 py-1 text-[11px] font-bold text-secondary transition-all hover:bg-secondary hover:text-on-secondary"
          >
            <Icon name="refresh" className="text-sm" />
            Retry
          </button>
        )}
      </div>
    );
  }

  if (data === undefined || isEmpty) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-white/5 bg-surface-container/30 p-6 text-xs text-on-surface-variant/50">
        Nothing to show yet.
      </div>
    );
  }

  return <>{children(data)}</>;
}
