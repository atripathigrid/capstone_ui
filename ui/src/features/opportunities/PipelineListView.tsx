import { useNavigate } from "react-router-dom";
import { ElementState } from "@/components/ElementState";
import { ReloadButton } from "@/components/ReloadButton";
import { Icon } from "@/components/Icon";
import { ROUTES } from "@/config/routes";
import type { RegistryOpportunity } from "@/types";
import { useRegistry } from "./hooks";

function RegistryRow({ row }: { row: RegistryOpportunity }) {
  const navigate = useNavigate();
  const stageActive = row.active;

  if (stageActive) {
    return (
      <div
        onClick={() => navigate(ROUTES.opportunityDetail(row.opportunityId))}
        className="intelligence-card p-5 rounded-lg flex items-center justify-between cursor-pointer border border-white/5 hover:border-secondary/30 bg-[#141819] transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#1c2a2b] flex items-center justify-center font-bold text-secondary text-sm">
            {row.initials}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{row.name}</h4>
            <p className="text-xs text-on-surface-variant/60 mt-0.5">
              {row.account} • {row.owner}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <span className="text-xs text-on-surface-variant block">Deal Value</span>
            <span className="text-sm font-bold text-white mt-0.5">{row.valueLabel}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-on-surface-variant block">Stage</span>
            <span className="px-2 py-0.5 rounded bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider mt-1 inline-block">
              {row.stage}
            </span>
          </div>
          <Icon name="chevron_right" className="text-on-surface-variant/40" />
        </div>
      </div>
    );
  }

  return (
    <div className="intelligence-card p-5 rounded-lg flex items-center justify-between opacity-60 border border-white/5 bg-[#141819]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center font-bold text-secondary text-sm">
          {row.initials}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{row.name}</h4>
          <p className="text-xs text-on-surface-variant/60 mt-0.5">
            {row.account} • {row.owner}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="text-right">
          <span className="text-xs text-on-surface-variant block">Deal Value</span>
          <span className="text-sm font-bold text-white mt-0.5">{row.valueLabel}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-on-surface-variant block">Stage</span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-on-surface-variant text-[10px] font-bold uppercase tracking-wider mt-1 inline-block">
            {row.stage}
          </span>
        </div>
        <Icon name="chevron_right" className="text-on-surface-variant/40" />
      </div>
    </div>
  );
}

export function PipelineListView() {
  const query = useRegistry();

  return (
    <>
      <section className="mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">
            Active Portfolio
          </h2>
          <ReloadButton onReload={() => query.refetch()} busy={query.isFetching} />
        </div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Opportunities Registry</h1>
        <p className="text-xs text-on-surface-variant mt-1">
          Select an active deal ledger below to access deep AI synthesis and progression frameworks.
        </p>
      </section>

      <ElementState
        isLoading={query.isLoading}
        isError={query.isError}
        error={query.error}
        data={query.data}
        isEmpty={query.data?.length === 0}
        onRetry={() => query.refetch()}
        loadingClassName="h-40"
      >
        {(rows) => (
          <div className="space-y-3">
            {rows.map((row) => (
              <RegistryRow key={row.opportunityId} row={row} />
            ))}
          </div>
        )}
      </ElementState>
    </>
  );
}
