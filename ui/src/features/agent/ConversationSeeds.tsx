import { Icon } from "@/components/Icon";

interface Props {
  isDealContext: boolean;
  onInsertPrompt: (text: string) => void;
}

function Seed({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-2 bg-surface-container/40 border border-white/5 hover:border-secondary/20 rounded text-left text-xs text-on-surface-variant hover:text-white transition-all flex items-center gap-2"
    >
      <Icon name="chat_bubble" className="text-secondary text-sm" />
      <span className="truncate">{label}</span>
    </button>
  );
}

/** Conversation seeds — swap with route, matching the original group toggle. */
export function ConversationSeeds({ isDealContext, onInsertPrompt }: Props) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
        Conversation Seeds
      </span>
      <div className="flex flex-col gap-1.5">
        {isDealContext ? (
          <div className="space-y-1.5">
            <Seed
              label="Approach to un-stall SPG-VISA deal?"
              onClick={() =>
                onInsertPrompt(
                  "What's the best approach to unstall this SPG-VISA deal? They've gone quiet after the technical demo.",
                )
              }
            />
            <Seed
              label="Draft exec email + compliance metrics"
              onClick={() => onInsertPrompt("Draft the exec email — and pull the compliance case study.")}
            />
          </div>
        ) : (
          <div className="space-y-1.5">
            <Seed
              label="Review portfolio active strategies"
              onClick={() =>
                onInsertPrompt(
                  "Show me all pending strategy tasks that are currently marked overdue across accounts.",
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
