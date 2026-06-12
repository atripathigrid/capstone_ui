// Twelve-factor style env access. The frontend only ever learns the API base
// URL — it has no database client or connection string (Requirement 5).
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "/api/v1",
  // When true the services layer resolves mock payloads instead of issuing a
  // network call, so the UI runs standalone without a backend present.
  USE_MOCKS: (import.meta.env.VITE_USE_MOCKS ?? "true") === "true",
} as const;
