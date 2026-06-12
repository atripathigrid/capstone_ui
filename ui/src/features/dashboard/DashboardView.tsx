import { IntelligenceSummary } from "./IntelligenceSummary";
import { KpiCards } from "./KpiCards";
import { YourDeals } from "./YourDeals";
import { PipelineDistribution } from "./PipelineDistribution";
import { CompetitiveIntel } from "./CompetitiveIntel";

/**
 * Dashboard container. Owns no raw fetching itself — it lays out the grid and
 * mounts each element, and every element owns its own data hook so they load,
 * error, and reload independently (Requirement 3).
 */
export function DashboardView() {
  return (
    <>
      <IntelligenceSummary />

      <div className="space-y-6">
        <KpiCards />
        <YourDeals />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PipelineDistribution />
          <CompetitiveIntel />
        </div>
      </div>
    </>
  );
}
