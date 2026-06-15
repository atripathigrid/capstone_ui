interface ToggleRowProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

/** Execution & approval control toggle — ports the peer-checked switch. */
export function ToggleRow({ title, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between py-4 gap-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-on-surface leading-tight">{title}</p>
        <p className="text-xs text-on-surface-variant">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
          type="checkbox"
        />
        <div className="w-11 h-6 bg-[#272b2c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent" />
      </label>
    </div>
  );
}
