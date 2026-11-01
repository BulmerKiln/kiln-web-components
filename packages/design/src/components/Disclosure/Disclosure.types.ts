/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface DisclosureProps {
  /** The button's label: what opening it reveals. */
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /**
   * Wraps the button in a heading at this level, for a run of disclosures
   * (an accordion) that the page's outline should list.
   */
  headingLevel?: 2 | 3 | 4;
  /** A line between it and the next, for a stacked list. */
  divided?: boolean;
  /** Placement only. */
  className?: string;
}
