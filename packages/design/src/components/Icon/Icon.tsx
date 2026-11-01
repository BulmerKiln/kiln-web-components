/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useId } from "react";
import classNames from "../../utils/classNames";
import { kilnMark, markAccessibility } from "../../utils/kilnMark";
import type { IconProps } from "./Icon.types";
import {
  emberShapes,
  emberTransform,
  flameShapes,
  flameSplines,
  useReducedMotion,
} from "./Icon.utils";

// brand-700 on white is 7.42:1, brand-300 on ash-950 8.36:1.
const kiln = "fill-brand-700 dark:fill-brand-300";
// The dark flame keeps a page-colored outline, so it reads apart from the kiln.
const flame = "fill-white dark:fill-accent-200 dark:stroke-ash-950";
// The ember is decoration inside the flame: accent-200 in the white flame, accent-400 in the yellow one.
const ember = "fill-accent-200 dark:fill-accent-400";

export function Icon({
  variant = "color",
  animated = false,
  label,
  className,
}: IconProps) {
  const reduced = useReducedMotion();
  const burning = animated && !reduced;
  const maskId = `kiln-flame-${useId().replace(/[^\w-]/g, "")}`;
  const mono = variant === "mono";
  return (
    <svg
      viewBox={kilnMark.viewBox}
      width="1em"
      height="1em"
      className={classNames("shrink-0", className)}
      {...markAccessibility(label)}
    >
      {mono && (
        <mask id={maskId}>
          <rect width="64" height="64" fill="white" />
          <path
            d={kilnMark.flame}
            transform={kilnMark.flameTransform}
            fill="black"
          />
        </mask>
      )}
      <g className={kiln} mask={mono ? `url(#${maskId})` : undefined}>
        <path d={kilnMark.dome} />
        <rect {...kilnMark.base} />
      </g>
      {!mono && (
        <g data-part="flame">
          <path
            d={kilnMark.flame}
            transform={kilnMark.flameTransform}
            className={flame}
            strokeWidth={3.4}
            strokeLinejoin="round"
            paintOrder="stroke"
          >
            {burning && (
              <animate
                attributeName="d"
                values={flameShapes}
                dur="1.6s"
                calcMode="spline"
                keySplines={flameSplines}
                repeatCount="indefinite"
              />
            )}
          </path>
          {animated && (
            <path
              d={kilnMark.flame}
              transform={emberTransform}
              className={ember}
              data-part="ember"
            >
              {burning && (
                <>
                  <animate
                    attributeName="d"
                    values={emberShapes}
                    dur="1.1s"
                    calcMode="spline"
                    keySplines={flameSplines}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.75;1;0.8;1;0.75"
                    dur="1.3s"
                    repeatCount="indefinite"
                  />
                </>
              )}
            </path>
          )}
        </g>
      )}
    </svg>
  );
}
