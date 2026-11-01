/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KbdProps {
  /**
   * The keys pressed together, in order: `["mod", "K"]`. `mod` is ⌘ on Apple
   * platforms and Ctrl elsewhere; `shift`, `alt`, `enter`, `escape`, `up`,
   * `down`, `left` and `right` show their symbols.
   */
  keys: string[];
  /** Placement only. */
  className?: string;
}
