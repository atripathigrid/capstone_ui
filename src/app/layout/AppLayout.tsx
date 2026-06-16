import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/app/layout/SiteHeader";
import { SiteFooter } from "@/app/layout/SiteFooter";
import { AuthModal } from "@/features/auth/AuthModal";
import { useRestorableState } from "@/hooks/useRestorableState";

/**
 * App shell: sticky header, routed content, footer, and the globally-mounted
 * auth modal. useRestorableState runs here so every route captures/restores its
 * own UI snapshot (plan Requirement 4).
 */
export function AppLayout() {
  useRestorableState();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <AuthModal />
    </>
  );
}
