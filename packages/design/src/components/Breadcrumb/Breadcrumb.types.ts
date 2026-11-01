/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BreadcrumbItem {
  label: string;
  /** Leave out for the current page, the last item. */
  href?: string;
}

import type { ElementType } from "react";

export interface BreadcrumbProps {
  /** From the top level down to the current page. */
  items: BreadcrumbItem[];
  /**
   * Renders each link with this component instead of <a>, such as an app's
   * router link. It receives `href`, `className` and `children`.
   */
  linkAs?: ElementType;
  /** Names the landmark; defaults to "Breadcrumb". */
  label?: string;
  /** Placement only. */
  className?: string;
}
