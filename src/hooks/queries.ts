import { useQuery } from '@tanstack/react-query';
import { dashboardApi, guardrailsApi, registryApi, workflowsApi } from '@/services/api';

/**
 * Per-element React Query hooks. Each has its own query key so a single
 * element's reload (refetch) does not remount or refetch its siblings.
 * Manual reload always forces a network round-trip through the backend.
 */

export function useDashboardSummary(userId: string | undefined) {
  return useQuery({
    queryKey: ['dashboard', 'summary', userId],
    queryFn: () => dashboardApi.summary(userId as string),
    enabled: !!userId,
  });
}

export function useSkillList(userId: string | undefined) {
  return useQuery({
    queryKey: ['skills', userId],
    queryFn: () => registryApi.list(userId as string),
    enabled: !!userId,
  });
}

export function useSkillProfile(id: string | undefined) {
  return useQuery({
    queryKey: ['skills', 'profile', id],
    queryFn: () => registryApi.profile(id as string),
    enabled: !!id,
    retry: false,
  });
}

export function useWorkflows() {
  return useQuery({
    queryKey: ['workflows'],
    queryFn: workflowsApi.list,
  });
}

export function useWorkflowDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['workflows', 'detail', id],
    queryFn: () => workflowsApi.detail(id as string),
    enabled: !!id,
  });
}

export function useGuardrails() {
  return useQuery({
    queryKey: ['guardrails'],
    queryFn: guardrailsApi.config,
  });
}
