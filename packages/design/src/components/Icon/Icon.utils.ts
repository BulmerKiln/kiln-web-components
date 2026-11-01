/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useSyncExternalStore } from "react";
import { kilnMark } from "../../utils/kilnMark";

/**
 * The ember: the flame's own shape at 55%, standing on the flame's base
 * (32, 46 on the 64 grid), so it glows inside the flame while the mark animates.
 */
export const emberTransform = `translate(32 46) scale(0.55) translate(-32 -46) ${kilnMark.flameTransform}`;

/*
 * Outlines the flame moves through, in the flame path's own coordinates. Each
 * keeps the mark's commands (M, six C, Z) so SVG can morph between them, and
 * the base (the sides at y 39, the bottom at 32 48) so it burns in place: only
 * the tip and the left tongue move. The first is the mark itself.
 */
const resting = kilnMark.flame;
const leanRight =
  "M34 18.5C35 27 40 30 40 39C40 44.5 36.4 48 32 48C27.6 48 24 44.5 24 39C24 35 25.4 32.6 " +
  "27 30.5C27.6 33.2 29.2 34.6 30.8 34.5C31 29 32 23.5 34 18.5Z";
const leanLeft =
  "M30.2 22.5C31.5 29 40 31.5 40 39C40 44.5 36.4 48 32 48C27.6 48 24 44.5 24 39C24 36 25.8 34.2 " +
  "28 32.5C28.1 34.4 29.1 35.4 30.3 35.6C29.4 31 29.2 26 30.2 22.5Z";
const stretch =
  "M32.6 19.5C33.8 27 39.6 30.6 40 39C40 44.5 36.4 48 32 48C27.6 48 24 44.5 24 39C24 35.2 25.2 33 " +
  "26.6 30.8C27.2 33.4 28.8 34.8 30.6 35C30.2 30 30.6 24 32.6 19.5Z";

/** SMIL `values` for the flame and, in a different order, the ember. */
export const flameShapes = [resting, leanRight, leanLeft, stretch, resting].join(";");
export const emberShapes = [resting, stretch, leanLeft, leanRight, resting].join(";");

/** Ease in and out between each of the four steps. */
export const flameSplines = Array(4).fill(".45 0 .55 1").join(";");

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

function reducedMotion() {
  return (
    window.matchMedia(reducedMotionQuery).matches ||
    document.documentElement.dataset.motion === "reduce"
  );
}

/**
 * Whether motion should stop: the operating system asks for less, or the app
 * set `data-motion="reduce"` on <html>. SMIL ignores CSS, so the theme's
 * reduce-motion variant can't stop it; this decides whether to render it.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, reducedMotion, () => false);
}
