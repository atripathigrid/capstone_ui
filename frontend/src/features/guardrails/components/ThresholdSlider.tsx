interface ThresholdSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

/** A single promotion-criteria range control (controlled React state, replacing
 *  the original imperative input listeners). */
export function ThresholdSlider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: ThresholdSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-on-surface">{label}</span>
        <span className="text-sm font-bold text-brand-accent">{format(value)}</span>
      </div>
      <div className="relative w-full flex items-center">
        <input
          className="w-full"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
