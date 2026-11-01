/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import { kilnMark, markAccessibility } from "../../utils/kilnMark";
import type { IconTileProps } from "./IconTile.types";

/*
 * The tile stays light in the dark theme: brand-700 is only 2.51:1 against
 * ash-950, brand-300 is 8.36:1. The kiln is 6.88:1 against the light tile and
 * 8.36:1 against the dark one; the flame shows the tile's own color.
 */
const tile = "fill-brand-700 dark:fill-brand-300";
const kiln = "fill-brand-50 dark:fill-ash-950";

export function IconTile({ label, className }: IconTileProps) {
  return (
    <svg
      viewBox={kilnMark.viewBox}
      width="1em"
      height="1em"
      className={classNames("shrink-0", className)}
      {...markAccessibility(label)}
    >
      <rect width="64" height="64" rx="14.3" className={tile} />
      <g transform="translate(12.16 11.54) scale(0.62)">
        <g className={kiln}>
          <path d={kilnMark.dome} />
          <rect {...kilnMark.base} />
        </g>
        <path
          d={kilnMark.flame}
          transform={kilnMark.flameTransform}
          className={tile}
        />
      </g>
    </svg>
  );
}
