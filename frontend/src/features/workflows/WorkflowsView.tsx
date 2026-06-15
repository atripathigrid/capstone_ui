import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/config';
import { TopBarActions } from '@/app/layout/TopBarActions';
import { MobileHeader } from '@/app/layout/MobileHeader';
import { QueryState } from '@/components/QueryState';
import { ReloadButton } from '@/components/ReloadButton';
import { useWorkflows, useWorkflowDetail } from '@/hooks/queries';
import { useUiStore } from '@/store/uiStore';
import { WorkflowTable } from './components/WorkflowTable';
import { WorkflowDetailAside } from './components/WorkflowDetailAside';

export function WorkflowsView() {
  const navigate = useNavigate();
  const { workflowId } = useParams();
  const selectedId = useUiStore((s) => s.selectedWorkflowId);
  const setSelectedId = useUiStore((s) => s.setSelectedWorkflowId);

  const effectiveId = workflowId ?? selectedId;

  // Keep the store in sync with the URL so Back/Forward restore the selection.
  useEffect(() => {
    if (workflowId && workflowId !== selectedId) {
      setSelectedId(workflowId);
    }
  }, [workflowId, selectedId, setSelectedId]);

  const listQuery = useWorkflows();
  const detailQuery = useWorkflowDetail(effectiveId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    navigate(ROUTES.workflowDetail(id));
  };

  return (
    <>
      <header className="bg-[#0d0f10]/95 px-8 flex flex-col gap-4 shrink-0 py-4">
        <TopBarActions />
      </header>
      <MobileHeader icon="account_tree" title="Workflows" />

      <main className="flex-1 min-h-screen bg-[#0d0f10] relative flex flex-col md:flex-row overflow-hidden">
        <section className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-[#0d0f10]">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-on-surface mb-1">Temporal Workflows</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="font-label-sm text-label-sm text-on-surface">8 Active</span>
                </div>
                <span className="text-white/10 text-xs">|</span>
                <span className="font-label-sm text-label-sm" style={{ color: 'rgb(168, 208, 141)' }}>
                  142 completed
                </span>
                <span className="text-white/10 text-xs">|</span>
                <span className="font-label-sm text-label-sm text-error">1 failure today</span>
              </div>
            </div>
            <ReloadButton
              onClick={() => listQuery.refetch()}
              loading={listQuery.isFetching}
              title="Reload workflows"
            />
          </div>

          <QueryState
            isLoading={listQuery.isLoading}
            isError={listQuery.isError}
            data={listQuery.data}
            onRetry={() => listQuery.refetch()}
            isEmpty={(d) => d.length === 0}
          >
            {(rows) => <WorkflowTable rows={rows} onSelect={handleSelect} />}
          </QueryState>
        </section>

        <QueryState
          isLoading={detailQuery.isLoading}
          isError={detailQuery.isError}
          data={detailQuery.data}
          onRetry={() => detailQuery.refetch()}
          compact
        >
          {(detail) => <WorkflowDetailAside detail={detail} />}
        </QueryState>
      </main>
    </>
  );
}
