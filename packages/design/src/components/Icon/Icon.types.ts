/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export type IconVariant = "color" | "mono";

export interface IconProps {
  /** `color` has a white flame (accent in dark); `mono` cuts the flame out of the kiln. */
  variant?: IconVariant;
  /**
   * The flame burns: its outline licks and leans, an ember flickers inside it,
   * for loading (`SpinnerOverlay`). Color variant only; reduced
   * motion keeps it still.
   */
  animated?: boolean;
  /** Names the mark as an image. Leave it out when visible text already names it. */
  label?: string;
  /** Size (`size-8`) and placement; 1em square without one. */
  className?: string;
}
