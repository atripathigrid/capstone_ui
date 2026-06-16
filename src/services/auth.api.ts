import { env } from "@/config";
import { request } from "@/services/http";
import type { ApiError, Credentials, Session } from "@/types";

/**
 * Auth endpoint functions (plan Requirement 2: `services/<domain>.api.ts`).
 *
 * In a real deployment this calls FastAPI, which validates the request, checks
 * RBAC, delegates to a service + tool layer, and only the repository touches the
 * DB. With VITE_USE_MOCK_API=1 we resolve against an in-memory stand-in so the
 * UI is runnable without a backend — but the call shape is identical, so wiring
 * a real backend later is a one-line switch.
 */

const MOCK_DIRECTORY: Record<string, Omit<Session, "token">> = {
  admin: { username: "admin", role: "admin", scope: "RevOps Admin" },
  operator: { username: "user", role: "operator", scope: "Operator Terminal" },
};

async function mockSignIn({ username, password }: Credentials): Promise<Session> {
  await new Promise((r) => setTimeout(r, 400)); // simulate round-trip latency

  const matchAdmin = username === "admin" && password === "admin";
  const matchUser = username === "user" && password === "user";

  if (matchAdmin) return { ...MOCK_DIRECTORY.admin, token: "mock-admin-token" };
  if (matchUser) return { ...MOCK_DIRECTORY.operator, token: "mock-operator-token" };

  const err: ApiError = {
    code: "INVALID_CREDENTIALS",
    message: "Invalid directory matching keys. Access denied.",
  };
  throw err;
}

export function signIn(credentials: Credentials): Promise<Session> {
  if (env.useMockApi) return mockSignIn(credentials);
  return request<Session>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
