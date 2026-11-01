/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/** The Kiln mark's geometry, on a 64 × 64 grid: the dome, its base, and the flame inside. */
export const kilnMark = {
  viewBox: "0 0 64 64",
  dome: "M9 52V32C9 17 19 6 32 6C45 6 55 17 55 32V52Z",
  base: { x: 4, y: 55, width: 56, height: 4, rx: 2 },
  flame:
    "M32 21C33 28 40 31 40 39C40 44.5 36.4 48 32 48C27.6 48 24 44.5 24 39C24 35.5 25.6 33.5 " +
    "27.5 31.5C27.8 33.8 29 35 30.5 35.3C30 30 30.3 25 32 21Z",
  flameTransform: "matrix(1.2 0 0 1.2 -6.4 -11.6)",
} as const;

/** Exposes a mark as an image named `label`, or hides it from assistive technology without one. */
export function markAccessibility(label: string | undefined) {
  return label
    ? ({ role: "img", "aria-label": label } as const)
    : ({ "aria-hidden": true } as const);
}
