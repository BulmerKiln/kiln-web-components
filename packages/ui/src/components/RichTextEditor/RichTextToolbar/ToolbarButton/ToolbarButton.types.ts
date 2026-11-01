/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface ToolbarButtonProps {
  /** Names the button and shows in its tooltip. */
  label: string;
  /** The keys that do the same, as `Kbd` takes them: `["mod", "B"]`. */
  shortcut?: string[];
  /** Whether the format is on at the selection; a toggle when given. */
  pressed?: boolean;
  disabled?: boolean;
  onClick: () => void;
  /** The icon. */
  children: ReactNode;
}
