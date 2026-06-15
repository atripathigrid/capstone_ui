import type { SkillProfile } from '@/types';
import { Icon } from '@/components/Icon';

/** Code & Prompt panel — read-only skills.json config (ported verbatim layout,
 *  with id/version/lineage derived from the active profile). */
export function CodePanel({ profile }: { profile: SkillProfile }) {
  const ancestors = profile.versions.slice(1).map((v) => v.version);
  const version = profile.versions[0]?.version ?? 'v1.0.0';

  const config = {
    skill_id: profile.id,
    version,
    lineage: {
      ancestors,
      total_invocations: 1847,
    },
    runtime_parameters: {
      model_fallback: 'mistral-7b-instruct',
      primary_engine: 'claude-3-5-sonnet',
      temperature: 0.15,
      max_tokens: 1024,
    },
    guardrails: {
      nemo_core_active: true,
      pii_masking: ['email', 'phone_number', 'ip_address'],
      injection_defense_level: 'strict',
    },
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-lg p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-3">
            <Icon name="data_object" className="text-secondary text-sm" />
            <span className="font-mono text-xs font-bold text-on-surface">skills.json</span>
          </div>
          <span className="text-[10px] font-mono tracking-wider uppercase opacity-40 text-on-surface-variant">
            Read-only configuration modules
          </span>
        </div>
        <pre className="overflow-x-auto p-4 bg-[#111415] rounded-lg border border-white/5 font-mono text-xs text-[#a8d08d] custom-scrollbar leading-relaxed">
          <code>{JSON.stringify(config, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
