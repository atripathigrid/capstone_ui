import { ElementState } from "@/components/ElementState";
import { ReloadButton } from "@/components/ReloadButton";
import { useActivity } from "./hooks";

export function ActivityView() {
  const query = useActivity();

  return (
    <>
      <section className="mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">
            Audit Ledger
          </h2>
          <ReloadButton onReload={() => query.refetch()} busy={query.isFetching} />
        </div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">
          System Historic Activity Log
        </h1>
      </section>

      <ElementState
        isLoading={query.isLoading}
        isError={query.isError}
        error={query.error}
        data={query.data}
        isEmpty={query.data?.length === 0}
        onRetry={() => query.refetch()}
        loadingClassName="h-32"
      >
        {(entries) => (
          <div className="intelligence-card rounded-lg divide-y divide-white/5">
            {entries.map((entry) => (
              <div key={entry.id} className="p-4 flex justify-between items-center">
                <div>
                  <span
                    className={
                      entry.tone === "error"
                        ? "text-[10px] font-bold bg-error/10 text-error px-2 py-0.5 rounded tracking-wide uppercase"
                        : "text-[10px] font-bold bg-secondary/10 text-secondary px-2 py-0.5 rounded tracking-wide uppercase"
                    }
                  >
                    {entry.tag}
                  </span>
                  <p className="text-xs font-semibold text-on-surface mt-1">{entry.description}</p>
                </div>
                <span className="text-xs text-on-surface-variant/50">{entry.ago}</span>
              </div>
            ))}
          </div>
        )}
      </ElementState>
    </>
  );
}
