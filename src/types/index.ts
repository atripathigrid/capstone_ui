/** Shared TS types / API DTO models (plan Requirement 2: `types/`). */

export type Role = "admin" | "operator";

export interface Session {
  username: string;
  role: Role;
  /** Authorized scope label shown in the UI. */
  scope: string;
  token: string;
}

export interface Credentials {
  username: string;
  password: string;
}

/** Normalized API error surfaced to the UI (no silent/garbage fallback). */
export interface ApiError {
  code: "INVALID_CREDENTIALS" | "NETWORK" | "UNKNOWN";
  message: string;
}
