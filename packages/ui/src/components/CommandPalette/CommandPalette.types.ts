/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface CommandPaletteItem {
  /** Unique among the items. */
  id: string;
  label: string;
  /** Items are shown under their group's heading, groups in the order they first appear. */
  group?: string;
  /** A second line: a repository's format, a page's place. */
  description?: string;
  /** A decorative icon from `@bulmerkiln/design/icons`. */
  icon?: ReactNode;
  /** More words that find it, beside its label, description and group. */
  keywords?: string[];
}

export interface CommandPaletteProps {
  open: boolean;
  /** Called with true on ⌘K / Ctrl+K, and false on Escape, a click outside or a choice. */
  onOpenChange: (open: boolean) => void;
  items: CommandPaletteItem[];
  /** Called with the chosen item; the app navigates or acts. */
  onSelect: (item: CommandPaletteItem) => void;
  /** Names the dialog and its search field. */
  label?: string;
  placeholder?: string;
  /** Shown when nothing matches what's typed. */
  emptyMessage?: string;
}
