import { ElementState } from "@/components/ElementState";
import { ReloadButton } from "@/components/ReloadButton";
import { Icon } from "@/components/Icon";
import { useCanvasChart } from "@/hooks/useCanvasChart";
import { drawSparkline } from "@/lib/charts";
import type { DashboardKpis } from "@/types";
import { useDashboardKpis } from "./hooks";

function ForecastSparkline({ points }: { points: number[] }) {
  const ref = useCanvasChart((canvas) => drawSparkline(canvas, points, "#5ce0d0"), [points]);
  return (
    <div className="h-6 w-full mt-2">
      <canvas ref={ref} className="revenue-sparkline" />
    </div>
  );
}

function Kpis({ data }: { data: DashboardKpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Forecast vs Quota */}
      <div className="intelligence-card p-5 rounded-lg flex flex-col justify-between h-32">
        <div>
          <p className="text-xs text-on-surface-variant/60 font-medium">Forecast vs Quota</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold tracking-tight">{data.forecastVsQuota.value}</span>
            <span className="text-primary font-semibold text-xs flex items-center">
              <Icon name="arrow_upward" className="text-xs font-bold" />
              {data.forecastVsQuota.deltaLabel}
            </span>
          </div>
        </div>
        <ForecastSparkline points={data.forecastVsQuota.sparkline} />
      </div>

      {/* Total Pipeline */}
      <div className="intelligence-card p-5 rounded-lg flex flex-col justify-between h-32">
        <div>
          <p className="text-xs text-on-surface-variant/60 font-medium">Total Pipeline</p>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold tracking-tight text-secondary">
              {data.totalPipeline.value}
            </span>
          </div>
        </div>
        <div className="w-full mt-auto pb-1">
          <div className="h-1.5 bg-white/5 w-full rounded-full">
            <div
              className="bg-secondary/60 h-full rounded-full"
              style={{ width: `${data.totalPipeline.fillRatio * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Pending Strategy Tasks */}
      <div className="intelligence-card p-5 rounded-lg flex flex-col justify-between h-32">
        <div>
          <p className="text-xs text-on-surface-variant/60 font-medium">Pending Strategy Tasks</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold tracking-tight">
              {data.pendingStrategyTasks.activeLabel}
            </span>
            <span className="text-error font-semibold text-xs flex items-center">
              <Icon name="priority_high" className="text-xs font-bold" />
              {data.pendingStrategyTasks.overdueLabel}
            </span>
          </div>
        </div>
        <div className="flex gap-1 items-center h-4 mt-2">
          <span className="h-2 w-full rounded bg-error/40 block"></span>
          <span className="h-2 w-full rounded bg-warning/30 block"></span>
          <span className="h-2 w-full rounded bg-white/5 block"></span>
        </div>
      </div>

      {/* At-Risk Value */}
      <div className="intelligence-card p-5 rounded-lg flex flex-col justify-between h-32">
        <div>
          <p className="text-xs text-on-surface-variant/60 font-medium">At-Risk Value</p>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold tracking-tight text-error">
              {data.atRiskValue.value}
            </span>
          </div>
        </div>
        <div className="w-full mt-auto pb-1">
          <div className="h-1 bg-white/5 w-full rounded-full">
            <div
              className="bg-error h-full rounded-full"
              style={{ width: `${data.atRiskValue.fillRatio * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KpiCards() {
  const query = useDashboardKpis();

  return (
    <div className="relative">
      <div className="absolute -top-5 right-0 z-10">
        <ReloadButton onReload={() => query.refetch()} busy={query.isFetching} label="Reload KPIs" />
      </div>
      <ElementState
        isLoading={query.isLoading}
        isError={query.isError}
        error={query.error}
        data={query.data}
        onRetry={() => query.refetch()}
        loadingClassName="h-32"
      >
        {(data) => <Kpis data={data} />}
      </ElementState>
    </div>
  );
}
