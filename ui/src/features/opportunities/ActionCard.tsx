import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";

interface ActionCardProps {
  badge: string;
  badgeTone: "secondary" | "muted";
  delta: string;
  title: string;
  body: ReactNode;
  buttonLabel: string;
  buttonIcon: string;
  buttonTone: "primary" | "muted";
}

/** A single recommended-action card in the deal detail Actions grid. */
export function ActionCard({
  badge,
  badgeTone,
  delta,
  title,
  body,
  buttonLabel,
  buttonIcon,
  buttonTone,
}: ActionCardProps) {
  const badgeClass =
    badgeTone === "secondary"
      ? "px-1.5 py-0.5 bg-secondary/10 text-secondary text-[9px] font-bold rounded uppercase tracking-wide"
      : "px-1.5 py-0.5 bg-surface-container text-on-surface-variant/70 text-[9px] font-bold rounded uppercase tracking-wide";

  const buttonClass =
    buttonTone === "primary"
      ? "w-full mt-3 py-2 bg-surface-container-high border border-white/5 text-on-surface-variant hover:bg-secondary hover:text-on-secondary font-bold text-xs rounded transition-all flex items-center justify-center gap-2"
      : "w-full mt-3 py-2 bg-surface-container-highest text-on-surface-variant hover:text-white font-semibold text-xs rounded border border-white/5 transition-all flex items-center justify-center gap-2";

  return (
    <div className="intelligence-card p-4 rounded-lg bg-surface flex flex-col justify-between min-h-44">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className={badgeClass}>{badge}</span>
          <span className="text-primary text-xl font-bold tracking-tight">{delta}</span>
        </div>
        <h4 className="font-bold text-sm text-on-surface">{title}</h4>
        <p className="text-xs text-on-surface-variant/70 mt-1 leading-normal">{body}</p>
      </div>
      <button className={buttonClass}>
        <Icon name={buttonIcon} className="text-sm" />
        {buttonLabel}
      </button>
    </div>
  );
}
