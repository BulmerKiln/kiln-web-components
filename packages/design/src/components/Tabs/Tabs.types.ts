/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface TabItem {
  /** Stable key for the tab. */
  id: string;
  label: ReactNode;
  panel: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Controlled: the selected tab's index. */
  selectedIndex?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  /** Placement only. */
  className?: string;
}
