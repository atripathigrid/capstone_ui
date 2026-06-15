import { useSession } from '@/hooks/useSession';
import { useDashboardSummary } from '@/hooks/queries';
import { TopBarActions } from '@/app/layout/TopBarActions';
import { MobileHeader } from '@/app/layout/MobileHeader';
import { QueryState } from '@/components/QueryState';
import { ReloadButton } from '@/components/ReloadButton';
import { StatCard } from './components/StatCard';
import { LiveActivity } from './components/LiveActivity';
import { RecentEvolutions } from './components/RecentEvolutions';

/**
 * Dashboard container. Owns no raw fetching beyond scoping to the session user;
 * elements bind to fields of the summary query and render explicit
 * loading/error/data states (no silent defaults).
 */
export function DashboardView() {
  const { data: session } = useSession();
  const query = useDashboardSummary(session?.id);
  const { data, isLoading, isError, isFetching, refetch } = query;

  return (
    <>
      <MobileHeader icon="terminal" title="SALESINTEL" />
      <main className="px-container-margin space-y-gap-md max-w-full pt-2 bg-[#0d0f10]">
        <header>
          <TopBarActions />
        </header>

        <section className="space-y-1">
          <h2 className="text-[#ffffff]">Evolution Command Center</h2>
          <p className="font-body-md text-on-surface-variant flex items-center gap-xs">
            {data?.org ?? 'Grid Dynamics'} ·{' '}
            <span className="text-secondary/80">{data?.updatedAgo ?? 'Last updated 2 min ago'}</span>
            <ReloadButton onClick={() => refetch()} loading={isFetching} title="Reload dashboard" />
          </p>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-gap-md">
          <div className="xl:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-gap-sm">
            <QueryState
              isLoading={isLoading}
              isError={isError}
              data={data}
              onRetry={() => refetch()}
            >
              {(d) => (
                <>
                  {d.stats.map((stat) => (
                    <StatCard key={stat.key} stat={stat} />
                  ))}
                </>
              )}
            </QueryState>
          </div>

          <div className="xl:col-span-5 flex flex-col h-full">
            <div className="glass-card rounded-xl p-4 flex-1 flex flex-col max-h-[380px]">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <h3 className="text-[#ffffff]">Live Activity</h3>
                <ReloadButton onClick={() => refetch()} loading={isFetching} title="Reload activity" />
              </div>
              <QueryState
                isLoading={isLoading}
                isError={isError}
                data={data}
                onRetry={() => refetch()}
                compact
              >
                {(d) => <LiveActivity events={d.activity} />}
              </QueryState>
            </div>
          </div>
        </div>

        <section className="space-y-gap-sm pt-4">
          <div className="flex justify-between items-end px-1">
            <h3 className="text-[#ffffff]">Recent Evolutions</h3>
            <span className="text-secondary text-[10px] font-bold uppercase pointer hover:underline cursor-pointer">
              View All
            </span>
          </div>
          <QueryState
            isLoading={isLoading}
            isError={isError}
            data={data}
            onRetry={() => refetch()}
            compact
          >
            {(d) => <RecentEvolutions items={d.recent} />}
          </QueryState>
        </section>
      </main>
    </>
  );
}
