/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface DescriptionItem {
  term: ReactNode;
  details: ReactNode;
}

export type DescriptionListLayout = "stacked" | "columns";

export interface DescriptionListProps {
  items: DescriptionItem[];
  /**
   * `columns` (default) puts terms beside their details once the list's
   * container is 28rem wide, stacked below that; `stacked` always stacks.
   */
  layout?: DescriptionListLayout;
  /** Placement only. */
  className?: string;
}
