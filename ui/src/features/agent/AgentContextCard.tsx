import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";

interface AgentContextCardProps {
  icon: string;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  primary: { label: string; onClick?: () => void; variant?: "solid" | "outline" };
  secondary: { label: string };
}

/** A single EvoForge context card (Portfolio Risk, Stage Stall, etc.). */
export function AgentContextCard({
  icon,
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: AgentContextCardProps) {
  const primaryClass =
    primary.variant === "outline"
      ? "w-full py-1.5 px-2 rounded bg-surface-container border border-white/10 text-on-surface/80 hover:text-white hover:bg-white/10 text-[11px] transition-all"
      : "py-1.5 px-2 rounded bg-surface-container border border-white/5 text-secondary hover:bg-secondary hover:text-on-secondary font-bold text-[11px] transition-all";

  return (
    <div className="border border-white/5 bg-[#141819] rounded-lg p-4 flex flex-col gap-2 relative">
      <div className="flex items-center gap-1 text-secondary text-[10px] font-bold uppercase tracking-wider">
        <Icon name={icon} className="text-sm" />
        <span>{eyebrow}</span>
      </div>
      <h4 className="text-sm font-bold text-white leading-tight">{title}</h4>
      <p className="text-xs text-on-surface-variant leading-relaxed">{body}</p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button onClick={primary.onClick} className={primaryClass}>
          {primary.label}
        </button>
        <button className="py-1.5 px-2 rounded bg-white/5 text-on-surface-variant font-medium text-[11px]">
          {secondary.label}
        </button>
      </div>
    </div>
  );
}
