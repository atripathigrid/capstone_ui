import { useUiStore } from "@/store/ui";

/** Ported from login_page.html's <header>. */
export function SiteHeader() {
  const openAuthModal = useUiStore((s) => s.openAuthModal);

  return (
    <header className="w-full border-b border-white/5 bg-[#0d0f10]/80 backdrop-blur-md sticky top-0 z-40 px-8 py-4 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-secondary/10 flex items-center justify-center rounded-xl border border-secondary/20">
          <span className="material-symbols-outlined text-secondary text-xl">terminal</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-on-surface tracking-tight">EvoForge</h1>
          <p className="text-[10px] font-mono text-secondary uppercase tracking-widest opacity-70">
            Salesforce Revenue AI OS
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-on-surface-variant">
        <a href="#platform" className="hover:text-white transition-colors">
          Platform Architecture
        </a>
        <a href="#capabilities" className="hover:text-white transition-colors">
          Capabilities
        </a>
        <a href="#maturity-model" className="hover:text-white transition-colors">
          Maturity Tiers
        </a>
      </div>

      <button
        onClick={() => openAuthModal()}
        className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary border border-secondary/30 rounded-lg hover:bg-secondary/20 transition-all font-medium text-sm group"
      >
        <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">
          login
        </span>
        <span>Establish Connection</span>
      </button>
    </header>
  );
}
