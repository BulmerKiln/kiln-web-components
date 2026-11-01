/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactElement, ReactNode } from "react";

export type MenuAlign = "start" | "end";

export interface MenuProps {
  /** The button that opens it: a Button or IconButton. */
  trigger: ReactElement;
  /** MenuItem and MenuSeparator. */
  children: ReactNode;
  /** Which edge of the trigger the menu lines up with. */
  align?: MenuAlign;
}
