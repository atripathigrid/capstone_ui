import { ElementState } from "@/components/ElementState";
import { ReloadButton } from "@/components/ReloadButton";
import { DealRow } from "@/features/opportunities/DealRow";
import { useYourDeals } from "@/features/opportunities/hooks";
import { useUiStore } from "@/store/uiStore";

/**
 * Your Deals — the deal list plus the "Show All Active Deals" expansion. The
 * expansion is controlled state in the Zustand UI store (replacing the old
 * filterUserDeals/toggleAllDealsExpansion DOM toggling), so it is captured and
 * restored on Back/Forward (Requirement 4c).
 */
export function YourDeals() {
  const query = useYourDeals();
  const showingAllDeals = useUiStore((s) => s.showingAllDeals);
  const toggle = useUiStore((s) => s.toggleShowingAllDeals);

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold flex items-center gap-2 text-on-surface">
            Your Deals
            <span className="flex h-1.5 w-1.5 rounded-full bg-secondary"></span>
          </h3>
        </div>
        <ReloadButton onReload={() => query.refetch()} busy={query.isFetching} label="Reload deals" />
      </div>

      <ElementState
        isLoading={query.isLoading}
        isError={query.isError}
        error={query.error}
        data={query.data}
        isEmpty={query.data?.length === 0}
        onRetry={() => query.refetch()}
        loadingClassName="h-24"
      >
        {(deals) => {
          const visible = showingAllDeals ? deals : deals.filter((d) => d.primary);
          return (
            <>
              <div className="space-y-2 mb-4" id="user-deals-list">
                {visible.map((deal) => (
                  <DealRow key={deal.opportunityId} deal={deal} />
                ))}
              </div>
              <button
                onClick={toggle}
                className="mt-3 flex items-center gap-2 bg-surface-container/30 px-3 py-1.5 rounded border border-white/5 text-xs text-on-surface-variant hover:text-white hover:bg-surface-bright font-semibold transition-all"
              >
                <span>Show All Active Deals</span>
              </button>
            </>
          );
        }}
      </ElementState>
    </section>
  );
}
