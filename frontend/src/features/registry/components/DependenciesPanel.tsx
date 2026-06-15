import { Icon } from '@/components/Icon';

/** Dependencies panel — upstream data pipelines + LLM base models. */
export function DependenciesPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-gap-md">
      <div className="glass-card p-5 rounded-lg border border-white/5">
        <h4 className="text-sm font-bold text-on-surface mb-3 uppercase tracking-wider flex items-center gap-2 text-secondary">
          <Icon name="account_tree" className="text-base" />
          Upstream Data Pipelines
        </h4>
        <ul className="space-y-3 font-mono text-xs text-on-surface-variant">
          <li className="p-2 bg-[#0d0f10] border border-white/5 rounded flex justify-between">
            <span>salesforce-contact-sync-v12</span>
            <span className="text-[#a8d08d]">CONNECTED</span>
          </li>
          <li className="p-2 bg-[#0d0f10] border border-white/5 rounded flex justify-between">
            <span>hubspot-deal-stream-prod</span>
            <span className="text-[#a8d08d]">CONNECTED</span>
          </li>
          <li className="p-2 bg-[#0d0f10] border border-white/5 rounded flex justify-between">
            <span>enrichment-firmographic-cleansing</span>
            <span className="text-error font-bold">DEGRADED (4ms delay)</span>
          </li>
        </ul>
      </div>
      <div className="glass-card p-5 rounded-lg border border-white/5">
        <h4 className="text-sm font-bold text-on-surface mb-3 uppercase tracking-wider flex items-center gap-2 text-secondary">
          <Icon name="layers" className="text-base" />
          LLM Base Models
        </h4>
        <ul className="space-y-3 font-mono text-xs text-on-surface-variant">
          <li className="p-2 bg-[#0d0f10] border border-white/5 rounded flex justify-between">
            <span>anthropic/claude-3-5-sonnet:live</span>
            <span className="text-secondary">PRIMARY</span>
          </li>
          <li className="p-2 bg-[#0d0f10] border border-white/5 rounded flex justify-between">
            <span>mistralai/mistral-7b-instruct-v3</span>
            <span className="text-on-surface-variant/40">FALLBACK</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
