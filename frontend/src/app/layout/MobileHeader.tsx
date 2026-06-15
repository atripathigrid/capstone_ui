import { Icon } from '@/components/Icon';

interface MobileHeaderProps {
  icon: string;
  title: string;
}

/** Mobile sticky header — ported from the per-view <header class="lg:hidden">. */
export function MobileHeader({ icon, title }: MobileHeaderProps) {
  return (
    <header className="lg:hidden w-full top-0 sticky z-40 border-b border-white/5 bg-[#0d0f10]/80 backdrop-blur-md flex justify-between items-center px-container-margin py-gap-sm">
      <div className="flex items-center gap-sm">
        <Icon name={icon} className="text-secondary font-bold" />
        <h1 className="font-display text-headline-md font-bold tracking-tighter text-secondary">{title}</h1>
      </div>
      <div className="w-8 h-8 rounded-xl bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface-variant border border-white/10">
        NS
      </div>
    </header>
  );
}
