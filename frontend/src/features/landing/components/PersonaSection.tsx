import { useUiStore } from "@/store/ui";

/**
 * "One Unified Ecosystem. Structured by Persona." section. Ported from
 * #platform. The two persona cards' buttons prefill the auth modal
 * (replacing triggerAuthWithFields).
 */
export function PersonaSection() {
  const openAuthModal = useUiStore((s) => s.openAuthModal);

  return (
    <section id="platform" className="max-w-7xl mx-auto px-8 py-16 space-y-12 scroll-trigger">
      <div className="max-w-3xl space-y-2">
        <h3 className="text-xs font-bold uppercase text-secondary tracking-widest">
          Platform Integration Layer
        </h3>
        <h2 className="text-3xl md:text-4xl text-white font-extrabold tracking-tight">
          One Unified Ecosystem. Structured by Persona.
        </h2>
        <p className="text-on-surface-variant text-base">
          Grid Dynamics leverages separate access interfaces tailored by clear enterprise scopes. Use
          the terminal mock indicators below to preview each workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* Admin persona */}
        <div className="glass-card rounded-xl p-8 flex flex-col justify-between space-y-6 group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                Evolution Command Console
              </h4>
              <p className="text-xs font-mono text-primary uppercase tracking-wider">
                Credential Token: admin / admin
              </p>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Designed for RevOps architecture leads overseeing systemic logic, fallback execution
              engines, and safety thresholds. Monitor prompt modules, version sets, and shadow metric
              validation pipelines across long-running loops.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-on-surface-variant/40 uppercase tracking-widest">
              Authorized Scope: RevOps Admin
            </span>
            <button
              onClick={() => openAuthModal({ username: "admin", password: "admin" })}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-primary group-hover:text-background text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>Access Plane</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Operator persona */}
        <div className="glass-card rounded-xl p-8 flex flex-col justify-between space-y-6 group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl">dashboard</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">
                SalesIntel Workspace
              </h4>
              <p className="text-xs font-mono text-secondary uppercase tracking-wider">
                Credential Token: user / user
              </p>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Surfaces real-time account risk indicators and playbook suggestions inline within sales
              environments. Enables frontline reps, customer success leads, and executives to review
              automated briefs and leverage the conversational assistant.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-on-surface-variant/40 uppercase tracking-widest">
              Authorized Scope: Operator Terminal
            </span>
            <button
              onClick={() => openAuthModal({ username: "user", password: "user" })}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-secondary group-hover:text-background text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>Access Terminal</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
