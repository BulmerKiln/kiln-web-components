/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * The floating panel of Select, Combobox and Menu, and the rows inside it.
 * Keyboard focus moves a highlight between rows (data-focus), which is the
 * focus indicator; the panel itself never shows an outline.
 */
export const popoverPanel =
  "z-50 min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-ash-200 focus:outline-none " +
  "transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0 " +
  "dark:bg-ash-900 dark:shadow-black/40 dark:ring-ash-800";

export const popoverItem =
  "group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-ash-900 select-none " +
  "data-focus:bg-ash-100 data-disabled:opacity-50 pointer-coarse:py-2.5 " +
  "dark:text-ash-100 dark:data-focus:bg-ash-800";

/** The popover's anchor: below the trigger, 4 px away. */
export const popoverAnchor = { gap: 4, padding: 8 } as const;
