import { useEffect } from "react";
import { useUiStore } from "@/store/ui";
import { SignInForm } from "@/features/auth/SignInForm";

/**
 * Secure Access Terminal modal. Ported from login_page.html's #auth-modal.
 * Open/close state is the controlled UI store (replacing openAuthModal /
 * closeAuthModal DOM toggling) and is restorable via history.
 */
export function AuthModal() {
  const open = useUiStore((s) => s.authModalOpen);
  const close = useUiStore((s) => s.closeAuthModal);

  // Escape closes the modal (ported from the original keydown listener).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 blur-overlay">
      <div className="glass-card rounded-xl max-w-md w-full p-6 space-y-6 relative border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-xl">security</span>
            <h3 className="text-lg text-white font-bold">Secure Access Terminal</h3>
          </div>
          <button
            onClick={close}
            className="text-on-surface-variant hover:text-white transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex border-b border-white/5 text-xs font-semibold uppercase tracking-wider">
          <button className="flex-1 pb-2 border-b-2 border-secondary text-secondary font-bold">
            Sign In
          </button>
          <button
            onClick={() =>
              alert("Directory modification requires direct identity profile tickets.")
            }
            className="flex-1 pb-2 border-b-2 border-transparent text-on-surface-variant hover:text-white transition-colors"
          >
            Federated Add
          </button>
        </div>

        <SignInForm />

        <div className="p-3 bg-white/[0.02] border border-white/5 rounded text-[11px] text-on-surface-variant/60 space-y-0.5">
          <p className="font-bold uppercase tracking-widest text-[9px] text-secondary">
            Authorized Domain Handshakes:
          </p>
          <p className="flex justify-between">
            <span>• RevOps Control Plane:</span> <code className="text-white">admin / admin</code>
          </p>
          <p className="flex justify-between">
            <span>• Operational Terminal:</span> <code className="text-white">user / user</code>
          </p>
        </div>
      </div>
    </div>
  );
}
