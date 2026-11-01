/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpinnerProps {
  /** What's loading, read by screen readers: "Loading repositories". */
  label?: string;
  /** Shows the label beside the spinner. */
  showLabel?: boolean;
  /** Size (`size-4`, `size-6`) and placement; 1em without one. */
  className?: string;
}
