import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTE_PATTERNS } from "@/config/routes";
import { AppShell } from "./layout/AppShell";
import { DashboardView } from "@/features/dashboard/DashboardView";
import { PipelineListView } from "@/features/opportunities/PipelineListView";
import { OpportunityDetailView } from "@/features/opportunities/OpportunityDetailView";
import { ActivityView } from "@/features/activity/ActivityView";

/**
 * Route tree. All view switching goes through React Router (HTML5 History API),
 * so Dashboard -> Opportunities -> Deal Detail pushes real history entries and
 * the browser Back button walks the in-app stack, only leaving to an external
 * page once the stack is exhausted (Requirement 4b).
 */
export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path={ROUTE_PATTERNS.dashboard} element={<DashboardView />} />
        <Route path={ROUTE_PATTERNS.opportunities} element={<PipelineListView />} />
        <Route path={ROUTE_PATTERNS.opportunityDetail} element={<OpportunityDetailView />} />
        <Route path={ROUTE_PATTERNS.activity} element={<ActivityView />} />
        <Route path="*" element={<Navigate to={ROUTE_PATTERNS.dashboard} replace />} />
      </Route>
    </Routes>
  );
}
