import type { ActivityEvent } from '@/types';

const GREEN = 'rgb(168, 208, 141)';

function dot(tone: ActivityEvent['tone']) {
  switch (tone) {
    case 'positive':
      return <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: GREEN }} />;
    case 'error':
      return <div className="mt-1 w-2 h-2 rounded-full bg-error flex-shrink-0 shadow-[0_0_8px_rgba(242,139,130,0.5)]" />;
    case 'warning':
      return <div className="mt-1 w-2 h-2 rounded-full bg-[#fdb66e] flex-shrink-0" />;
    default:
      return <div className="mt-1 w-2 h-2 rounded-full bg-on-surface-variant/30 flex-shrink-0" />;
  }
}

/** Live Activity feed — ported from the dashboard activity panel. */
export function LiveActivity({ events }: { events: ActivityEvent[] }) {
  return (
    <div className="space-y-4 custom-scrollbar overflow-y-auto pr-2 flex-1">
      {events.map((ev) => (
        <div key={ev.id} className="flex gap-gap-md">
          {dot(ev.tone)}
          <div className="space-y-0.5">
            {ev.title && (
              <p className="text-error leading-snug font-bold uppercase text-[11px]">{ev.title}</p>
            )}
            <p
              className={`text-[13px] leading-snug ${ev.title ? 'text-on-surface' : 'text-on-surface'}`}
              dangerouslySetInnerHTML={{ __html: ev.html }}
            />
            <p className="text-[10px] text-muted-custom">{ev.meta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
