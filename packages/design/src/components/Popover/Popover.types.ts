/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactElement, ReactNode } from "react";

export type PopoverAlign = "start" | "end";
export type PopoverSize = "sm" | "md" | "lg";

export interface PopoverProps {
  /** The button that opens it: a Button or IconButton. */
  trigger: ReactElement;
  /** Interactive content: filters, a short form, details with links. For plain hints, use Tooltip. */
  children: ReactNode;
  align?: PopoverAlign;
  /** Its width: 16, 20 or 24 rem. */
  size?: PopoverSize;
}
