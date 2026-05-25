import QuickLRU from 'quick-lru';
import { throttle } from 'lodash-es';
import { useLayoutEffect, useRef, useState } from 'react';

type GradientStop = [number, string];

export type GradientPosition = 'top' | 'right' | 'bottom' | 'left' | 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left' | [number, number];

const getRootComputedStyle = throttle(() => window.getComputedStyle(document.documentElement), 100);

function isOffscreenCanvas(canvas: HTMLCanvasElement | OffscreenCanvas): canvas is OffscreenCanvas {
  return window.OffscreenCanvas && canvas instanceof OffscreenCanvas;
}

function createCanvas(width = 100, height = 100) {
  if (window.OffscreenCanvas) {
    return new OffscreenCanvas(width, height);
  }

  const canvasEl = document.createElement('canvas');

  canvasEl.width = width;
  canvasEl.height = height;

  return canvasEl;
}

async function canvasToBlob(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  type = 'image/png',
  quality = 1,
) {
  if (isOffscreenCanvas(canvas)) {
    return canvas.convertToBlob({ type, quality });
  }

  return new Promise<Blob>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

// Fallback values for CSS variables that may not be resolved
const CSS_VAR_FALLBACKS: Record<string, string> = {
  '--ragflow-color-primary': '0 190 180',
  '--ragflow-color-secondary': '117 120 122',
  '--ragflow-color-success': '59 160 92',
  '--ragflow-color-info': '92 150 200',
  '--ragflow-color-warning': '250 173 20',
  '--ragflow-color-danger': '216 73 75',
  '--ragflow-theme-white': '255 255 255',
  '--ragflow-theme-black': '0 0 0',
};

function getComputedColor(s: string) {
  // Handle SSR case where window might not be available
  if (typeof window === 'undefined') {
    return s;
  }

  const rootStyle = getRootComputedStyle();

  // Keep resolving nested var() references until no more are found
  let result = s;
  let maxIterations = 10; // Prevent infinite loops from circular references
  while (maxIterations-- > 0) {
    const reg = /var\((?<varName>--[-\w]+)\)/g;
    let match: RegExpExecArray | null;
    let foundVar = false;

    while (match = reg.exec(result)) {
      const { varName } = match.groups!;
      let value = rootStyle.getPropertyValue(varName).trim();

      // If CSS variable is empty or still a var(), try fallback
      if (!value || value.startsWith('var(')) {
        value = CSS_VAR_FALLBACKS[varName] || '';
      }

      if (value) {
        result = result.replace(`var(${varName})`, value);
        foundVar = true;
      }
    }

    if (!foundVar) {
      break;
    }
  }

  // Check if there are still unresolved var() references and replace with fallback
  result = result.replace(/var\((--[-\w]+)\)/g, (_, varName) => {
    return CSS_VAR_FALLBACKS[varName] || '0 0 0';
  });

  // Canvas API doesn't support CSS Color Level 4 syntax.
  // Two transformations needed:
  // 1. Space-separated RGB: "rgb(0 190 180)" -> "rgb(0, 190, 180)"
  // 2. Slash alpha syntax: "rgb(0, 190, 180 / 0.5)" -> "rgba(0, 190, 180, 0.5)"
  if (result.includes('rgb(') || result.includes('rgba(')) {
    // First: handle space-separated RGB values
    // e.g., "rgb(0 190 180)" -> "rgb(0, 190, 180)"
    result = result.replace(
      /rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([\d.]+))?\s*\)/gi,
      (_, r, g, b, a) => {
        if (a !== undefined) {
          return `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        return `rgb(${r}, ${g}, ${b})`;
      },
    );

    // Second: handle modern slash alpha syntax in already-comma-separated values
    // e.g., "rgb(0, 190, 180 / 0.5)" -> "rgba(0, 190, 180, 0.5)"
    result = result.replace(
      /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\/\s*([\d.]+)\s*\)/gi,
      (_, r, g, b, a) => {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      },
    );
  }

  return result;
};

function isValidColor(color: string): boolean {
  if (!color || color.trim() === '') return false;
  if (/rgba?\(\s*\)/.test(color)) return false;
  if (/rgba?\(\s*,\s*\)/.test(color)) return false;
  if (/rgba?\(\s*,\s*,\s*\)/.test(color)) return false;
  if (color.includes('var(')) return false;
  if (color === 'transparent') return true;
  if (/^#[0-9a-fA-F]{3,8}$/.test(color)) return true;
  if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color)) return true;
  if (/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/.test(color)) return true;
  if (/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(color)) return true;
  if (/^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)$/.test(color)) return true;
  return true;
}

export interface UseLinearGradientProps {
  stops: GradientStop[];
  from?: GradientPosition;
  to?: GradientPosition;
}

const GRADIENT_POSITION_MAP: Record<Exclude<GradientPosition, [number, number]>, [number, number]> = {
  'top': [.5, 0],
  'right': [1, .5],
  'bottom': [.5, 1],
  'left': [0, .5],
  'top-left': [0, 0],
  'top-right': [1, 0],
  'bottom-right': [1, 1],
  'bottom-left': [0, 1],
};

const gradientCache = new QuickLRU<string, string>({
  maxSize: 100,
});

/**
 * Generate a linear gradient data URL, particularly useful for `feImage` SVG filter.
 *
 *
 * @example
 * const gradient = useLinearGradient({
 *   stops: [[0, '#42b6ff'], [1, '#2be8aa']],
 *   from: [0, 0],
 *   to: [0, 1],
 * });
 *
 * <filter>
 *   <feImage href={gradient}>
 * </filter>
 */
export default function useLinearGradient(props: UseLinearGradientProps) {
  const {
    stops,
    from: _from,
    to: _to = [1, .5],
  } = props;

  let [x2, y2] = typeof _to === 'string' ? GRADIENT_POSITION_MAP[_to] : _to;
  let [x1, y1] = _from
    ? typeof _from === 'string'
      ? GRADIENT_POSITION_MAP[_from]
      : _from
    : [1 - x2, 1 - y2];

  const cacheKey = `${stops.join()}-${x1}-${y1}-${x2}-${y2}`;
  const cachedGradient = gradientCache.get(cacheKey);

  const [dataURL, setDataURL] = useState<string | undefined>(cachedGradient);

  useLayoutEffect(() => {
    if (cachedGradient) {
      return;
    }

    try {
      const canvas = createCanvas(100, 100);
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.warn('Canvas context not available');
        return;
      }

      ctx.clearRect(0, 0, 100, 100);

      const gradient = ctx.createLinearGradient(
        100 * x1, 100 * y1,
        100 * x2, 100 * y2,
      );

      let hasValidColors = false;

      stops.forEach(([_offset, color]) => {
        const computedColor = getComputedColor(color);
        
        if (!isValidColor(computedColor)) {
          console.warn(`Invalid color skipped: ${color} -> ${computedColor}`);
          return;
        }

        hasValidColors = true;
        gradient.addColorStop(
          Number.isFinite(_offset) ? Math.min(Math.max(_offset, 0), 1) : 0,
          computedColor,
        );
      });

      if (!hasValidColors) {
        console.warn('No valid colors provided for gradient');
        return;
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 100, 100);

      canvasToBlob(canvas)
        .then((blob) => {
          const fr = new FileReader();

          fr.addEventListener('load', () => {
            setDataURL(fr.result as string);
            gradientCache.set(cacheKey, fr.result as string);
          });

          fr.readAsDataURL(blob);
        })
        .catch((error) => {
          console.warn('Failed to convert canvas to blob:', error);
        });
    } catch (error) {
      console.warn('Failed to create gradient:', error);
    }
  }, [cacheKey]);

  return dataURL;
};