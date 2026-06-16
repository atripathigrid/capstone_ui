import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "@/app/layout/AppLayout";
import { LandingView } from "@/features/landing/LandingView";
import { PortalView } from "@/features/portal/PortalView";
import { RequireRole } from "@/features/portal/RequireRole";
import { ROUTES } from "@/config";

/**
 * Route tree (plan Requirement 2/4). All navigation uses the HTML5 History API
 * via React Router, so Back/Forward walk the in-app stack and only leave to an
 * external page once the SPA stack is exhausted.
 */
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.landing, element: <LandingView /> },
      {
        path: ROUTES.adminPortal,
        element: (
          <RequireRole role="admin">
            <PortalView title="Evolution Command Console" />
          </RequireRole>
        ),
      },
      {
        path: ROUTES.operatorPortal,
        element: (
          <RequireRole role="operator">
            <PortalView title="SalesIntel Workspace" />
          </RequireRole>
        ),
      },
      { path: "*", element: <Navigate to={ROUTES.landing} replace /> },
    ],
  },
]);
