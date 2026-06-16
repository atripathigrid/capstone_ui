import { env } from "@/config";
import type { ApiError } from "@/types";

/**
 * Typed fetch wrapper (plan Requirement 2/5: `services/http.ts`).
 * The frontend only ever reaches REST endpoints through this layer — it has no
 * DB client, connection string, or ORM.
 */
export async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${env.apiBaseUrl}${path}`, {
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
      ...init,
    });
  } catch {
    const err: ApiError = { code: "NETWORK", message: "Connection could not be established." };
    throw err;
  }

  if (!res.ok) {
    // Surface an explicit, typed error — never fall back to a placeholder value.
    const err: ApiError =
      res.status === 401
        ? { code: "INVALID_CREDENTIALS", message: "Invalid directory matching keys. Access denied." }
        : { code: "UNKNOWN", message: `Request failed (${res.status}).` };
    throw err;
  }

  return (await res.json()) as T;
}
