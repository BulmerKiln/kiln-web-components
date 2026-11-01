/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface SideNavGroupProps {
  /** A heading over the group, which also names its list. */
  label?: string;
  /** SideNavItems. */
  children: ReactNode;
}
