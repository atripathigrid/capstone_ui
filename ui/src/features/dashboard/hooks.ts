import { useQuery } from "@tanstack/react-query";
import {
  getCompetitiveIntel,
  getDashboardKpis,
  getIntelligenceSummary,
  getPipelineDistribution,
} from "@/services/dashboard.api";
import { useAuthStore } from "@/store/authStore";

// Each dashboard element owns its own per-element query key so one element's
// reload (4a) never remounts or refetches the others.

function useUserId(): string {
  return useAuthStore((s) => s.user?.id ?? "anon");
}

export function useIntelligenceSummary() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["dashboard", "summary", userId],
    queryFn: () => getIntelligenceSummary(userId),
  });
}

export function useDashboardKpis() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["dashboard", "kpis", userId],
    queryFn: () => getDashboardKpis(userId),
  });
}

export function usePipelineDistribution() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["dashboard", "distribution", userId],
    queryFn: () => getPipelineDistribution(userId),
  });
}

export function useCompetitiveIntel() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["dashboard", "competitive-intel", userId],
    queryFn: () => getCompetitiveIntel(userId),
  });
}
