import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/config';
import { DashboardView } from '@/features/dashboard/DashboardView';
import { RegistryView } from '@/features/registry/RegistryView';
import { WorkflowsView } from '@/features/workflows/WorkflowsView';
import { GuardrailsView } from '@/features/guardrails/GuardrailsView';

/**
 * Route tree. Replaces the original imperative switchPage(). Route + meaningful
 * sub-state live in the URL (e.g. /registry/lead-routing-geo-industry,
 * /workflows/wf-ab-retail-exp) so each entry is a distinct, restorable location.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.dashboard} replace />} />
      <Route path={ROUTES.dashboard} element={<DashboardView />} />
      <Route path={ROUTES.registry} element={<RegistryView />} />
      <Route path="/registry/:skillId" element={<RegistryView />} />
      <Route path={ROUTES.workflows} element={<WorkflowsView />} />
      <Route path="/workflows/:workflowId" element={<WorkflowsView />} />
      <Route path={ROUTES.guardrails} element={<GuardrailsView />} />
      <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
    </Routes>
  );
}
