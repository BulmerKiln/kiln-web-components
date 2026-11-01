/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { IconVariant } from "../Icon/Icon.types";

export type LogoLayout = "horizontal" | "stacked";
export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps {
  /** `horizontal` for headers; `stacked` for sign-in and empty pages. */
  layout?: LogoLayout;
  size?: LogoSize;
  variant?: IconVariant;
  /** Placement only (margins, grid position), never color or size. */
  className?: string;
}
