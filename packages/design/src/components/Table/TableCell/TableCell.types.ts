/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";
import type { TableAlign } from "../TableHeader/TableHeader.types";

export interface TableCellProps {
  children?: ReactNode;
  /** Right-aligned with tabular figures, for numbers. */
  numeric?: boolean;
  align?: TableAlign;
  /** Fira Code, for digests, tags and versions. */
  mono?: boolean;
  colSpan?: number;
  /** Placement only, such as a width. */
  className?: string;
}
