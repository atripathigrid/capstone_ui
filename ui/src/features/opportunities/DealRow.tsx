import { useNavigate } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { ROUTES } from "@/config/routes";
import type { DealSummary } from "@/types";

/**
 * A single Your-Deals row. The primary action (Re-engage / Follow Up / View
 * Scope) routes to the deal detail — the React Router replacement for the old
 * switchToDeal() global.
 */
export function DealRow({ deal }: { deal: DealSummary }) {
  const navigate = useNavigate();
  const open = () => navigate(ROUTES.opportunityDetail(deal.opportunityId));

  const rowClass = deal.critical
    ? "deal-item-row intelligence-card p-4 rounded-lg flex items-center gap-4 border-error/10 bg-error/[0.01]"
    : "deal-item-row intelligence-card p-4 rounded-lg flex items-center gap-4";

  const avatarClass = deal.critical
    ? "w-10 h-10 rounded bg-[#2c1d1d] flex items-center justify-center font-bold text-error/90 text-sm shrink-0"
    : "w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center font-bold text-secondary text-sm shrink-0";

  const badgeClass = deal.critical
    ? "inline-block px-2 py-0.5 rounded bg-error/10 border border-error/20 text-error text-[10px] font-bold uppercase tracking-wider"
    : "inline-block px-2 py-0.5 rounded bg-surface-container border border-white/5 text-secondary text-[10px] font-bold uppercase tracking-wider";

  const buttonClass = deal.critical
    ? "px-4 py-1.5 rounded bg-white/5 border border-white/10 text-error hover:bg-error hover:text-[#410002] text-xs font-bold transition-all"
    : "px-4 py-1.5 rounded bg-surface-container-high border border-white/5 text-on-surface/70 hover:text-white hover:bg-surface-bright text-xs font-semibold transition-all";

  const iconClass = deal.critical
    ? "text-error text-lg shrink-0"
    : "text-secondary text-lg shrink-0";

  const noteClass = deal.critical
    ? "text-xs text-on-surface-variant/90 font-medium truncate"
    : "text-xs text-on-surface-variant/80 font-medium truncate";

  return (
    <div className={rowClass} data-deal={deal.deal}>
      <div className={avatarClass}>{deal.initials}</div>
      <div className="flex-1 grid grid-cols-12 gap-2 items-center">
        <div className="col-span-4">
          <h4
            onClick={open}
            className="text-sm font-semibold text-on-surface cursor-pointer hover:text-secondary"
          >
            {deal.name}
          </h4>
          <p className="text-xs text-on-surface-variant/60 mt-0.5">
            {deal.critical ? (
              <span className="text-error font-medium">{deal.valueLabel}</span>
            ) : (
              deal.valueLabel
            )}{" "}
            • {deal.segment}
          </p>
        </div>
        <div className="col-span-2">
          <span className={badgeClass}>{deal.badge}</span>
        </div>
        <div className="col-span-4 flex items-center gap-2">
          <Icon name={deal.icon} className={iconClass} />
          <p className={noteClass}>{deal.note}</p>
        </div>
        <div className="col-span-2 text-right">
          <button onClick={open} className={buttonClass}>
            {deal.actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
