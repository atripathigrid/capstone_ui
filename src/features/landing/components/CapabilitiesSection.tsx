import { type CapabilityTab, useUiStore } from "@/store/ui";

interface PanelDef {
  id: CapabilityTab;
  tabLabel: string;
  title: string;
  badge: { text: string; tone: "secondary" | "primary" | "error" };
  body: string;
  cells: { label: string; value: string; tone: "white" | "secondary" | "primary" | "error" }[];
}

const PANELS: PanelDef[] = [
  {
    id: "summarization",
    tabLabel: "Intelligence Summarization",
    title: "System Data Intelligence Summarization",
    badge: { text: "Live Sync", tone: "secondary" },
    body: "Continuously monitors pipeline metrics, value at risk, and forecast variances across multi-vertical enterprise sectors. Generates real-time, context-heavy summaries that separate actual buying patterns from static estimation bias.",
    cells: [
      { label: "Tracked Parameter", value: "Forecast Variance Decompositions", tone: "white" },
      { label: "Execution Engine", value: "Recursive Language Model (RLM)", tone: "secondary" },
    ],
  },
  {
    id: "journey",
    tabLabel: "Deal Journey Progression",
    title: "Deal Journey Progression Tracker",
    badge: { text: "Tracer Module", tone: "primary" },
    body: "Traces individual deal velocity vectors to map path progression against historical baseline benchmarks. Surfaces clear multi-threading gap alerts when critical technical validation stakeholders are missing.",
    cells: [
      { label: "Automation Target", value: "Stage Stall Discovery Rules", tone: "white" },
      { label: "Context Scope", value: "Neo4j Lineage Subgraphs", tone: "primary" },
    ],
  },
  {
    id: "agent",
    tabLabel: "EvoForge Agent Assist",
    title: "EvoForge Assistant Chat integration",
    badge: { text: "Agent Shell", tone: "error" },
    body: "Serves as a contextual workspace companion embedded directly within frontline layouts. Translates raw account signals into optimized playbook recommendations, email drafting tasks, and pre-sales templates.",
    cells: [
      { label: "Conversational State", value: "Dynamic Prompt Seeds", tone: "white" },
      { label: "Validation Level", value: "Strict Injection Defense", tone: "error" },
    ],
  },
];

const toneText: Record<string, string> = {
  white: "text-white font-bold",
  secondary: "text-secondary font-mono font-medium",
  primary: "text-primary font-mono font-medium",
  error: "text-error font-mono font-medium",
};

const badgeTone: Record<string, string> = {
  secondary: "bg-secondary/10 border-secondary/20 text-secondary",
  primary: "bg-primary/10 border-primary/20 text-primary",
  error: "bg-error/10 border-error/20 text-error",
};

export function CapabilitiesSection() {
  const active = useUiStore((s) => s.activeCapabilityTab);
  const setTab = useUiStore((s) => s.setCapabilityTab);
  const panel = PANELS.find((p) => p.id === active) ?? PANELS[0];

  return (
    <section
      id="capabilities"
      className="w-full bg-[#0b0c0e] py-16 px-8 border-y border-white/5 scroll-trigger"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-4 sticky top-36 h-fit">
          <h3 className="text-xs font-bold uppercase text-secondary tracking-widest">
            Platform Core Modules
          </h3>
          <h2 className="text-3xl md:text-4xl text-white font-extrabold tracking-tight leading-tight">
            Capabilities Grounded in Reality
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Unify real customer signals captured across your tech stack with in-house execution
            parameters. Switch between the core components of the platform below to preview
            data-driven highlights.
          </p>

          <div className="flex flex-col gap-2 pt-4">
            {PANELS.map((p) => {
              const isActive = p.id === active;
              return (
                <button
                  key={p.id}
                  onClick={() => setTab(p.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-l-2 text-sm transition-all ${
                    isActive
                      ? "border-secondary bg-secondary/5 text-white font-bold"
                      : "border-transparent text-on-surface-variant hover:text-white font-medium"
                  }`}
                >
                  {p.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-8 bg-surface/30 border border-white/5 rounded-xl p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h4 className="text-xl font-bold text-white">{panel.title}</h4>
              <span
                className={`px-2.5 py-0.5 rounded border text-[10px] uppercase font-mono ${badgeTone[panel.badge.tone]}`}
              >
                {panel.badge.text}
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">{panel.body}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {panel.cells.map((cell) => (
                <div
                  key={cell.label}
                  className="p-4 bg-background border border-white/5 rounded-lg space-y-1"
                >
                  <span className="text-[10px] font-mono text-on-surface-variant/40 uppercase tracking-wider block">
                    {cell.label}
                  </span>
                  <p className={`text-sm ${toneText[cell.tone]}`}>{cell.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
