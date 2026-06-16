interface Component {
  name: string;
  color: string;
  body: string;
}

const COMPONENTS: Component[] = [
  {
    name: "Temporal.io",
    color: "text-secondary",
    body: "Durable orchestration ensuring exact retry state logic and safe live split test cycles.",
  },
  {
    name: "Context Graphs",
    color: "text-secondary",
    body: "Neo4j lineage networks connecting captured metrics back to ancestor configurations.",
  },
  {
    name: "Promptfoo",
    color: "text-primary",
    body: "Automated regression factories verifying statistical sign-off variables.",
  },
  {
    name: "NeMo Guardrails",
    color: "text-error",
    body: "Strict systemic policy shields running defense validation checks on model bounds.",
  },
];

export function IntegrationSection() {
  return (
    <section
      id="integration-stack"
      className="w-full bg-[#08090a] py-16 px-8 border-t border-white/5 scroll-trigger"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-on-surface-variant/60 tracking-widest">
              Infrastructure Components
            </h3>
            <h2 className="text-2xl md:text-3xl text-white font-extrabold tracking-tight">
              The Technical Integration Architecture
            </h2>
          </div>
          <span className="text-xs font-mono text-secondary">
            Tuned for Enterprise Security &amp; Compliance
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMPONENTS.map((c) => (
            <div
              key={c.name}
              className="p-5 bg-surface/40 border border-white/5 rounded-xl space-y-2 hover:border-white/10 transition-colors"
            >
              <code className={`font-mono text-xs font-bold block ${c.color}`}>{c.name}</code>
              <p className="text-xs text-on-surface-variant leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
