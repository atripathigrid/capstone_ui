import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";
import { AgentRail } from "./AgentRail";
import { useRestorableState } from "@/hooks/useRestorableState";
import { useUiStore } from "@/store/uiStore";

/**
 * Application shell — the fixed SideNav, the TopBar, the routed content pane
 * (Outlet), and the EvoForge AgentRail. Mirrors the original index.html body
 * layout 1:1.
 */
export function AppShell() {
  // Wire the Back-button "in-app time machine" (Requirement 4c).
  useRestorableState();

  const location = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);
  const setScrollTop = useUiStore((s) => s.setScrollTop);

  // Restore the saved scroll offset for this history entry after the store has
  // been hydrated (useRestorableState runs its layout effect first).
  useLayoutEffect(() => {
    const el = mainRef.current;
    if (el) el.scrollTop = useUiStore.getState().scrollTop;
  }, [location.key]);

  return (
    <>
      <SideNav />
      <div className="pl-60 flex flex-col flex-1 h-screen overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden w-full">
          <main
            ref={mainRef}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
            className="view-pane flex-1 overflow-y-auto px-8 py-6 custom-scroll"
          >
            <Outlet />
          </main>
          <AgentRail />
        </div>
      </div>
    </>
  );
}
