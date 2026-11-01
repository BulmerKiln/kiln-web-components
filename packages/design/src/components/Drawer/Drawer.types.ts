/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export type DrawerSize = "sm" | "md" | "lg";
export type DrawerSide = "left" | "right";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  /** Scrolls when it's taller than the screen. */
  children?: ReactNode;
  /** Pinned to the bottom. */
  actions?: ReactNode;
  size?: DrawerSize;
  /** The edge it slides from: `right` for detail and forms, `left` for navigation. */
  side?: DrawerSide;
}
