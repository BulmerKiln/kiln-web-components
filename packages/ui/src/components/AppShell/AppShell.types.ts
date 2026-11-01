/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface AppShellProps {
  /** The start of the header: usually the Logo, linking home. */
  brand: ReactNode;
  /** The side navigation, usually a SideNav: a column on wide screens, a drawer on narrow ones. */
  nav: ReactNode;
  /** The drawer's title on narrow screens; defaults to "Navigation". */
  navLabel?: string;
  /** The end of the header: organization switcher, theme, user menu. */
  actions?: ReactNode;
  /** A Banner above the header, about the whole app. */
  banner?: ReactNode;
  /** The page: usually a PageHeader, then its content. */
  children: ReactNode;
}
