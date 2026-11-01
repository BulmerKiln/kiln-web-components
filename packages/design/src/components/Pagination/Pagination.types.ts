/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType, ReactNode } from "react";

export interface PaginationProps {
  /** The current page, from 1. */
  page: number;
  pageCount: number;
  /** Buttons that call this, for pages held in state. */
  onPageChange?: (page: number) => void;
  /** Links instead of buttons, for pages with their own URL. */
  getHref?: (page: number) => string;
  /** With `getHref`: renders each link with this component, such as an app's router link. */
  linkAs?: ElementType;
  /** A summary beside the controls: "21–40 of 214 versions". */
  summary?: ReactNode;
  /** Names the landmark; defaults to "Pagination". */
  label?: string;
  /** Placement only. */
  className?: string;
}
