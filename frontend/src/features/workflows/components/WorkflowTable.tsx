import type { WorkflowRow } from '@/types';

const ID_TONE: Record<WorkflowRow['idTone'], string> = {
  secondary: 'text-secondary font-bold',
  default: 'text-on-surface/80',
  error: 'text-error/80',
};

function StatusBadge({ status }: { status: WorkflowRow['status'] }) {
  if (status === 'running') {
    return (
      <span className="bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
        RUNNING
      </span>
    );
  }
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center bg-primary-container/10 text-primary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-primary-container/20">
        COMPLETED
      </span>
    );
  }
  return (
    <span className="inline-flex items-center bg-error/10 text-error px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-error/20">
      FAILED
    </span>
  );
}

export function WorkflowTable({
  rows,
  onSelect,
}: {
  rows: WorkflowRow[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-6 px-4 text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest opacity-50 mb-2">
        <div className="col-span-2">Workflow ID</div>
        <div>Type</div>
        <div>Status</div>
        <div>Duration</div>
        <div>Skill Registry</div>
      </div>

      {rows.map((row) => (
        <div
          key={row.id}
          className={`grid grid-cols-6 px-4 py-4 bg-[#141819] glass-border rounded-lg items-center group hover:bg-[#222627] transition-all cursor-pointer ${
            row.accent ? 'border-l-3 border-[#5ce0d0]' : ''
          }`}
          onClick={row.selectable ? () => onSelect(row.id) : undefined}
        >
          <div className={`col-span-2 font-body-md text-body-md ${ID_TONE[row.idTone]}`}>{row.id}</div>
          <div className="font-body-md text-body-md text-on-surface">{row.type}</div>
          <div>
            <StatusBadge status={row.status} />
          </div>
          <div className="font-body-md text-body-md text-on-surface-variant">{row.duration}</div>
          <div className="font-body-md text-body-md text-on-surface truncate pr-4">{row.skill}</div>
        </div>
      ))}
    </div>
  );
}
