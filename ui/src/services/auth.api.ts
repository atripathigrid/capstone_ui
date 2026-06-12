import type { SessionUser } from "@/types";
import { request } from "./http";

// Session/user data is fetched only through the API (never a direct DB read).
// Backs the sidebar user footer; ties into RBAC scoping (Requirement 6).
export function getSession(): Promise<SessionUser> {
  return request<SessionUser>({
    path: "/auth/session",
    mock: () => ({
      id: "u_sk",
      email: "sk@salesintel.io",
      displayName: "SK Executive",
      initials: "SK",
      role: "Admin",
    }),
    mockDelay: 150,
  });
}
