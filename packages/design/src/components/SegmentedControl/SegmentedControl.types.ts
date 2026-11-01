/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface SegmentedControlOption<T> {
  value: T;
  label: ReactNode;
  /** A decorative icon before the label. */
  icon?: ReactNode;
  disabled?: boolean;
}

export type SegmentedControlSize = "sm" | "md";

export interface SegmentedControlProps<T> {
  /** Names the group; not shown, so pick words that make sense read alone: "Time range". */
  label: string;
  /** Two to five options. More belong in a Select. */
  options: SegmentedControlOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  size?: SegmentedControlSize;
  /** Placement only. */
  className?: string;
}
