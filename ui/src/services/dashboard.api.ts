import type {
  CompetitiveIntel,
  DashboardKpis,
  IntelligenceSummary,
  PipelineDistribution,
} from "@/types";
import { request } from "./http";

// Each dashboard element owns one endpoint so it can load/error/reload alone.

export function getIntelligenceSummary(userId: string): Promise<IntelligenceSummary> {
  return request<IntelligenceSummary>({
    path: `/dashboard/summary?userId=${userId}`,
    mock: () => ({
      greetingName: "SK",
      forecastDelta: "+$340K",
      atRiskAccount: "Starlight Systems",
      atRiskValue: "$2.1M",
    }),
  });
}

export function getDashboardKpis(userId: string): Promise<DashboardKpis> {
  return request<DashboardKpis>({
    path: `/dashboard/kpis?userId=${userId}`,
    mock: () => ({
      forecastVsQuota: {
        value: "112%",
        deltaLabel: "4%",
        sparkline: [12, 14, 11, 19, 23, 20, 28, 25, 34, 30, 38],
      },
      totalPipeline: { value: "$8.4M", fillRatio: 2 / 3 },
      pendingStrategyTasks: { activeLabel: "9 Active", overdueLabel: "3 Overdue" },
      atRiskValue: { value: "$1.2M", fillRatio: 1 / 4 },
    }),
  });
}

export function getPipelineDistribution(userId: string): Promise<PipelineDistribution> {
  return request<PipelineDistribution>({
    path: `/dashboard/distribution?userId=${userId}`,
    mock: () => ({
      total: "$8.4M",
      dealCount: 29,
      slices: [
        { label: "Discovery", pct: 0.48, legendPct: "48%", swatch: "rgba(92,224,208,0.3)" },
        { label: "Solutioning", pct: 0.28, legendPct: "28%", swatch: "rgba(92,224,208,0.5)" },
        { label: "Proposal", pct: 0.17, legendPct: "17%", swatch: "rgba(92,224,208,0.7)" },
        { label: "Negotiation", pct: 0.07, legendPct: "7%", swatch: "rgba(92,224,208,1)" },
      ],
    }),
  });
}

export function getCompetitiveIntel(userId: string): Promise<CompetitiveIntel> {
  return request<CompetitiveIntel>({
    path: `/dashboard/competitive-intel?userId=${userId}`,
    mock: () => ({
      items: [
        {
          competitor: "CloudScale",
          ago: "12m ago",
          note: "Launched 'Enterprise Pro' tier with baked-in SOC2 compliance. Targeting our Fortune 500 prospects.",
        },
        {
          competitor: "Vortex AI",
          ago: "1h ago",
          note: "Announced strategic partnership with Microsoft Azure for priority GPU access.",
        },
      ],
      ticker: [
        { tone: "error", text: "COMP: CLOUDSCALE -12% Win Rate" },
        { tone: "secondary", text: "COMP: VORTEX +5% Market Share" },
      ],
    }),
  });
}
