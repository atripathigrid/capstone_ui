import { create } from "zustand";

export type CapabilityTab = "summarization" | "journey" | "agent";

/**
 * UI store (plan Requirement 2/4c). Holds the user-mutable, restorable UI state
 * that replaces the original imperative DOM toggling (openAuthModal,
 * switchCapabilityTab, triggerAuthWithFields). On Back/Forward this slice is
 * rehydrated from history so the page reappears the way the user left it.
 */
export interface RestorableUi {
  authModalOpen: boolean;
  activeCapabilityTab: CapabilityTab;
  usernameDraft: string;
  passwordDraft: string;
}

interface UiState extends RestorableUi {
  openAuthModal: (prefill?: { username: string; password: string }) => void;
  closeAuthModal: () => void;
  setCapabilityTab: (tab: CapabilityTab) => void;
  setUsernameDraft: (v: string) => void;
  setPasswordDraft: (v: string) => void;
  /** Bulk rehydrate, used by useRestorableState on popstate. */
  hydrate: (slice: RestorableUi) => void;
  snapshot: () => RestorableUi;
}

const initial: RestorableUi = {
  authModalOpen: false,
  activeCapabilityTab: "summarization",
  usernameDraft: "",
  passwordDraft: "",
};

export const useUiStore = create<UiState>((set, get) => ({
  ...initial,
  openAuthModal: (prefill) =>
    set({
      authModalOpen: true,
      ...(prefill
        ? { usernameDraft: prefill.username, passwordDraft: prefill.password }
        : {}),
    }),
  closeAuthModal: () => set({ authModalOpen: false }),
  setCapabilityTab: (activeCapabilityTab) => set({ activeCapabilityTab }),
  setUsernameDraft: (usernameDraft) => set({ usernameDraft }),
  setPasswordDraft: (passwordDraft) => set({ passwordDraft }),
  hydrate: (slice) => set({ ...slice }),
  snapshot: () => {
    const { authModalOpen, activeCapabilityTab, usernameDraft, passwordDraft } = get();
    return { authModalOpen, activeCapabilityTab, usernameDraft, passwordDraft };
  },
}));
