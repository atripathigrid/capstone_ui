import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/config';
import { Icon } from '@/components/Icon';

const ITEMS = [
  { to: ROUTES.dashboard, icon: 'dashboard', label: 'Dashboard' },
  { to: ROUTES.registry, icon: 'psychology', label: 'Registry' },
  { to: ROUTES.workflows, icon: 'account_tree', label: 'Workflows' },
  { to: ROUTES.guardrails, icon: 'security', label: 'Guardrails' },
];

/** Mobile bottom navigation — ported from the original bottom <nav>. */
export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 border-t border-white/5 bg-surface-container-low/95 backdrop-blur-xl">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center transition-all active:scale-90 ${
              isActive ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
            }`
          }
        >
          <Icon name={item.icon} />
          <span className="font-label-sm text-[10px] mt-1 uppercase">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
