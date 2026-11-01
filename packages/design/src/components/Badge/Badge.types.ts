/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "brand" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  /** The text that says what the badge means; the color only reinforces it. */
  children: ReactNode;
  tone?: BadgeTone;
  size?: BadgeSize;
  /** A decorative icon before the text. */
  icon?: ReactNode;
  /** Placement only. */
  className?: string;
}
