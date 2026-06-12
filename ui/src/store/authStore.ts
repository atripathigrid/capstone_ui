import { create } from "zustand";
import type { SessionUser } from "@/types";

// Session/auth store. The Dashboard and every query read the current user from
// here to scope requests (ties into RBAC, Requirement 6).
interface AuthState {
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
