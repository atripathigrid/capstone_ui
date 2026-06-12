import { type ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { getSession } from "@/services/auth.api";
import { useAuthStore } from "@/store/authStore";

// One QueryClient for the whole app. Server data restored instantly from this
// cache on Back/Forward so navigation never blank-flashes (Requirement 4c.4).
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function SessionGate({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);

  // Session/user data comes only through the API (never a direct DB read).
  useEffect(() => {
    let active = true;
    getSession().then((user) => {
      if (active) setUser(user);
    });
    return () => {
      active = false;
    };
  }, [setUser]);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SessionGate>{children}</SessionGate>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
