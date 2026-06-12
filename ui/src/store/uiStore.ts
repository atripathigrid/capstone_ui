import { create } from "zustand";
import type { RestorableSnapshot } from "@/lib/history";

// User-mutable UI state (Requirement 4c). Elements are controlled by this store
// so that on Back/Forward they re-render the user's last state, not defaults.
// The slice here is what useRestorableState serializes into history.state.
interface UiState {
  /** Your-Deals "Show All Active Deals" expansion toggle. */
  showingAllDeals: boolean;
  /** EvoForge chat-input draft. */
  chatDraft: string;
  /** Per-route saved scroll offset of the main content pane. */
  scrollTop: number;

  setShowingAllDeals: (value: boolean) => void;
  toggleShowingAllDeals: () => void;
  setChatDraft: (value: string) => void;
  setScrollTop: (value: number) => void;

  /** Replace the whole restorable slice (used on Back/Forward hydration). */
  hydrate: (snapshot: RestorableSnapshot) => void;
  /** Read the current restorable slice for serialization. */
  snapshot: () => RestorableSnapshot;
}

const DEFAULTS = {
  showingAllDeals: false,
  chatDraft: "",
  scrollTop: 0,
};

export const useUiStore = create<UiState>((set, get) => ({
  ...DEFAULTS,

  setShowingAllDeals: (value) => set({ showingAllDeals: value }),
  toggleShowingAllDeals: () => set((s) => ({ showingAllDeals: !s.showingAllDeals })),
  setChatDraft: (value) => set({ chatDraft: value }),
  setScrollTop: (value) => set({ scrollTop: value }),

  hydrate: (snapshot) =>
    set({
      showingAllDeals: Boolean(snapshot.showingAllDeals ?? DEFAULTS.showingAllDeals),
      chatDraft: String(snapshot.chatDraft ?? DEFAULTS.chatDraft),
      scrollTop: Number(snapshot.scrollTop ?? DEFAULTS.scrollTop),
    }),

  snapshot: () => {
    const { showingAllDeals, chatDraft, scrollTop } = get();
    return { showingAllDeals, chatDraft, scrollTop };
  },
}));
