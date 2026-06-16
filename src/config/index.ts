/** Env access + route constants (plan Requirement 2: `config/`). */

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1",
  // Mock is on by default so the app runs with no .env / no backend.
  // Set VITE_USE_MOCK_API=0 to hit the real backend at VITE_API_BASE_URL.
  useMockApi: import.meta.env.VITE_USE_MOCK_API !== "0",
};

export const ROUTES = {
  landing: "/",
  adminPortal: "/portal/admin",
  operatorPortal: "/portal/operator",
} as const;

/** Where each role lands after a successful sign-in (ties into RBAC scope). */
export const ROLE_HOME: Record<string, string> = {
  admin: ROUTES.adminPortal,
  operator: ROUTES.operatorPortal,
};
