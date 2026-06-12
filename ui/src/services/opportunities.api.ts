import type { DealSummary, OpportunityDetail, RegistryOpportunity } from "@/types";
import { request } from "./http";

// Server-side filtered to the user's mapped opportunities (Requirement 6).
// "Fetch only what's needed": list endpoints return lightweight projections.

export function getYourDeals(userId: string): Promise<DealSummary[]> {
  return request<DealSummary[]>({
    path: `/opportunities/mine?userId=${userId}`,
    mock: () => [
      {
        opportunityId: "SPG-VISA",
        deal: "starlight",
        name: "Starlight Systems",
        initials: "SS",
        valueLabel: "$2,100,000",
        segment: "Enterprise AI",
        badge: "Action Required",
        badgeTone: "error",
        icon: "warning",
        note: "Slipping: zero stakeholder engagement in 9 days. High churn risk.",
        actionLabel: "Re-engage Now",
        primary: true,
        critical: true,
      },
      {
        opportunityId: "DP-CORE",
        deal: "datapulse",
        name: "DataPulse Inc.",
        initials: "DP",
        valueLabel: "$840,000",
        segment: "Platform Consolidation",
        badge: "Expiring Quote",
        badgeTone: "secondary",
        icon: "schedule",
        note: "Quote expires in 48 hours. Legal review pending signature.",
        actionLabel: "Follow Up",
        primary: true,
        critical: false,
      },
      {
        opportunityId: "NOVA-FLEET",
        deal: "nova",
        name: "Nova Robotics",
        initials: "NR",
        valueLabel: "$1,500,000",
        segment: "Autonomous Fleet Tech",
        badge: "Proposal Stage",
        badgeTone: "secondary",
        icon: "info",
        note: "Awaiting security questionnaire validation check from Infosec panel.",
        actionLabel: "View Scope",
        primary: false,
        critical: false,
      },
    ],
  });
}

export function getRegistry(userId: string): Promise<RegistryOpportunity[]> {
  return request<RegistryOpportunity[]>({
    path: `/opportunities?userId=${userId}`,
    mock: () => [
      {
        opportunityId: "SPG-VISA",
        name: "SPG-VISA",
        account: "Visa Global Accounts",
        owner: "Sarah Jenkins",
        initials: "SV",
        valueLabel: "$2.1M ARR",
        stage: "Proposal",
        active: true,
      },
      {
        opportunityId: "NOVA-FLEET",
        name: "Nova Robotics",
        account: "Autonomous Fleet",
        owner: "Kyle Reese",
        initials: "NR",
        valueLabel: "$1.5M ARR",
        stage: "Discovery",
        active: false,
      },
    ],
  });
}

// Full detail payload loads only when a specific opportunity_id route opens.
export function getOpportunityDetail(opportunityId: string): Promise<OpportunityDetail> {
  return request<OpportunityDetail>({
    path: `/opportunities/${opportunityId}`,
    mock: () => ({
      opportunityId: "SPG-VISA",
      valueLabel: "$2.1M ARR",
      account: "Visa Global Accounts",
      owner: "Sarah Jenkins",
    }),
  });
}
