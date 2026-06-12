import { useRef } from "react";
import { useMatch } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { ROUTE_PATTERNS } from "@/config/routes";
import { useUiStore } from "@/store/uiStore";
import { UserContextCards } from "@/features/agent/UserContextCards";
import { DealContextCards } from "@/features/agent/DealContextCards";
import { ConversationSeeds } from "@/features/agent/ConversationSeeds";

/**
 * EvoForge agent rail. Reacts to the active route (route-driven conditional
 * rendering, replacing the old DOM class toggle): deal-context group on a deal
 * detail route, user-context group everywhere else. The chat draft is
 * controlled state in the Zustand UI store, so it survives Back/Forward
 * (Requirement 4c) — this replaces the imperative insertPrompt() DOM write.
 */
export function AgentRail() {
  const isDealContext = Boolean(useMatch(ROUTE_PATTERNS.opportunityDetail));
  const chatDraft = useUiStore((s) => s.chatDraft);
  const setChatDraft = useUiStore((s) => s.setChatDraft);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const insertPrompt = (text: string) => {
    setChatDraft(text);
    inputRef.current?.focus();
  };

  return (
    <div className="w-80 kinetic-ai-chat flex flex-col h-full shrink-0 bg-[#0d0f10]">
      <div className="p-4 border-b border-white/5 flex flex-col gap-2 shrink-0 bg-[#0d0f10]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#49c5b6]/10 text-secondary flex items-center justify-center font-black text-[10px]">
              E
            </div>
            <h3 className="text-xs font-bold text-white tracking-wide">EvoForge Agent</h3>
          </div>
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-[#1c302d] text-secondary">
            <span className="inline-block w-1 h-1 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-[8px] font-black uppercase tracking-wider">Live</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 mt-1 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1">
            <button
              onClick={() => alert("Displaying message transcript timeline log ledger...")}
              className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium text-on-surface-variant/70 hover:text-secondary hover:bg-secondary/5 border border-transparent hover:border-secondary/10 transition-all"
            >
              <Icon name="history" className="text-[14px]" />
              <span>History</span>
            </button>
            <button
              onClick={() =>
                confirm("Purge local active intelligence session transcript ledger history?") &&
                alert("Chat narrative context wiped clean.")
              }
              className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium text-on-surface-variant/70 hover:text-error hover:bg-error/5 border border-transparent hover:border-error/10 transition-all"
            >
              <Icon name="delete" className="text-[14px]" />
              <span>Clear</span>
            </button>
          </div>
          <button
            onClick={() => {
              setChatDraft("");
              alert("New session initiated.");
            }}
            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold text-secondary bg-surface-container border border-white/5 hover:bg-secondary hover:text-on-secondary transition-all"
          >
            <Icon name="add" className="text-[14px]" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scroll">
        {isDealContext ? (
          <DealContextCards onInsertPrompt={insertPrompt} />
        ) : (
          <UserContextCards onInsertPrompt={insertPrompt} />
        )}
        <ConversationSeeds isDealContext={isDealContext} onInsertPrompt={insertPrompt} />
      </div>

      <div className="p-3 border-t border-white/5 bg-[#0d0f10]">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            value={chatDraft}
            onChange={(e) => setChatDraft(e.target.value)}
            className="w-full bg-surface-container border-none outline-none focus:ring-0 focus:outline-none rounded py-2 pl-3 pr-10 text-xs text-on-surface placeholder:text-on-surface-variant/30"
            placeholder="Ask EvoForge anything..."
            type="text"
          />
          <button className="absolute right-1.5 p-1 bg-surface-container border border-white/5 text-secondary hover:bg-secondary hover:text-on-secondary rounded transition-all flex items-center justify-center">
            <Icon name="arrow_upward" className="text-sm font-bold" />
          </button>
        </div>
        <div className="mt-2 flex gap-1.5 text-[8px] font-bold uppercase text-on-surface-variant/30 tracking-widest justify-center">
          <span>stall-detector v2.1</span>
          <span>•</span>
          <span>thread-analyzer v1.3</span>
        </div>
      </div>
    </div>
  );
}
