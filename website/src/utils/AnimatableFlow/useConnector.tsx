import { useId, useLayoutEffect, useRef, useState } from "react";
import { UseElementHookReturn } from "./types";

type AnchorHorizontal = 'left' | 'right';
type AnchorVertical = 'top' | 'bottom';
type Anchor = AnchorHorizontal | AnchorVertical | `${AnchorHorizontal}-${AnchorVertical}` | `${AnchorVertical}-${AnchorHorizontal}`;
type AnchorOffset = number | `${number}%`;

interface UseConnectorHookProps {
  source: UseElementHookReturn<SVGGraphicsElement>;
  target: UseElementHookReturn<SVGGraphicsElement>;

  sourceAnchor?: Anchor;
  sourceAnchorOffset?: AnchorOffset;

  targetAnchor?: Anchor;
  targetAnchorOffset?: AnchorOffset;

  r?: number;
}

interface UseConnectorHookReturn extends
  UseElementHookReturn<SVGPathElement>
{
}

function calculateAnchorPosition(anchor: Anchor, bbox: DOMRect | null, offset: AnchorOffset): { x: number, y: number } {
  if (!bbox) {
    return { x: 0, y: 0 };
  }

  const { x = 0, y = 0, width = 0, height = 0 } = bbox;

  let anchorX = x;
  let anchorY = y;

  // Calculate base anchor position
  if (anchor.includes('left')) {
    anchorX = x;
  } else if (anchor.includes('right')) {
    anchorX = x + width;
  } else {
    anchorX = x + width / 2;
  }

  if (anchor.includes('top')) {
    anchorY = y;
  } else if (anchor.includes('bottom')) {
    anchorY = y + height;
  } else {
    anchorY = y + height / 2;
  }

  // Apply offset
  const offsetX = typeof offset === 'number'
    ? offset
    : parseFloat(offset.replace('%', '')) / 100 * width;
  const offsetY = typeof offset === 'number'
    ? offset
    : parseFloat(offset.replace('%', '')) / 100 * height;

  // Apply offset based on anchor direction
  if (anchor.includes('left')) {
    anchorX -= offsetX;
  } else if (anchor.includes('right')) {
    anchorX += offsetX;
  } else {
    anchorX += offsetX;
  }

  if (anchor.includes('top')) {
    anchorY -= offsetY;
  } else if (anchor.includes('bottom')) {
    anchorY += offsetY;
  } else {
    anchorY += offsetY;
  }

  return { x: anchorX, y: anchorY };
}

function getAnchorDirection(anchor: Anchor): { isHorizontal: boolean; isPositive: boolean } {
  // Determine if anchor is primarily horizontal or vertical
  if (anchor.startsWith('left')) {
    return { isHorizontal: true, isPositive: false }; // Go left (negative X)
  } else if (anchor.startsWith('right')) {
    return { isHorizontal: true, isPositive: true }; // Go right (positive X)
  } else if (anchor.startsWith('top')) {
    return { isHorizontal: false, isPositive: false }; // Go up (negative Y)
  } else if (anchor.startsWith('bottom')) {
    return { isHorizontal: false, isPositive: true }; // Go down (positive Y)
  }
  // Default to right if unclear
  return { isHorizontal: true, isPositive: true };
}

export default function useConnector(props: UseConnectorHookProps): UseConnectorHookReturn {
  const {
    source,
    target,

    sourceAnchor = 'right',
    sourceAnchorOffset = 0,

    targetAnchor = 'left',
    targetAnchorOffset = 0,

    r: _r = 0,

    ...restProps
  } = props ?? {};

  const id = useId();
  const ref = useRef<SVGPathElement>(null);

  const [sourceBBox, setSourceBBox] = useState<DOMRect | null>(null);
  const [targetBBox, setTargetBBox] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    const $source = source.ref.current;
    const $target = target.ref.current;

    if ($source && $target) {
      setSourceBBox($source.getBBox());
      setTargetBBox($target.getBBox());
    }
  }, [source.ref, target.ref]);

  const { x: sx, y: sy } = calculateAnchorPosition(sourceAnchor, sourceBBox, sourceAnchorOffset);
  const { x: tx, y: ty } = calculateAnchorPosition(targetAnchor, targetBBox, targetAnchorOffset);

  // Calculate the radius for rounded corners
  const radius = _r > 0 ? _r : 0;

  // Leading line length - small segment perpendicular to anchor edge
  const leadingLength = 8;

  // Calculate leading segment end points (perpendicular to anchor edges)
  const sourceDir = getAnchorDirection(sourceAnchor);
  const targetDir = getAnchorDirection(targetAnchor);

  const sourceLeadX = sourceDir.isHorizontal
    ? sx + (sourceDir.isPositive ? leadingLength : -leadingLength)
    : sx;
  const sourceLeadY = sourceDir.isHorizontal
    ? sy
    : sy + (sourceDir.isPositive ? leadingLength : -leadingLength);

  const targetLeadX = targetDir.isHorizontal
    ? tx + (targetDir.isPositive ? leadingLength : -leadingLength)
    : tx;
  const targetLeadY = targetDir.isHorizontal
    ? ty
    : ty + (targetDir.isPositive ? leadingLength : -leadingLength);

  // Determine the direction for the stepped path (using leading segment end points)
  const dx = targetLeadX - sourceLeadX;
  const dy = targetLeadY - sourceLeadY;

  // Determine if we should go horizontal first or vertical first
  // Go horizontal first if the horizontal distance is greater, otherwise vertical first
  const goHorizontalFirst = Math.abs(dx) > Math.abs(dy);

  // Start path from source anchor
  let pathData = `M ${sx} ${sy} `;

  // Add leading straight line from source anchor (perpendicular to edge)
  pathData += `L ${sourceLeadX} ${sourceLeadY} `;

  if (radius > 0) {
    // Create a stepped path with rounded corners
    if (goHorizontalFirst) {
      // Horizontal first: go right/left, then up/down with rounded corner
      // Calculate the point where horizontal line ends (before corner)
      const cornerStartX = targetLeadX - (dx > 0 ? radius : -radius);
      const cornerStartY = sourceLeadY;

      // Calculate the point where vertical line starts (after corner)
      const cornerEndX = targetLeadX;
      const cornerEndY = sourceLeadY + (dy > 0 ? radius : -radius);

      // Horizontal line to before the corner (if there's enough distance)
      if (Math.abs(cornerStartX - sourceLeadX) > radius) {
        pathData += `L ${cornerStartX} ${cornerStartY} `;
      }

      // Rounded corner: quarter circle arc
      // Determine sweep flag: 1 for clockwise, 0 for counter-clockwise
      // For bottom-right (dx>0, dy>0) or top-left (dx<0, dy<0): sweep = 1
      // For top-right (dx>0, dy<0) or bottom-left (dx<0, dy>0): sweep = 0
      const sweepFlag = (dx > 0 && dy > 0) || (dx < 0 && dy < 0) ? 1 : 0;
      pathData += `A ${radius} ${radius} 0 0 ${sweepFlag} ${cornerEndX} ${cornerEndY} `;

      // Vertical line to target (if there's enough distance)
      const finalY = targetLeadY - (dy > 0 ? radius : -radius);
      if (Math.abs(targetLeadY - cornerEndY) > radius) {
        pathData += `L ${cornerEndX} ${finalY} `;
      }

      // Line to target leading point, then to target anchor
      pathData += `L ${targetLeadX} ${targetLeadY} `;
      pathData += `L ${tx} ${ty}`;
    } else {
      // Vertical first: go up/down, then right/left with rounded corner
      // Calculate the point where vertical line ends (before corner)
      const cornerStartX = sourceLeadX;
      const cornerStartY = targetLeadY - (dy > 0 ? radius : -radius);

      // Calculate the point where horizontal line starts (after corner)
      // The arc ends at the point where we start the horizontal line
      const cornerEndX = sourceLeadX + (dx > 0 ? radius : -radius);
      const cornerEndY = targetLeadY;

      // Vertical line to before the corner (if there's enough distance)
      if (Math.abs(cornerStartY - sourceLeadY) > radius) {
        pathData += `L ${cornerStartX} ${cornerStartY} `;
      }

      // Rounded corner: quarter circle arc
      // Determine sweep flag
      const sweepFlag = (dx > 0 && dy > 0) || (dx < 0 && dy < 0) ? 1 : 0;
      pathData += `A ${radius} ${radius} 0 0 ${sweepFlag} ${cornerEndX} ${cornerEndY} `;

      // Horizontal line to target (if there's enough distance)
      const finalX = targetLeadX - (dx > 0 ? radius : -radius);
      if (Math.abs(targetLeadX - cornerEndX) > radius) {
        pathData += `L ${finalX} ${cornerEndY} `;
      }

      // Line to target leading point, then to target anchor
      pathData += `L ${targetLeadX} ${targetLeadY} `;
      pathData += `L ${tx} ${ty}`;
    }
  } else {
    // Simple stepped path without rounded corners
    if (goHorizontalFirst) {
      // Horizontal then vertical
      pathData += `L ${targetLeadX} ${sourceLeadY} L ${targetLeadX} ${targetLeadY} L ${tx} ${ty}`;
    } else {
      // Vertical then horizontal
      pathData += `L ${sourceLeadX} ${targetLeadY} L ${targetLeadX} ${targetLeadY} L ${tx} ${ty}`;
    }
  }


  const element = (
    <path
      {...restProps}
      id={id}
      ref={ref}
      d={pathData}
      strokeWidth="var(--ctxlink-global-border-width)"
      stroke="var(--ctxlink-border-component)"
    />
  );

  return {
    props: {
      ...restProps,
    },
    id,
    cssId: `#${id}`,
    href: `url(#${id})`,
    element,
    ref,
  }
}