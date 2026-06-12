import type { ActivityEntry } from "@/types";
import { request } from "./http";

// Backs the Activity audit ledger.
export function getActivity(userId: string): Promise<ActivityEntry[]> {
  return request<ActivityEntry[]>({
    path: `/activity?userId=${userId}`,
    mock: () => [
      {
        id: "act_1",
        tone: "secondary",
        tag: "Pipeline Change",
        description: "DataPulse Inc. escalated to Stage 4 (Negotiation)",
        ago: "2 hours ago",
      },
      {
        id: "act_2",
        tone: "error",
        tag: "Value At Risk",
        description: "Starlight Systems value adjustment decremented by $200k ARR",
        ago: "4 hours ago",
      },
    ],
  });
}
