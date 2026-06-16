import { useEffect } from "react";

/**
 * Replaces the original DOMContentLoaded IntersectionObserver routine from
 * login_page.html. Adds `.visible` to every `.scroll-trigger` as it enters the
 * viewport. Re-runs when `deps` change (e.g. after route content mounts).
 */
export function useScrollReveal(deps: unknown[] = []): void {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".scroll-trigger");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
