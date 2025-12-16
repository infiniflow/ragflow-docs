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

function getComputedColor(s: string) {
  const rootStyle = getRootComputedStyle();

  const reg = /var\((?<varName>--[-\w]+)\)/g;
  let result = s;
  let match: RegExpExecArray | null;

  while (match = reg.exec(s)) {
    const { varName }= match.groups!;

    const value = rootStyle.getPropertyValue(varName);
    result = result.replace(`var(${varName})`, value);
  }

  return result;
};

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
    // Don't regenerate the gradient if it's already cached
    if (cachedGradient) {
      return;
    }

    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d')! as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

    ctx.clearRect(0, 0, 100, 100);

    const gradient = ctx.createLinearGradient(
      100 * x1, 100 * y1,
      100 * x2, 100 * y2,
    );

    stops.forEach(([_offset, color]) => {
      gradient.addColorStop(
        Number.isFinite(_offset) ? Math.min(Math.max(_offset, 0), 1) : 0,
        getComputedColor(color),
      );
    });

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
      });
  }, [cacheKey]);

  return dataURL;
};