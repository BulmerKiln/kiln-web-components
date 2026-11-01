/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SegmentedControlSize } from "../SegmentedControl/SegmentedControl.types";

export interface ThemeToggleProps {
  /** Shows "System", "Light" and "Dark" beside the icons; otherwise they're read but not shown. */
  showLabels?: boolean;
  size?: SegmentedControlSize;
  /** Placement only. */
  className?: string;
}
