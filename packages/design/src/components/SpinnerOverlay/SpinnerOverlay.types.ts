/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpinnerOverlayProps {
  /** What's loading, shown under the mark and announced: "Loading acme/api". */
  label?: string;
  /**
   * Covers its nearest positioned ancestor instead of the whole window, for a
   * panel or region that's loading. The ancestor needs `relative`.
   */
  contained?: boolean;
  /** Placement only. */
  className?: string;
}
