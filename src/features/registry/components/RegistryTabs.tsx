import { useUiStore } from '@/store/uiStore';
import type { UiState } from '@/store/uiStore';

type Tab = UiState['registryActiveTab'];

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'history', label: 'Version History' },
  { key: 'code', label: 'Code & Prompt' },
  { key: 'eval', label: 'Eval Results' },
  { key: 'dependencies', label: 'Dependencies' },
];

/** Profile sub-navigation. Active tab is controlled UI store state (restorable). */
export function RegistryTabs() {
  const active = useUiStore((s) => s.registryActiveTab);
  const setTab = useUiStore((s) => s.setRegistryActiveTab);

  return (
    <div className="flex gap-md border-b border-white/5 mt-2">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setTab(tab.key)}
            className={`px-4 py-3 text-sm border-b-2 transition-colors tab-btn ${
              isActive
                ? 'font-bold border-brand-accent text-brand-accent'
                : 'font-medium text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
