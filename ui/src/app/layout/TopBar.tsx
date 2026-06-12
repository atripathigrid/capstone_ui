import { Icon } from "@/components/Icon";

export function TopBar() {
  return (
    <header className="flex justify-between items-center w-full px-8 py-3 bg-background border-b border-white/5 h-16 shrink-0 z-40">
      <div className="flex items-center bg-surface-container px-4 py-1.5 rounded border border-white/5 w-96">
        <Icon name="search" className="text-on-surface-variant/60 text-lg mr-2" />
        <input
          className="bg-transparent border-none outline-none focus:ring-0 focus:outline-none p-0 text-sm w-full text-on-surface placeholder:text-on-surface-variant/40"
          placeholder="Search accounts, deals, or intelligence..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="hover:bg-white/5 text-on-surface-variant hover:text-white rounded-full p-1.5 transition-colors relative">
          <Icon name="notifications" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-error rounded-full"></span>
        </button>
        <button className="hover:bg-white/5 text-on-surface-variant hover:text-white rounded-full p-1.5 transition-colors">
          <Icon name="help_outline" />
        </button>
      </div>
    </header>
  );
}
