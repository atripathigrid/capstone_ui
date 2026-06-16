import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import type { Role } from "@/types";
import { ROUTES } from "@/config";

/**
 * Client-side route guard. Real authorization is enforced server-side per the
 * plan (RBAC, Requirement 6); this only keeps the SPA from rendering a portal
 * the current session isn't scoped to.
 */
export function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const session = useAuthStore((s) => s.session);

  if (!session) return <Navigate to={ROUTES.landing} replace />;
  if (session.role !== role) return <Navigate to={ROUTES.landing} replace />;

  return <>{children}</>;
}
