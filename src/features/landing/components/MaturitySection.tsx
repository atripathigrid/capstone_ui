interface Tier {
  emoji: string;
  title: string;
  body: string;
  tag: string;
  border: string;
  tagColor: string;
}

const TIERS: Tier[] = [
  {
    emoji: "🌱",
    title: "Tier 1: Foundational",
    body: "Automates simple CRM hygiene metrics, contact record duplication scans, and activity tracking summaries.",
    tag: "Low-Risk Hygiene",
    border: "border-t-secondary",
    tagColor: "text-secondary",
  },
  {
    emoji: "🌿",
    title: "Tier 2: Intermediate",
    body: "Applies vertical-specific qualification logic, stage nudge alerts, and multi-threading stakeholder maps.",
    tag: "Process Guidance",
    border: "border-t-secondary/60",
    tagColor: "text-secondary",
  },
  {
    emoji: "🔥",
    title: "Tier 3: Advanced",
    body: "Bridges pre-sales ecosystems for proposal skeletons, battlecards, and delivery health integration triggers.",
    tag: "Cross-System Context",
    border: "border-t-primary",
    tagColor: "text-primary",
  },
  {
    emoji: "🧬",
    title: "Tier 4: Expert",
    body: "Mines cross-vertical expansion patterns and executes deal archetype forecast models.",
    tag: "Strategic Optimization",
    border: "border-t-primary/60",
    tagColor: "text-primary",
  },
  {
    emoji: "🚀",
    title: "Tier 5: Adaptive OS",
    body: "Establishes closed-loop autonomous playbook refinement under continuous human checkpoint visibility.",
    tag: "Governed Learning",
    border: "border-t-error",
    tagColor: "text-error",
  },
];

export function MaturitySection() {
  return (
    <section id="maturity-model" className="max-w-7xl mx-auto px-8 py-16 space-y-12 scroll-trigger">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h3 className="text-xs font-bold uppercase text-secondary tracking-widest">
          Implementation Blueprint
        </h3>
        <h2 className="text-3xl md:text-5xl text-white font-extrabold tracking-tight">
          Revenue Operating Maturity Tiers
        </h2>
        <p className="text-on-surface-variant text-base">
          A phased implementation roadmap designed to turn scattered account observations into
          structured, institutional learning frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 pt-6">
        {TIERS.map((tier) => (
          <div
            key={tier.title}
            className={`glass-card p-6 rounded-xl flex flex-col justify-between space-y-6 border-t-2 ${tier.border}`}
          >
            <div className="space-y-3">
              <span className="text-3xl">{tier.emoji}</span>
              <h4 className="text-base font-bold text-white leading-snug">{tier.title}</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">{tier.body}</p>
            </div>
            <span
              className={`text-[10px] font-mono uppercase font-semibold tracking-wider ${tier.tagColor}`}
            >
              {tier.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
