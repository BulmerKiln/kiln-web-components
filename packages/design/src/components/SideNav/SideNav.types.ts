/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface SideNavProps {
  /** Names the landmark: "Organization", "Repository". */
  label: string;
  /** SideNavGroups, or SideNavItems directly. */
  children: ReactNode;
  /** Placement only. */
  className?: string;
}
