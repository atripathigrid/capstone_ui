import { Fragment } from 'react';
import type { StepSegment, WorkflowDetail, WorkflowStep } from '@/types';

const SEG_CLASS: Record<StepSegment['tone'], string> = {
  muted: 'font-label-sm text-[11px] text-on-surface-variant',
  primary: 'font-label-sm text-[11px] text-primary',
  secondary: 'font-label-sm text-[11px] text-secondary',
  'secondary-italic': 'font-label-sm text-[11px] text-secondary/70 italic',
};

function Step({ step }: { step: WorkflowStep }) {
  return (
    <div className="relative pl-8 pb-8">
      {step.active ? (
        <div className="absolute left-[-5.5px] top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-secondary/20 animate-pulse-subtle" />
      ) : (
        <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
      )}
      <div className="flex flex-col">
        <span
          className={`font-body-md text-body-md font-bold ${
            step.titleTone === 'secondary' ? 'text-secondary' : 'text-on-surface'
          }`}
        >
          {step.title}
        </span>
        <div className="flex items-center gap-2 mt-1">
          {step.segments.map((seg, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="text-white/10">•</span>}
              <span className={SEG_CLASS[seg.tone]}>{seg.text}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Workflow detail rail — ports the right-hand timeline aside. */
export function WorkflowDetailAside({ detail }: { detail: WorkflowDetail }) {
  return (
    <aside className="w-full md:w-[380px] bg-[#0d0f10] border-l border-white/5 flex flex-col p-6 overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse-subtle shrink-0" />
          <h4 className="font-headline-md text-label-sm font-bold text-on-surface uppercase tracking-wider flex-1">
            Workflow Detail
          </h4>
          <button
            className="px-2 py-0.5 text-[10px] font-bold text-error bg-error/10 hover:bg-error/20 border border-error/20 rounded uppercase shrink-0"
            onClick={() => alert('Workflow loop sequence terminated gracefully.')}
          >
            Terminate
          </button>
        </div>
        <div className="bg-[#141819] border border-white/5 p-3 rounded-lg flex justify-between items-center">
          <code className="text-secondary font-mono text-[10px] font-bold">{detail.code}</code>
          <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-tighter opacity-70">
            {detail.elapsed}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-0 relative ml-2 border-l border-white/10">
        {detail.steps.map((step) => (
          <Step key={step.id} step={step} />
        ))}
      </div>
    </aside>
  );
}
