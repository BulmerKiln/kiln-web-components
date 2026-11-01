/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType, ReactNode } from "react";
import type { PolymorphicProps } from "../../../types/polymorphic";

export interface SideNavItemOwnProps {
  children: ReactNode;
  /** A decorative icon from `@bulmerkiln/design/icons`. */
  icon?: ReactNode;
  /** The page this item leads to is the one showing: `aria-current="page"`. */
  current?: boolean;
  /** A count or Badge at the end: open findings, pending invitations. */
  badge?: ReactNode;
  className?: string;
}

/** An <a> by default; `as` renders an app's router link. */
export type SideNavItemProps<E extends ElementType = "a"> = PolymorphicProps<
  E,
  SideNavItemOwnProps
>;
