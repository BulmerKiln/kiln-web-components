/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface PageHeaderProps {
  /** The page's one <h1>. */
  title: ReactNode;
  description?: ReactNode;
  /** The page's main actions; put the primary one last. */
  actions?: ReactNode;
  /** A Breadcrumb above the title. */
  breadcrumb?: ReactNode;
  /** Badges or facts beside the title: "Public", "214 versions". */
  meta?: ReactNode;
  /** Placement only. */
  className?: string;
}
