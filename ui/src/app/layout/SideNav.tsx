import { NavLink } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/store/authStore";

const ACTIVE = "text-secondary bg-secondary/5 border-r-2 border-secondary";
const INACTIVE = "text-on-surface-variant hover:text-white hover:bg-white/5";

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  end?: boolean;
}

function NavItem({ to, icon, label, end }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `nav-btn w-full flex items-center gap-4 px-4 py-2.5 transition-all rounded-sm text-left ${
          isActive ? ACTIVE : INACTIVE
        }`
      }
    >
      <Icon name={icon} className="text-xl" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}

const QUICK_ACTIONS = [
  { icon: "person_add", label: "Add Account" },
  { icon: "edit_note", label: "Log Activity" },
  { icon: "cloud_upload", label: "Import Data" },
];

export function SideNav() {
  const user = useAuthStore((s) => s.user);

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col w-60 border-r border-white/5 bg-surface-container-low z-50">
      <div className="px-6 py-8">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Icon name="terminal" className="text-secondary text-2xl" />
          SalesIntel
        </h1>
        <p className="text-xs text-on-surface-variant/50 font-medium tracking-wide mt-0.5">
          Intelligence Terminal
        </p>
      </div>
      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto" id="app-navigation">
        <NavItem to={ROUTES.dashboard} icon="dashboard" label="Dashboard" end />
        <NavItem to={ROUTES.opportunities} icon="monetization_on" label="Opportunities" />
        <NavItem to={ROUTES.activity} icon="layers" label="Activity" />
        <button className="w-full flex items-center gap-4 px-4 py-2.5 text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors rounded-sm text-left">
          <Icon name="settings" className="text-xl" />
          <span className="text-sm font-medium">Settings</span>
        </button>

        <div className="mt-8 px-4">
          <p className="text-[10px] font-semibold text-on-surface-variant/40 uppercase tracking-widest mb-3">
            Quick Actions
          </p>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 w-full py-2 px-3 rounded bg-white/[0.03] border border-white/5 text-on-surface-variant hover:text-on-secondary hover:bg-secondary font-semibold text-xs transition-all">
              <Icon name="add_circle" className="text-lg" />
              New Deal
            </button>
            {QUICK_ACTIONS.map((qa) => (
              <button
                key={qa.label}
                className="flex items-center gap-2 w-full py-2 px-3 rounded bg-surface-container-high text-on-surface/70 font-medium text-xs hairline-border hover:text-white hover:bg-surface-bright transition-all"
              >
                <Icon name={qa.icon} className="text-lg" />
                {qa.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-white/5 bg-surface-container-low/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden border border-white/10 shrink-0">
            <div className="w-full h-full bg-surface-container-highest flex items-center justify-center text-xs font-bold text-secondary">
              {user?.initials ?? "SK"}
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-on-surface truncate">
              {user?.displayName ?? "SK Executive"}
            </p>
            <p className="text-[10px] text-on-surface-variant/60">{user?.role ?? "Admin"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
