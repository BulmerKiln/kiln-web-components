/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType, ReactNode } from "react";
import type { PolymorphicProps } from "../../types/polymorphic";

export type LinkVariant = "inline" | "standalone";

export interface LinkOwnProps {
  children: ReactNode;
  /**
   * `inline` (default) is always underlined, so it stands apart from the text
   * around it without relying on color. `standalone` underlines on hover, for
   * links that aren't inside running text (lists, cards, navigation).
   */
  variant?: LinkVariant;
  /** Opens in a new tab, with `rel="noopener noreferrer"`, an icon, and "(opens in a new tab)" for screen readers. */
  external?: boolean;
  /** Placement only. */
  className?: string;
}

/** An <a> by default; `as={NextLink}` renders the router's link with these styles. */
export type LinkProps<E extends ElementType = "a"> = PolymorphicProps<E, LinkOwnProps>;
