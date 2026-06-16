import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { ROUTES } from "@/config";

/**
 * Placeholder destination shown after a successful sign-in. The full SalesIntel
 * Command Center (user_ui.html) is out of scope for this build — this confirms
 * the auth → RBAC routing path works end to end.
 */
export function PortalView({ title }: { title: string }) {
  const session = useAuthStore((s) => s.session);
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();

  const signOut = () => {
    clear();
    navigate(ROUTES.landing, { replace: true });
  };

  return (
    <section className="max-w-3xl mx-auto px-8 py-24 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-xs text-secondary font-medium">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
        <span>Connection Established</span>
      </div>
      <h1 className="text-3xl md:text-4xl text-white font-extrabold tracking-tight">{title}</h1>
      <p className="text-on-surface-variant">
        Signed in as <code className="text-white">{session?.username}</code> · Scope:{" "}
        <span className="text-secondary font-semibold">{session?.scope}</span>
      </p>
      <p className="text-on-surface-variant/60 text-sm max-w-xl mx-auto">
        This is a stub landing for the authenticated role. The SalesIntel Command Center workspace
        would mount here.
      </p>
      <button
        onClick={signOut}
        className="px-6 py-2.5 bg-white/5 text-on-surface hover:text-white border border-white/10 rounded-lg hover:bg-white/10 transition-all font-semibold text-sm"
      >
        Terminate Session
      </button>
    </section>
  );
}
