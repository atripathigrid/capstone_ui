interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Material Symbols Outlined glyph. */
export function Icon({ name, className = '', style }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`} style={style}>
      {name}
    </span>
  );
}
