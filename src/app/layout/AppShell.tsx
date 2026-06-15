import type { ReactNode } from 'react';
import { SideNav } from './SideNav';
import { MobileNav } from './MobileNav';
import { useRestorableState } from '@/hooks/useRestorableState';

/**
 * App shell: fixed sidebar + routed content + mobile bottom nav. Mounts the
 * restorable-state machinery so Back/Forward rehydrate the user's UI state.
 */
export function AppShell({ children }: { children: ReactNode }) {
  useRestorableState();

  return (
    <>
      <SideNav />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[240px] bg-[#0d0f10] min-h-screen">
        {children}
      </div>
      <MobileNav />
    </>
  );
}
