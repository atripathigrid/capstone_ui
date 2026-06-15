import { Icon } from '@/components/Icon';

/** Notifications + help cluster shared by the per-view headers. */
export function TopBarActions({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-end items-center gap-gap-md py-4 px-1 border-b border-white/10 ${className}`}>
      <div className="relative cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors">
        <Icon name="notifications" className="text-[20px]" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border border-[#0d0f10]" />
      </div>
      <div className="cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors">
        <Icon name="help" className="text-[20px]" />
      </div>
    </div>
  );
}
