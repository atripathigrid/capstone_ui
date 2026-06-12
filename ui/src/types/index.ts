// Shared API DTO models — mirror the backend Pydantic schemas described in the
// plan. The frontend speaks only in these typed shapes.

export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
  initials: string;
  role: string;
}

export interface IntelligenceSummary {
  greetingName: string;
  forecastDelta: string; // e.g. "+$340K"
  atRiskAccount: string; // e.g. "Starlight Systems"
  atRiskValue: string; // e.g. "$2.1M"
}

export interface KpiSparkPoint {
  value: number;
}

export interface DashboardKpis {
  forecastVsQuota: {
    value: string;
    deltaLabel: string;
    sparkline: number[];
  };
  totalPipeline: {
    value: string;
    fillRatio: number; // 0..1
  };
  pendingStrategyTasks: {
    activeLabel: string;
    overdueLabel: string;
  };
  atRiskValue: {
    value: string;
    fillRatio: number; // 0..1
  };
}

export type DealStatusTone = "error" | "secondary";

export interface DealSummary {
  opportunityId: string;
  deal: string; // data-deal key, e.g. "starlight"
  name: string;
  initials: string;
  valueLabel: string;
  segment: string;
  badge: string;
  badgeTone: DealStatusTone;
  icon: string;
  note: string;
  actionLabel: string;
  /** Whether this row is part of the default (collapsed) Your-Deals view. */
  primary: boolean;
  critical: boolean;
}

export interface PipelineDistributionSlice {
  label: string;
  pct: number; // 0..1 used for both legend and pie
  legendPct: string;
  swatch: string; // rgba/hex for the legend dot
}

export interface PipelineDistribution {
  total: string;
  dealCount: number;
  slices: PipelineDistributionSlice[];
}

export interface CompetitiveIntelItem {
  competitor: string;
  ago: string;
  note: string;
}

export interface CompetitiveIntel {
  items: CompetitiveIntelItem[];
  ticker: { tone: DealStatusTone; text: string }[];
}

export interface RegistryOpportunity {
  opportunityId: string;
  name: string;
  account: string;
  owner: string;
  initials: string;
  valueLabel: string;
  stage: string;
  active: boolean;
}

export interface OpportunityDetail {
  opportunityId: string;
  valueLabel: string;
  account: string;
  owner: string;
}

export interface ActivityEntry {
  id: string;
  tone: DealStatusTone;
  tag: string;
  description: string;
  ago: string;
}

export type ApiResult<T> = T;
