import { useCallback, useEffect, useRef } from "react";

/**
 * Framework-agnostic canvas chart hook (replaces the old window load/resize
 * listeners + initGraphics). Redraws on mount, whenever `deps` change, and on a
 * ResizeObserver so charts stay DPR-correct and crisp at any width.
 */
export function useCanvasChart(
  draw: (canvas: HTMLCanvasElement) => void,
  deps: unknown[] = [],
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableDraw = useCallback(draw, deps);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const render = () => stableDraw(canvas);
    render();

    const observer = new ResizeObserver(render);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [stableDraw]);

  return canvasRef;
}
