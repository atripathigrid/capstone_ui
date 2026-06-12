import { ElementState } from "@/components/ElementState";
import { ReloadButton } from "@/components/ReloadButton";
import { useIntelligenceSummary } from "./hooks";

export function IntelligenceSummary() {
  const query = useIntelligenceSummary();

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-1.5">
        <h2 className="text-[11px] font-bold text-secondary uppercase tracking-widest">
          Intelligence Summary
        </h2>
        <ReloadButton onReload={() => query.refetch()} busy={query.isFetching} />
      </div>
      <ElementState
        isLoading={query.isLoading}
        isError={query.isError}
        error={query.error}
        data={query.data}
        onRetry={() => query.refetch()}
        loadingClassName="h-16"
      >
        {(data) => (
          <p className="text-2xl font-bold leading-snug max-w-3xl text-on-surface">
            Good morning {data.greetingName} — your forecast is{" "}
            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold text-xl mx-0.5">
              {data.forecastDelta}
            </span>{" "}
            ahead of quota, but {data.atRiskAccount}{" "}
            <span className="text-error font-semibold mx-0.5">({data.atRiskValue})</span> is slipping.
          </p>
        )}
      </ElementState>
    </section>
  );
}
