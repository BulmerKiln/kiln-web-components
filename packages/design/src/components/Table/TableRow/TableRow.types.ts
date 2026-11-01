/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface TableRowProps {
  children: ReactNode;
  /** Marks the row selected, with `aria-selected` and a tint. */
  selected?: boolean;
}
