import { create } from "zustand";
import type { Session } from "@/types";

/** Auth/session store (plan Requirement 2: `store/`). */
interface AuthState {
  session: Session | null;
  setSession: (session: Session) => void;
  clear: () => void;
}

const SESSION_KEY = "evoforge:session";

function loadSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  session: loadSession(),
  setSession: (session) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    set({ session });
  },
  clear: () => {
    sessionStorage.removeItem(SESSION_KEY);
    set({ session: null });
  },
}));
