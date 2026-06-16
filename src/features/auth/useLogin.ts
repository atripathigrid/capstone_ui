import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/services/auth.api";
import { useAuthStore } from "@/store/auth";
import { ROLE_HOME } from "@/config";
import type { ApiError, Credentials, Session } from "@/types";

/**
 * Login mutation (plan Requirement 5: every update flows
 * frontend → service layer → backend; no direct DB access, no garbage fallback).
 *
 * On success we persist the session and route the user to the home mapped to
 * their role (RBAC scope, Requirement 6). On failure we surface the typed error
 * to the form's error branch — we never substitute a placeholder session.
 */
export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  return useMutation<Session, ApiError, Credentials>({
    mutationFn: signIn,
    onSuccess: (session) => {
      setSession(session);
      navigate(ROLE_HOME[session.role] ?? "/", { replace: false });
    },
  });
}
