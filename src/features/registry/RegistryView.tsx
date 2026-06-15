import { useEffect } from 'react';
import { useNavigate, useNavigationType, useParams } from 'react-router-dom';
import { ROUTES } from '@/config';
import { Icon } from '@/components/Icon';
import { QueryState } from '@/components/QueryState';
import { ReloadButton } from '@/components/ReloadButton';
import { TopBarActions } from '@/app/layout/TopBarActions';
import { useSession } from '@/hooks/useSession';
import { useSkillList, useSkillProfile } from '@/hooks/queries';
import { useUiStore } from '@/store/uiStore';
import { SkillList } from './components/SkillList';
import { RegistryTabs } from './components/RegistryTabs';
import { OverviewPanel } from './components/OverviewPanel';
import { CodePanel } from './components/CodePanel';
import { HistoryPanel } from './components/HistoryPanel';
import { DependenciesPanel } from './components/DependenciesPanel';

function ListBanner() {
  const approvalFilter = useUiStore((s) => s.registryApprovalFilter);
  const toggle = useUiStore((s) => s.toggleRegistryApprovalFilter);

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Skill Directory</h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Manage, audit, and investigate historical pipeline automation modules.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          className="px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
          onClick={() => alert('Context Relationship Graph initialized.')}
        >
          <Icon name="hub" className="text-base" />
          Context Graph
        </button>
        <button
          className={`px-4 py-2 border border-secondary/20 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 ${
            approvalFilter ? 'bg-secondary text-on-secondary' : 'bg-secondary/10 text-secondary'
          }`}
          onClick={toggle}
        >
          <Icon name="verified_user" className="text-base" />
          Awaiting Admin Approval{' '}
          <span className="ml-1 text-[11px] text-[#fdb66e] font-mono font-bold">(2)</span>
        </button>
      </div>
    </div>
  );
}

function ProfileBanner({ title, subtitle }: { title: string; subtitle: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">{title}</h1>
        <p className="text-sm text-on-surface-variant mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          className="px-4 py-2 bg-secondary/10 text-secondary font-bold text-body-md rounded-lg border border-secondary/30 hover:bg-secondary/20 transition-colors flex items-center gap-2"
          onClick={() => navigate(ROUTES.registry)}
        >
          <Icon name="arrow_back" className="text-lg" />
          Back to Skills List
        </button>
        <button className="px-4 py-2 bg-error-container/20 text-error font-bold text-body-md rounded-xl border border-error/20 hover:bg-error-container/30 transition-colors flex items-center gap-2">
          <Icon name="history" className="text-lg" />
          Rollback
        </button>
      </div>
    </div>
  );
}

export function RegistryView() {
  const { skillId } = useParams();
  const navigationType = useNavigationType();
  const { data: session } = useSession();
  const listQuery = useSkillList(session?.id);
  const profileQuery = useSkillProfile(skillId);
  const activeTab = useUiStore((s) => s.registryActiveTab);
  const setActiveTab = useUiStore((s) => s.setRegistryActiveTab);

  // Opening a profile from the list (a PUSH) starts on Overview, matching the
  // original loadSkillProfile(); a Back/Forward (POP) restores the saved tab.
  useEffect(() => {
    if (skillId && navigationType === 'PUSH') {
      setActiveTab('overview');
    }
  }, [skillId, navigationType, setActiveTab]);

  const profileMode = !!skillId;

  return (
    <>
      <header className="bg-[#0d0f10]/95 border-b border-white/5 px-8 flex flex-col gap-4 shrink-0 py-4">
        <TopBarActions />
        {profileMode ? (
          <QueryState
            isLoading={profileQuery.isLoading}
            isError={profileQuery.isError}
            data={profileQuery.data}
            onRetry={() => profileQuery.refetch()}
            compact
          >
            {(p) => <ProfileBanner title={p.title} subtitle={p.subtitle} />}
          </QueryState>
        ) : (
          <ListBanner />
        )}
        {profileMode && <RegistryTabs />}
      </header>

      <main className="px-container-margin space-y-gap-md max-w-full pt-4 bg-[#0d0f10]">
        {profileMode ? (
          <QueryState
            isLoading={profileQuery.isLoading}
            isError={profileQuery.isError}
            data={profileQuery.data}
            onRetry={() => profileQuery.refetch()}
          >
            {(p) => (
              <>
                {activeTab === 'overview' && <OverviewPanel profile={p} />}
                {activeTab === 'history' && <HistoryPanel profile={p} />}
                {activeTab === 'code' && <CodePanel profile={p} />}
                {activeTab === 'dependencies' && <DependenciesPanel />}
                {/* 'eval' renders no panel, matching the original mockup */}
              </>
            )}
          </QueryState>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <ReloadButton
                onClick={() => listQuery.refetch()}
                loading={listQuery.isFetching}
                title="Reload skills"
              />
            </div>
            <QueryState
              isLoading={listQuery.isLoading}
              isError={listQuery.isError}
              data={listQuery.data}
              onRetry={() => listQuery.refetch()}
              isEmpty={(d) => d.length === 0}
            >
              {(skills) => <SkillList skills={skills} />}
            </QueryState>
          </div>
        )}
      </main>
    </>
  );
}
