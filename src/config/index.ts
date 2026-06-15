// Env access, feature flags and route constants.

export const ENV = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  useMockApi: (import.meta.env.VITE_USE_MOCK_API ?? 'true') === 'true',
};

export const ROUTES = {
  dashboard: '/dashboard',
  registry: '/registry',
  registrySkill: (id: string) => `/registry/${id}`,
  workflows: '/workflows',
  workflowDetail: (id: string) => `/workflows/${id}`,
  guardrails: '/guardrails',
} as const;
