import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { QueryState } from '@/components/QueryState';
import { TopBarActions } from '@/app/layout/TopBarActions';
import { useGuardrails } from '@/hooks/queries';
import { useUiStore } from '@/store/uiStore';
import type { GuardrailConfig, NemoRail } from '@/types';
import { ThresholdSlider } from './components/ThresholdSlider';
import { ToggleRow } from './components/ToggleRow';

const NAV_TABS = ['Approval Thresholds', 'NeMo Rail Definitions', 'Safety Policies', 'Audit Log'];

function GuardrailsNav() {
  const active = useUiStore((s) => s.guardrailTab);
  const setTab = useUiStore((s) => s.setGuardrailTab);
  return (
    <nav className="mt-2 overflow-x-auto no-scrollbar">
      <div className="flex whitespace-nowrap gap-8">
        {NAV_TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <a
              key={tab}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setTab(tab);
              }}
              className={`toggle-tab py-3 text-sm border-b-2 transition-colors ${
                isActive
                  ? 'font-bold border-brand-accent text-brand-accent'
                  : 'font-medium text-on-surface-variant hover:text-on-surface border-transparent'
              }`}
            >
              {tab}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function RailTypeBadge({ type }: { type: NemoRail['type'] }) {
  const cls =
    type === 'Block'
      ? 'bg-error/10 text-error border-error/20'
      : type === 'Warn'
        ? 'bg-[#fdb66e]/10 text-[#fdb66e] border-[#fdb66e]/20'
        : 'bg-secondary/10 text-secondary border-secondary/20';
  return (
    <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase ${cls}`}>{type}</span>
  );
}

function GuardrailsContent({ config }: { config: GuardrailConfig }) {
  const [thresholds, setThresholds] = useState(config.thresholds);
  const [controls, setControls] = useState(config.controls);

  // Re-sync when a manual reload brings fresh server config.
  useEffect(() => setThresholds(config.thresholds), [config.thresholds]);
  useEffect(() => setControls(config.controls), [config.controls]);

  const customCount = config.rails.length;

  return (
    <main className="flex-1 p-8 space-y-8 bg-[#0d0f10]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-[#141819] rounded-lg border border-white/5 p-6">
          <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-6 flex items-center gap-2">
            <Icon name="analytics" className="text-sm" />
            Candidate Promotion Criteria
          </h3>
          <div className="space-y-6">
            <ThresholdSlider
              label="Min A/B Test Lift"
              value={thresholds.minLift}
              min={0}
              max={50}
              format={(v) => `+${v}%`}
              onChange={(v) => setThresholds((t) => ({ ...t, minLift: v }))}
            />
            <ThresholdSlider
              label="Min Sample Size (n)"
              value={thresholds.minSamples}
              min={100}
              max={2000}
              step={50}
              format={(v) => `${v}`}
              onChange={(v) => setThresholds((t) => ({ ...t, minSamples: v }))}
            />
            <ThresholdSlider
              label="Max p-value for Significance"
              value={thresholds.maxPValue}
              min={0.01}
              max={0.2}
              step={0.01}
              format={(v) => v.toFixed(2)}
              onChange={(v) => setThresholds((t) => ({ ...t, maxPValue: v }))}
            />
            <ThresholdSlider
              label="Min Safety Score (NeMo + garak)"
              value={thresholds.minSafety}
              min={70}
              max={100}
              format={(v) => `${v}%`}
              onChange={(v) => setThresholds((t) => ({ ...t, minSafety: v }))}
            />
          </div>
        </section>

        <section className="bg-[#141819] rounded-lg border border-white/5 p-6">
          <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-4 flex items-center gap-2">
            <Icon name="settings_input_component" className="text-sm" />
            Execution &amp; Approval Controls
          </h3>
          <div className="divide-y divide-white/5">
            <ToggleRow
              title="Allow auto-apply for low-risk hygiene skills"
              description="Restricted to actions pre-approved by RevOps team members"
              checked={controls.autoApplyHygiene}
              onChange={(v) => setControls((c) => ({ ...c, autoApplyHygiene: v }))}
            />
            <ToggleRow
              title="Auto-retire degraded skills"
              description="Moves losing candidates out of rotation automatically"
              checked={controls.autoRetireDegraded}
              onChange={(v) => setControls((c) => ({ ...c, autoRetireDegraded: v }))}
            />
          </div>
        </section>
      </div>

      <section className="bg-[#141819] rounded-lg border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
            <Icon name="security" className="text-sm" />
            Active NeMo Rails ({customCount} Custom • 12 Default)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest text-[10px] font-bold text-on-surface-variant uppercase">
                <th className="px-6 py-4">Rail Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Protection Domain</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {config.rails.map((rail) => (
                <tr key={rail.name} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-semibold text-on-surface">{rail.name}</td>
                  <td className="px-6 py-4">
                    <RailTypeBadge type={rail.type} />
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-xs font-medium">{rail.domain}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-primary font-medium inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {rail.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export function GuardrailsView() {
  const query = useGuardrails();

  return (
    <>
      <header className="bg-[#0d0f10]/95 border-b border-white/5 px-8 flex flex-col gap-4 shrink-0 py-4">
        <TopBarActions />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Guardrails &amp; Approval Policies</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Control automation limits and human approval requirements across workflows.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="py-2 px-6 bg-secondary/10 border border-secondary rounded-lg text-sm font-bold text-secondary transition-colors hover:bg-secondary/20">
              Import Config
            </button>
            <button className="py-2 px-6 bg-secondary/10 border border-secondary rounded-lg text-sm font-bold text-secondary transition-colors hover:bg-secondary/20">
              Save Changes
            </button>
          </div>
        </div>
        <GuardrailsNav />
      </header>

      <QueryState
        isLoading={query.isLoading}
        isError={query.isError}
        data={query.data}
        onRetry={() => query.refetch()}
      >
        {(config) => <GuardrailsContent config={config} />}
      </QueryState>
    </>
  );
}
