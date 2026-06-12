interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

/** Material Symbols icon — thin wrapper over the ported .material-symbols-outlined. */
export function Icon({ name, className = "", filled = false }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${filled ? "icon-filled" : ""} ${className}`}>
      {name}
    </span>
  );
}
