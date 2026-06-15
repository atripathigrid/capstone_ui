import { ENV } from '@/config';
import { apiGet, ApiError } from './http';
import {
  MOCK_DASHBOARD,
  MOCK_GUARDRAILS,
  MOCK_SESSION,
  MOCK_SKILLS,
  MOCK_SKILL_PROFILES,
  MOCK_WORKFLOW_DETAILS,
  MOCK_WORKFLOWS,
} from './mockData';
import type {
  DashboardSummary,
  GuardrailConfig,
  SessionUser,
  SkillListItem,
  SkillProfile,
  WorkflowDetail,
  WorkflowRow,
} from '@/types';

/**
 * Endpoint functions per domain. Each maps to a FastAPI route in the plan
 * (api/v1/...). When VITE_USE_MOCK_API is true we resolve the documented mock
 * payload through a simulated network round-trip; otherwise we hit the live
 * backend. Either way the component contract is identical and there is never a
 * direct DB call from the browser.
 */
async function resolve<T>(path: string, mock: T, latencyMs = 220): Promise<T> {
  if (!ENV.useMockApi) {
    return apiGet<T>(path);
  }
  await new Promise((r) => setTimeout(r, latencyMs));
  // Deep clone so consumers can't mutate the shared fixture.
  return structuredClone(mock);
}

// --- session / RBAC -------------------------------------------------------
export const sessionApi = {
  /** GET /api/v1/auth/me — the session used to scope every other query. */
  me: () => resolve<SessionUser>('/v1/auth/me', MOCK_SESSION, 120),
};

// --- dashboard ------------------------------------------------------------
export const dashboardApi = {
  /** GET /api/v1/dashboard/summary?userId= */
  summary: (_userId: string) =>
    resolve<DashboardSummary>('/v1/dashboard/summary', MOCK_DASHBOARD),
};

// --- registry -------------------------------------------------------------
export const registryApi = {
  /** GET /api/v1/skills?userId= — lightweight projection (RBAC-scoped). */
  list: (_userId: string) => resolve<SkillListItem[]>('/v1/skills', MOCK_SKILLS),

  /** GET /api/v1/skills/{id} — full detail, loaded only on demand. */
  async profile(id: string): Promise<SkillProfile> {
    const profile = MOCK_SKILL_PROFILES[id];
    if (ENV.useMockApi && !profile) {
      throw new ApiError(`Skill not found: ${id}`, 404, 'SKILL_NOT_FOUND');
    }
    return resolve<SkillProfile>(`/v1/skills/${id}`, profile);
  },
};

// --- workflows ------------------------------------------------------------
export const workflowsApi = {
  /** GET /api/v1/workflows */
  list: () => resolve<WorkflowRow[]>('/v1/workflows', MOCK_WORKFLOWS),

  /** GET /api/v1/workflows/{id} */
  async detail(id: string): Promise<WorkflowDetail> {
    const detail = MOCK_WORKFLOW_DETAILS[id] ?? MOCK_WORKFLOW_DETAILS['wf-evo-0912-v2'];
    return resolve<WorkflowDetail>(`/v1/workflows/${id}`, detail, 160);
  },
};

// --- guardrails -----------------------------------------------------------
export const guardrailsApi = {
  /** GET /api/v1/guardrails */
  config: () => resolve<GuardrailConfig>('/v1/guardrails', MOCK_GUARDRAILS),
};
