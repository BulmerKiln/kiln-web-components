/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * Shared by every text-like control: TextInput, Textarea, Select and Combobox.
 * The ring is the control's boundary, so it clears 3:1 (ash-500: 3.51:1 on
 * white, 4.91:1 on ash-900). Placeholders are text: ash-600 (5.43:1) and
 * ash-500 (4.91:1). Inputs use 16 px text below `sm` so iOS doesn't zoom on focus.
 */
export const fieldControl =
  "block w-full min-h-8 rounded-md bg-white px-2.5 py-1 text-base text-ash-900 shadow-xs " +
  "ring-1 ring-ash-500 ring-inset placeholder:text-ash-600 sm:text-sm pointer-coarse:min-h-11 " +
  "focus:outline-2 focus:-outline-offset-1 focus:outline-brand-700 " +
  "data-invalid:ring-brick-700 data-invalid:focus:outline-brick-700 " +
  "data-disabled:bg-ash-50 data-disabled:text-ash-600 data-disabled:shadow-none " +
  "dark:bg-ash-900 dark:text-ash-100 dark:shadow-none dark:placeholder:text-ash-500 " +
  "dark:focus:outline-brand-300 dark:data-invalid:ring-brick-400 dark:data-invalid:focus:outline-brick-400 " +
  "dark:data-disabled:bg-ash-950 dark:data-disabled:text-ash-500";

export const fieldLabel = "text-sm font-medium text-ash-900 dark:text-ash-100";

export const fieldDescription = "text-sm text-ash-700 dark:text-ash-400";

export const fieldError = "flex gap-1.5 text-sm text-brick-700 dark:text-brick-400";

/** The box of a checkbox or radio: its ring clears 3:1 on the page; checked fills brand-700 / brand-600. */
export const choiceControl =
  "group flex size-4 shrink-0 items-center justify-center bg-white ring-1 ring-ash-500 ring-inset " +
  "data-checked:bg-brand-700 data-checked:ring-brand-700 " +
  "data-indeterminate:bg-brand-700 data-indeterminate:ring-brand-700 " +
  "focus:outline-none data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-brand-700 " +
  "data-disabled:opacity-50 pointer-coarse:size-5 " +
  "dark:bg-ash-900 dark:data-checked:bg-brand-600 dark:data-checked:ring-brand-600 " +
  "dark:data-indeterminate:bg-brand-600 dark:data-indeterminate:ring-brand-600 " +
  "dark:data-focus:outline-brand-300";
