import { useUiStore } from "@/store/ui";

const TRACE = `{
  "trace_id": "wf-evo-0912-v2",
  "trigger": "lead.convert",
  "anomaly": "recurring_owner_mismatch",
  "cluster_density": "#FC-0847",
  "challenger_skill": {
    "id": "lead-routing-geo-industry",
    "engine": "claude-3-5-sonnet",
    "shadow_phase_lift": "+23.4%",
    "p_value": 0.003
  },
  "guardrails": "nemo_core_active"
}`;

export function Hero() {
  const openAuthModal = useUiStore((s) => s.openAuthModal);

  return (
    <section className="w-full bg-gradient-to-b from-surface/40 to-background pt-20 pb-16 px-8 relative border-b border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left animate-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-on-surface-variant font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Grid Dynamics Operating Model Concept · April 2026</span>
          </div>
          <h2 className="text-4xl md:text-6xl tracking-tight text-white font-extrabold leading-none">
            Unveil Customer Reality. <br />
            <span className="text-secondary font-display italic font-light">Self-Evolving</span>{" "}
            Salesforce Harness.
          </h2>
          <p className="text-on-surface-variant text-base md:text-xl max-w-2xl leading-relaxed">
            A RevOps-operated machine learning platform layered on top of Salesforce. It autonomously
            observes lifecycle outcomes, flags technical stalls, and tests candidate automation code
            safely via Temporal.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => openAuthModal()}
              className="px-6 py-3 bg-secondary text-on-secondary font-bold text-sm rounded-lg hover:bg-[#49c5b6] transition-all uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-secondary/10"
            >
              <span>Launch Operational Terminal</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <a
              href="#platform"
              className="px-6 py-3 bg-white/5 text-on-surface hover:text-white border border-white/10 rounded-lg hover:bg-white/10 transition-all font-semibold text-sm flex items-center justify-center"
            >
              Explore Platform Framework
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 animate-reveal delay-200">
          <div className="w-full border border-white/10 bg-[#0d0f10] rounded-xl overflow-hidden shadow-2xl shadow-black/80">
            <div className="bg-surface/80 px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-error/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-primary/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary/40"></span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-on-surface-variant/60 uppercase">
                Context.ai Activity Trace
              </span>
            </div>
            <pre className="p-5 font-mono text-xs text-primary/90 overflow-x-auto leading-relaxed max-h-[280px]">
              <code>{TRACE}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
