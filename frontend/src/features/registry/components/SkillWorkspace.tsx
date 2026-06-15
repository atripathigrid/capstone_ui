import type { SkillProfile } from '@/types';
import { Icon } from '@/components/Icon';

/**
 * Dynamic evaluation workspace slot — ports the two innerHTML variants that the
 * original loadSkillProfile() injected, now route/data-driven.
 */
export function SkillWorkspace({ profile }: { profile: SkillProfile }) {
  if (profile.variant === 'ab-test') {
    const candidate = profile.versions[0];
    const baseline = profile.versions[1] ?? profile.versions[0];
    return (
      <div className="glass-card rounded-lg p-card-stat-p flex flex-col relative pb-16">
        <div className="flex items-center justify-between mb-6">
          <span className="font-badge text-badge uppercase text-on-surface-variant">
            A/B TEST RESULTS — {candidate.version.toUpperCase()} VS {baseline.version.toUpperCase()}
          </span>
          <Icon name="info" className="text-on-surface-variant text-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-6">
          <div className="p-5 bg-gradient-to-b from-[#272b2c] to-[#141819] rounded-lg border border-white/5 flex flex-col justify-between min-h-[140px]">
            <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider opacity-60">
              BASELINE {baseline.version.toUpperCase()}
            </div>
            <div className="text-center py-2">
              <span className="font-display text-4xl leading-tight font-bold text-white">
                {baseline.performance.toFixed(1)}%
              </span>
            </div>
            <p className="text-on-surface-variant/40 text-[11px] uppercase text-center font-bold tracking-widest">
              acceptance rate
            </p>
          </div>
          <div className="p-5 bg-[#141819] rounded-lg border border-white/5 flex flex-col justify-between min-h-[140px]">
            <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider opacity-60">
              BASELINE {candidate.version.toUpperCase()}
            </div>
            <div className="text-center py-2">
              <span className="font-display text-4xl leading-tight font-bold text-on-surface">
                {candidate.performance.toFixed(1)}%
              </span>
            </div>
            <p className="text-on-surface-variant/40 text-[11px] uppercase text-center font-bold tracking-widest">
              Hit Rate
            </p>
          </div>
        </div>
        <div className="mt-auto bg-secondary/5 border border-secondary/10 p-3 rounded-lg flex items-center gap-3">
          <Icon name="check_circle" className="text-secondary text-lg" />
          <span className="font-body-md text-body-md text-secondary font-medium">
            +{(candidate.performance - baseline.performance).toFixed(1)}% lift · p=0.003 · n=942
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <button
            type="button"
            className="px-4 py-1.5 bg-[#a8d08d] hover:bg-[#92ba78] text-[#092100] text-xs font-bold rounded uppercase tracking-wider transition-all"
            onClick={() =>
              alert('Candidate skill approved and queued for core production migration loop.')
            }
          >
            Approve Candidate
          </button>
        </div>
      </div>
    );
  }

  // summary variant
  return (
    <div className="glass-card rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-bold text-on-surface uppercase tracking-wide border-b border-white/5 pb-2">
        Skills Summary
      </h3>
      <p className="text-sm text-on-surface-variant leading-relaxed font-normal">
        This model component handles downstream pipeline execution for cross-industry geo-filtering
        routing routines. Live split production trace analytics indicate optimal structural latency
        with zero unhandled fallbacks recorded over the current rotation loop cycle.
      </p>
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="p-3 bg-[#111415] rounded border border-white/5 font-mono text-center">
          <span className="block text-xl font-bold text-secondary">99.8%</span>
          <span className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest font-sans font-bold">
            Uptime
          </span>
        </div>
        <div className="p-3 bg-[#111415] rounded border border-white/5 font-mono text-center">
          <span className="block text-xl font-bold text-primary-container">0.02%</span>
          <span className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest font-sans font-bold">
            Error Rate
          </span>
        </div>
        <div className="p-3 bg-[#111415] rounded border border-white/5 font-mono text-center">
          <span className="block text-xl font-bold text-white">1,847</span>
          <span className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest font-sans font-bold">
            Runs
          </span>
        </div>
      </div>
    </div>
  );
}
