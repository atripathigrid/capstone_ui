import { AgentContextCard } from "./AgentContextCard";
import { ChatBubble } from "./ChatBubble";

interface Props {
  onInsertPrompt: (text: string) => void;
}

/** Deal-detail context — swapped in on a /opportunities/:id route. */
export function DealContextCards({ onInsertPrompt }: Props) {
  return (
    <div className="chat-context-group space-y-4">
      <AgentContextCard
        icon="bolt"
        eyebrow="Stage Stall Alert"
        title={
          <>
            This deal is stalling at <span className="text-secondary font-semibold">Technical Validation</span>
          </>
        }
        body="18 days in stage vs. 12-day average for FinTech $1M+ deals. Similar stalled deals that recovered had an executive sponsor intro at day 10."
        primary={{
          label: "Draft Exec Email",
          onClick: () => onInsertPrompt("Draft the exec email — and pull the compliance case study."),
        }}
        secondary={{ label: "Dismiss" }}
      />

      <AgentContextCard
        icon="group"
        eyebrow="Multi-Thread Gap"
        title="Add Legal/Procurement Contact"
        body={
          <>
            73% of won FinTech deals &gt;$1M had a legal contact by Technical Validation. Suggest reaching{" "}
            <span className="text-secondary font-medium">David Kim</span> to intro.
          </>
        }
        primary={{ label: "Create Task" }}
        secondary={{ label: "Later" }}
      />

      <AgentContextCard
        icon="radar"
        eyebrow="Competitive Intel"
        title={
          <>
            <span className="text-secondary font-bold">Epam</span> is in this deal
          </>
        }
        body={
          <>
            Based on call transcript analysis — buyer mentioned "offshore options." GD wins FinTech vs. Epam by
            emphasizing on-shore <span className="text-secondary font-medium">AI/ML depth + compliance expertise</span>.
          </>
        }
        primary={{ label: "View Battle Card", variant: "outline" }}
        secondary={{ label: "Noted" }}
      />

      <div className="space-y-3 mt-4 pt-4 border-t border-white/5">
        <ChatBubble author="SARAH CHEN • AE" side="user">
          What's the best approach to unstall this SPG-VISA deal? They've gone quiet after the technical demo.
        </ChatBubble>

        <ChatBubble author="EVOFORGE AGENT" side="agent">
          <p>Based on 47 similar FinTech deals at the Technical Validation stage, here's what works:</p>
          <p>
            <strong className="text-white">1. Executive Sponsor Bridge</strong> — 82% of recovered deals had
            CTO-to-CTO connection. I can draft an email from your VP Eng to their CTO James Wu.
          </p>
          <p>
            <strong className="text-secondary">2. POC Proposal</strong> — Offer a 2-week paid proof-of-concept on
            their fraud detection use case.
          </p>
          <div className="bg-[#171b1c] p-2 rounded border border-white/[0.03] mt-2">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block mb-1">
              Quick Actions
            </span>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() =>
                  onInsertPrompt("Draft the exec email for Visa — and pull the compliance case study.")
                }
                className="px-2 py-1 rounded bg-surface-container border border-white/5 text-secondary hover:bg-secondary hover:text-on-secondary text-[9px] font-bold transition-all"
              >
                Draft Exec Email
              </button>
              <button className="px-2 py-1 rounded bg-surface-container border border-white/5 text-secondary hover:bg-secondary hover:text-on-secondary text-[9px] font-bold transition-all">
                Generate POC Scope
              </button>
            </div>
          </div>
        </ChatBubble>
      </div>
    </div>
  );
}
