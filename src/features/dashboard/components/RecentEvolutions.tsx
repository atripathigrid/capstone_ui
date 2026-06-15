import type { RecentEvolution } from '@/types';

const GREEN = 'rgb(168, 208, 141)';

const BADGE_CLASS: Record<RecentEvolution['badgeTone'], string> = {
  promoted: 'bg-primary-container/10 text-primary-container',
  'ab-test': 'bg-white/5 text-on-surface-variant',
  review: 'bg-white/5 text-on-surface-variant',
  rejected: 'bg-error/10 text-error',
};

function EvolutionCard({ ev }: { ev: RecentEvolution }) {
  const promoted = ev.badgeTone === 'promoted';
  const rejected = ev.accent === 'error';

  const wrapperClass = promoted
    ? 'glass-card ai-accent rounded-xl px-card-row-p py-3 flex flex-col justify-between min-h-[90px]'
    : `glass-card px-card-row-p py-3 flex flex-col justify-between min-h-[90px] border-l-4 rounded-lg ${
        rejected ? 'border-error/50' : 'border-white/10'
      }`;

  const metricStyle = promoted ? { color: GREEN } : undefined;
  const metricClass = promoted
    ? 'font-bold text-headline-md tracking-tight'
    : rejected
      ? 'text-error/50 font-bold text-headline-md tracking-tight'
      : 'text-on-surface font-bold text-headline-md tracking-tight';

  return (
    <div className={wrapperClass} style={promoted ? { borderLeftColor: GREEN } : undefined}>
      <div className="flex justify-between items-start">
        <div className="min-w-0">
          <p
            className={`font-mono text-body-md font-bold truncate ${
              rejected ? 'text-on-surface/50 line-through' : 'text-on-surface'
            }`}
          >
            {ev.name}
          </p>
          <p className="text-[10px] text-muted-custom">{ev.meta}</p>
        </div>
        <span
          className={`${BADGE_CLASS[ev.badgeTone]} text-badge font-badge uppercase px-2 py-0.5 rounded`}
        >
          {ev.badge}
        </span>
      </div>
      <div className="flex justify-between items-baseline mt-1 border-t border-white/5 pt-1.5">
        <span className={metricClass} style={metricStyle}>
          {ev.metric}
        </span>
        <span className="text-[10px] text-muted-custom">{ev.metricLabel}</span>
      </div>
    </div>
  );
}

export function RecentEvolutions({ items }: { items: RecentEvolution[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-gap-sm">
      {items.map((ev) => (
        <EvolutionCard key={ev.id} ev={ev} />
      ))}
    </div>
  );
}
