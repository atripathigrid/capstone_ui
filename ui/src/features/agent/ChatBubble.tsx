import type { ReactNode } from "react";

interface ChatBubbleProps {
  author: ReactNode;
  side: "user" | "agent";
  children: ReactNode;
}

/** A single transcript bubble in the EvoForge conversation. */
export function ChatBubble({ author, side, children }: ChatBubbleProps) {
  if (side === "user") {
    return (
      <div className="flex flex-col gap-1.5 items-end">
        <span className="text-[9px] font-semibold text-on-surface-variant/60 mr-1">{author}</span>
        <div className="bg-surface-container-high p-3 rounded-lg rounded-tr-none border border-white/5 max-w-[95%]">
          <p className="text-xs text-white leading-relaxed">{children}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 items-start">
      <span className="text-[9px] font-bold text-secondary ml-1">{author}</span>
      <div className="bg-[#141819] border border-white/5 p-3 rounded-lg rounded-tl-none max-w-[95%] text-xs space-y-2 text-on-surface-variant leading-relaxed">
        {children}
      </div>
    </div>
  );
}
