import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/config';
import { Icon } from '@/components/Icon';
import { useSession } from '@/hooks/useSession';

interface NavItem {
  to: string;
  icon: string;
  label: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.dashboard, icon: 'dashboard', label: 'Dashboard' },
  { to: ROUTES.registry, icon: 'inventory_2', label: 'Skill Registry', badge: '2' },
  { to: ROUTES.workflows, icon: 'account_tree', label: 'Workflows' },
  { to: ROUTES.guardrails, icon: 'gpp_maybe', label: 'Guardrails' },
];

/** Navigation drawer — ported from the original <aside>. NavLink active
 *  styling replaces the manual classList toggling of the old switchPage(). */
export function SideNav() {
  const { data: session } = useSession();

  return (
    <aside className="w-[240px] h-full fixed left-0 top-0 border-r border-white/5 bg-[#0d0f10] hidden lg:flex flex-col py-6 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-9 h-9 bg-secondary/10 flex items-center justify-center rounded-xl border border-secondary/20">
          <Icon name="terminal" className="text-secondary text-xl" />
        </div>
        <div>
          <h1 className="text-lg font-headline-lg font-bold text-on-surface tracking-tight">EvoForge</h1>
          <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest opacity-50">
            Admin Console
          </p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? 'bg-secondary/10 text-secondary font-bold flex items-center px-4 py-2.5 transition-all rounded-lg'
                : 'text-on-surface-variant hover:bg-surface-container-highest/30 flex items-center px-4 py-2.5 transition-all rounded-xl group'
            }
          >
            <Icon name={item.icon} className="mr-4 text-[20px]" />
            {item.badge ? (
              <span className="font-body-md text-body-md flex items-center justify-between w-full">
                <span>{item.label}</span>
                <span className="text-[10px] bg-tertiary-container/20 text-tertiary-container border border-tertiary-container/30 rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center font-mono font-bold tracking-tight">
                  {item.badge}
                </span>
              </span>
            ) : (
              <span className="font-body-md text-body-md">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-4 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-secondary/20 flex items-center justify-center text-secondary font-bold border border-secondary/30 text-xs">
            {session?.initials ?? 'NS'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-body-md text-body-md font-bold text-on-surface truncate">
              {session?.displayName ?? 'Naresh Shah'}
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">
              {session?.role ?? 'RevOps Lead'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
