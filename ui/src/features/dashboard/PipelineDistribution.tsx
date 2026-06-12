import { ElementState } from "@/components/ElementState";
import { ReloadButton } from "@/components/ReloadButton";
import { useCanvasChart } from "@/hooks/useCanvasChart";
import { drawPie } from "@/lib/charts";
import type { PipelineDistribution as Distribution } from "@/types";
import { usePipelineDistribution } from "./hooks";

function Pie({ slices }: { slices: number[] }) {
  const ref = useCanvasChart((canvas) => drawPie(canvas, slices), [slices]);
  return <canvas ref={ref} className="w-full h-full" id="pipelinePie" />;
}

function DistributionBody({ data }: { data: Distribution }) {
  return (
    <div className="flex items-center justify-around h-36">
      <div className="w-32 h-32 relative shrink-0">
        <Pie slices={data.slices.map((s) => s.pct)} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-lg font-bold">{data.dealCount}</span>
          <span className="text-[9px] text-on-surface-variant/50 font-bold uppercase tracking-wider">
            Deals
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-44">
        {data.slices.map((slice) => (
          <div key={slice.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: slice.swatch }}
              ></div>
              <span className="text-on-surface-variant">{slice.label}</span>
            </div>
            <span className="font-semibold text-secondary">{slice.legendPct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PipelineDistribution() {
  const query = usePipelineDistribution();

  return (
    <div className="intelligence-card p-5 rounded-lg flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-on-surface">Pipeline Distribution</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-on-surface-variant/40 tracking-wider">
            TOTAL: {query.data?.total ?? "—"}
          </span>
          <ReloadButton onReload={() => query.refetch()} busy={query.isFetching} />
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
        {(data) => <DistributionBody data={data} />}
      </ElementState>
    </div>
  );
}
