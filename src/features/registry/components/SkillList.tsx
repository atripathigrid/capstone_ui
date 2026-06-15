import { useNavigate } from 'react-router-dom';
import type { SkillListItem } from '@/types';
import { ROUTES } from '@/config';
import { Icon } from '@/components/Icon';
import { useUiStore } from '@/store/uiStore';

const NAME_TONE: Record<SkillListItem['nameTone'], string> = {
  secondary: 'text-secondary',
  default: 'text-on-surface/80',
  error: 'text-error/80',
};

function StatusBadge({ status }: { status: SkillListItem['status'] }) {
  if (status === 'pending-approval') {
    return (
      <span className="bg-[#fdb66e]/10 text-[#fdb66e] px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-[#fdb66e]/20">
        Pending Approval
      </span>
    );
  }
  return (
    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-primary/20">
      Active
    </span>
  );
}

/** Skill directory master list. Replaces the imperative data-approval toggle
 *  with the Zustand UI store (registryApprovalFilter). */
export function SkillList({ skills }: { skills: SkillListItem[] }) {
  const navigate = useNavigate();
  const approvalFilter = useUiStore((s) => s.registryApprovalFilter);

  const visible = approvalFilter ? skills.filter((s) => s.awaitingApproval) : skills;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 px-4 text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest opacity-50">
        <div>Module Name</div>
        <div>Status</div>
        <div>Total Invocations</div>
        <div className="text-right">Action</div>
      </div>

      {visible.map((skill) => {
        const base =
          'grid grid-cols-4 px-4 py-4 bg-[#141819] border border-white/5 rounded-lg items-center skill-list-item';
        const interactive = skill.locked
          ? 'opacity-40 cursor-not-allowed'
          : 'hover:bg-[#222627] transition-all cursor-pointer';
        return (
          <div
            key={skill.id}
            className={`${base} ${interactive}`}
            onClick={skill.locked ? undefined : () => navigate(ROUTES.registrySkill(skill.id))}
          >
            <div className={`font-mono text-sm font-bold ${NAME_TONE[skill.nameTone]}`}>
              {skill.name}
            </div>
            <div>
              <StatusBadge status={skill.status} />
            </div>
            <div className="text-on-surface-variant font-mono text-sm">
              {skill.invocations.toLocaleString()}
            </div>
            <div className="text-right">
              {skill.locked ? (
                <Icon name="lock" className="text-on-surface-variant/30 text-sm" />
              ) : (
                <Icon name="chevron_right" className="text-secondary text-sm" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
