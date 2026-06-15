import { create } from 'zustand';

/**
 * UI store — holds user-mutable view state (replacing the original imperative
 * classList / innerHTML toggles). This slice is what the useRestorableState
 * hook serializes into history.state so Back/Forward restore the user's own
 * changes rather than the default render.
 */
export interface UiState {
  // Registry
  registryApprovalFilter: boolean;
  registryActiveTab: 'overview' | 'history' | 'code' | 'eval' | 'dependencies';
  // Workflows
  selectedWorkflowId: string;
  // Guardrails
  guardrailTab: string;

  setRegistryApprovalFilter: (v: boolean) => void;
  toggleRegistryApprovalFilter: () => void;
  setRegistryActiveTab: (t: UiState['registryActiveTab']) => void;
  setSelectedWorkflowId: (id: string) => void;
  setGuardrailTab: (t: string) => void;

  /** Serializable slice persisted into history.state. */
  snapshot: () => RestorableUi;
  hydrate: (s: Partial<RestorableUi>) => void;
}

export type RestorableUi = Pick<
  UiState,
  'registryApprovalFilter' | 'registryActiveTab' | 'selectedWorkflowId' | 'guardrailTab'
>;

export const useUiStore = create<UiState>((set, get) => ({
  registryApprovalFilter: false,
  registryActiveTab: 'overview',
  selectedWorkflowId: 'wf-evo-0912-v2',
  guardrailTab: 'Approval Thresholds',

  setRegistryApprovalFilter: (v) => set({ registryApprovalFilter: v }),
  toggleRegistryApprovalFilter: () =>
    set((s) => ({ registryApprovalFilter: !s.registryApprovalFilter })),
  setRegistryActiveTab: (t) => set({ registryActiveTab: t }),
  setSelectedWorkflowId: (id) => set({ selectedWorkflowId: id }),
  setGuardrailTab: (t) => set({ guardrailTab: t }),

  snapshot: () => {
    const s = get();
    return {
      registryApprovalFilter: s.registryApprovalFilter,
      registryActiveTab: s.registryActiveTab,
      selectedWorkflowId: s.selectedWorkflowId,
      guardrailTab: s.guardrailTab,
    };
  },
  hydrate: (s) => set((prev) => ({ ...prev, ...s })),
}));
