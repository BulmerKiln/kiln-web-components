/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export type TableSortDirection = "ascending" | "descending" | "none";
export type TableAlign = "start" | "end" | "center";

export interface TableHeaderProps {
  children: ReactNode;
  /** Right-aligned with tabular figures, for numbers. */
  numeric?: boolean;
  align?: TableAlign;
  /** The column's current sort; set `onSort` to make it sortable. */
  sort?: TableSortDirection;
  /** Makes the header a button that asks to sort by this column. */
  onSort?: () => void;
  /** `row` for a header at the start of each body row. */
  scope?: "col" | "row";
  /** Placement only, such as a width. */
  className?: string;
}
