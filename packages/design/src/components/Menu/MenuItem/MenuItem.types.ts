/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType, ReactNode } from "react";

export interface MenuItemProps {
  children: ReactNode;
  /** A decorative icon before the label. */
  icon?: ReactNode;
  onClick?: () => void;
  /** Makes the item a link. */
  href?: string;
  /** For a link item: renders this component instead of <a>, such as an app's router link. */
  as?: ElementType;
  /** A destructive action, in brick. */
  danger?: boolean;
  disabled?: boolean;
}
