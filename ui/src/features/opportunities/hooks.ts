import { useQuery } from "@tanstack/react-query";
import {
  getOpportunityDetail,
  getRegistry,
  getYourDeals,
} from "@/services/opportunities.api";
import { useAuthStore } from "@/store/authStore";

function useUserId(): string {
  return useAuthStore((s) => s.user?.id ?? "anon");
}

// Server-filtered to the user's mapped deals (RBAC, Requirement 6).
export function useYourDeals() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["opportunities", "mine", userId],
    queryFn: () => getYourDeals(userId),
  });
}

export function useRegistry() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["opportunities", "registry", userId],
    queryFn: () => getRegistry(userId),
  });
}

// Full detail loads only when a specific opportunity route opens.
export function useOpportunityDetail(opportunityId: string) {
  return useQuery({
    queryKey: ["opportunities", "detail", opportunityId],
    queryFn: () => getOpportunityDetail(opportunityId),
    enabled: Boolean(opportunityId),
  });
}
