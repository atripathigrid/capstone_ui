import { type FormEvent } from "react";
import { useUiStore } from "@/store/ui";
import { useLogin } from "@/features/auth/useLogin";

/**
 * Controlled sign-in form. Replaces login_page.html's handleAuthSubmit + the
 * raw DOM reads. Field values live in the UI store so they are restorable
 * (Requirement 4c). Submission goes through the mutation/service layer.
 */
export function SignInForm() {
  const username = useUiStore((s) => s.usernameDraft);
  const password = useUiStore((s) => s.passwordDraft);
  const setUsername = useUiStore((s) => s.setUsernameDraft);
  const setPassword = useUiStore((s) => s.setPasswordDraft);

  const login = useLogin();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login.mutate({ username: username.trim(), password: password.trim() });
  };

  return (
    <>
      {login.isError && (
        <div className="p-3 bg-error/10 border border-error/20 text-error text-xs rounded font-medium">
          {login.error.message}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block"
            htmlFor="username"
          >
            Access Identity
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter identity label..."
            className="w-full bg-[#0d0f10] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary focus:ring-0 transition-all placeholder:text-white/10"
          />
        </div>
        <div className="space-y-1.5">
          <label
            className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block"
            htmlFor="password"
          >
            Passkey Sequence
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter security hash..."
            className="w-full bg-[#0d0f10] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary focus:ring-0 transition-all placeholder:text-white/10"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={login.isPending}
            className="w-full py-2.5 bg-secondary text-on-secondary font-bold text-sm rounded hover:bg-[#49c5b6] transition-all uppercase tracking-wider shadow-lg shadow-secondary/10 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {login.isPending ? "Verifying…" : "Verify Credentials"}
          </button>
        </div>
      </form>
    </>
  );
}
