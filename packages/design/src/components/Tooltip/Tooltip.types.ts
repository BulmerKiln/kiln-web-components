/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactElement, ReactNode } from "react";
import type { Placement } from "@floating-ui/react";

/** Where it prefers to sit; it flips to the other side when there's no room. */
export type TooltipPlacement = Extract<Placement, "top" | "bottom" | "left" | "right">;

export interface TooltipProps {
  /** Supplementary text; never the only place something important is said. */
  content: ReactNode;
  /** One focusable element that takes a ref; the tooltip describes it (`aria-describedby`) while shown. */
  children: ReactElement<Record<string, unknown>>;
  placement?: TooltipPlacement;
}
