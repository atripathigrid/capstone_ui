import { AgentContextCard } from "./AgentContextCard";

interface Props {
  onInsertPrompt: (text: string) => void;
}

/** Dashboard / portfolio context — shown on every non-deal route. */
export function UserContextCards({ onInsertPrompt }: Props) {
  return (
    <div className="chat-context-group space-y-4">
      <AgentContextCard
        icon="bolt"
        eyebrow="Portfolio Risk Vector"
        title="General Account Stalls Identified"
        body="Multiple portfolio pipelines report slowing velocity thresholds. Review active cross-threading across segments."
        primary={{
          label: "Generate Data",
          onClick: () =>
            onInsertPrompt("Generate general portfolio coverage data summary overview."),
        }}
        secondary={{ label: "Ignore" }}
      />
    </div>
  );
}
