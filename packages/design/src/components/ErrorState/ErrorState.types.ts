/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface ErrorStateProps {
  title?: ReactNode;
  /** What failed and what the person can do: "The scan results couldn't load. Try again, or check the instance's status." */
  description?: ReactNode;
  /** Shows a "Try again" button that calls this. */
  onRetry?: () => void;
  /** Other actions beside retry. */
  action?: ReactNode;
  headingLevel?: 2 | 3 | 4;
  /** Placement only. */
  className?: string;
}
