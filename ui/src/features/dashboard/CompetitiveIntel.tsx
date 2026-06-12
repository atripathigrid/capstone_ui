import { ElementState } from "@/components/ElementState";
import { ReloadButton } from "@/components/ReloadButton";
import { Icon } from "@/components/Icon";
import type { CompetitiveIntel as Intel } from "@/types";
import { useCompetitiveIntel } from "./hooks";

function IntelBody({ data }: { data: Intel }) {
  return (
    <div className="space-y-2.5">
      {data.items.map((item) => (
        <div
          key={item.competitor}
          className="p-2.5 rounded bg-surface-container/40 border-l-2 border-secondary"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wide">
              {item.competitor}
            </span>
            <span className="text-[9px] text-on-surface-variant/50 font-medium">{item.ago}</span>
          </div>
          <p className="text-xs text-on-surface-variant/90 leading-normal">{item.note}</p>
        </div>
      ))}
      <div className="bg-surface-container rounded px-3 py-1.5 flex items-center gap-3 overflow-hidden whitespace-nowrap border border-white/[0.02]">
        <span className="text-[9px] font-bold text-on-surface-variant/40 tracking-wider">
          MARKET TICKER:
        </span>
        <div className="flex gap-4 animate-pulse text-[10px] font-medium">
          {data.ticker.map((t, i) => (
            <span key={i} className={t.tone === "error" ? "text-error" : "text-secondary"}>
              {t.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CompetitiveIntel() {
  const query = useCompetitiveIntel();

  return (
    <div className="intelligence-card p-5 rounded-lg flex flex-col justify-between">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-on-surface">Competitive Intelligence</h3>
        <div className="flex items-center gap-2">
          <ReloadButton onReload={() => query.refetch()} busy={query.isFetching} />
          <Icon name="unfold_more" className="text-secondary text-lg" />
        </div>
      </div>
      <ElementState
        isLoading={query.isLoading}
        isError={query.isError}
        error={query.error}
        data={query.data}
        onRetry={() => query.refetch()}
        loadingClassName="h-36"
      >
        {(data) => <IntelBody data={data} />}
      </ElementState>
    </div>
  );
}
