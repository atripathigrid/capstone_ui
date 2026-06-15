import type { DashboardStat } from '@/types';

const GREEN = 'rgb(168, 208, 141)';

function captionStyle(tone: DashboardStat['captionTone']): React.CSSProperties | undefined {
  return tone === 'positive' ? { color: GREEN } : undefined;
}

function captionClass(tone: DashboardStat['captionTone']): string {
  if (tone === 'error') return 'text-error';
  if (tone === 'neutral') return 'text-on-surface-variant';
  return '';
}

/**
 * KPI stat card — label, a large centered value, and caption. Content is
 * vertically centered so the number sits in the middle of the box and the
 * larger type fills the card without leaving odd empty space.
 */
export function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <div className="glass-card p-card-stat-p rounded-lg flex flex-col justify-center gap-3 min-h-[150px]">
      <p className="text-[11px] font-bold uppercase text-on-surface-variant/60 tracking-widest">
        {stat.label}
      </p>
      <span
        className={`font-display font-bold leading-none text-5xl ${
          stat.valueTone === 'error' ? 'text-error' : 'text-on-surface'
        }`}
      >
        {stat.value}
      </span>
      {stat.captionHtml ? (
        <span
          className="text-[11px] font-bold text-on-surface-variant"
          dangerouslySetInnerHTML={{ __html: stat.captionHtml }}
        />
      ) : (
        <span
          className={`text-[11px] font-bold ${captionClass(stat.captionTone)}`}
          style={captionStyle(stat.captionTone)}
        >
          {stat.caption}
        </span>
      )}
    </div>
  );
}
