/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface EmptyStateProps {
  /** A decorative icon from `@bulmerkiln/design/icons`. */
  icon?: ReactNode;
  title: ReactNode;
  /** Why it's empty and what would fill it. */
  description?: ReactNode;
  /** The action that fills it, such as a primary Button. */
  action?: ReactNode;
  /** The title's element, to fit the page's heading order. */
  headingLevel?: 2 | 3 | 4;
  /** Placement only. */
  className?: string;
}
