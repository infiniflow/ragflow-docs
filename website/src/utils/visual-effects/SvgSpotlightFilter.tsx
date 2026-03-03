import React from "react";

interface Props extends React.SVGAttributes<SVGFilterElement> {
  animateLighting?: React.ReactElement<React.JSX.IntrinsicElements['animate']>;
  animateSpotlight?: React.ReactElement<React.JSX.IntrinsicElements['animate']>;
  spotlightId?: string;
}

export default function SvgSpotlightFilter({
  lightingColor,
  specularConstant = 1.5,
  specularExponent = 3,
  x = 0,
  y = 0,
  z = 100,
  pointsAtX = 0,
  pointsAtY = 0,
  pointsAtZ = 0,
  limitingConeAngle = 15,
  stdDeviation = 6,
  animateLighting,
  animateSpotlight,
  spotlightId,
  ...restProps
}: Props) {
  return (
    <filter
      x="-100%" y="-100%"
      width="300%" height="300%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      {...restProps}
    >

      <feSpecularLighting
        specularConstant={specularConstant}
        specularExponent={specularExponent}
        lightingColor={lightingColor}
        result="light"
      >
        <feSpotLight
          id={spotlightId}
          x={x} y={y} z={z}
          pointsAtX={pointsAtX} pointsAtY={pointsAtY} pointsAtZ={pointsAtZ}
          limitingConeAngle={limitingConeAngle}
        >
          {animateSpotlight}
        </feSpotLight>

        {animateLighting}
      </feSpecularLighting>

      <feGaussianBlur
        in="light"
        stdDeviation={stdDeviation}
        result="blurredLight"
      />

      <feComposite
        in="blurredLight"
        in2="SourceGraphic"
        operator="atop"
      />
    </filter>
  );
}