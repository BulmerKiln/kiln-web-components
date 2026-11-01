/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export type TableDensity = "comfortable" | "compact";

export interface TableProps {
  /** Names the table and its scroll region; shown above the region (not inside it) unless `hideCaption`. */
  caption: ReactNode;
  hideCaption?: boolean;
  /** TableHead and TableBody. */
  children: ReactNode;
  /** `compact` for dense lists such as tags and layers. */
  density?: TableDensity;
  /** Placement only, on the wrapper around the caption and the scroll region. */
  className?: string;
}
