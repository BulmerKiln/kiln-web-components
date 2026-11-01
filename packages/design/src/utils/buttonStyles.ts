/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ButtonVariant } from "../components/Button/Button.types";

/** Shared by Button and IconButton; each keeps its own size map. Cursors come from theme.css. */
export const buttonBase =
  "inline-flex items-center justify-center font-medium whitespace-nowrap select-none " +
  "transition-colors duration-150 reduce-motion:transition-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50";

/*
 * Light, then dark. Label text is 4.5:1 or better on the resting and the hover
 * fill; focus outlines are 3:1 or better on the page (white, ash-950). Fills,
 * rings and shadows are decoration: the label identifies the button.
 *
 * Dark buttons stay deep (white on brand-700 7.42:1, brick-700 7.41:1) and
 * lighten one stop on hover (brand-600 5.46:1, brick-600 5.47:1). A faint top
 * highlight stands in for the light theme's shadow. Ghost is neutral (ash-700
 * 8.50:1, ash-400 8.91:1), for quiet actions such as close and toolbar icons.
 */
export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-700 text-white shadow-xs enabled:hover:bg-brand-800 focus-visible:outline-brand-700 " +
    "dark:shadow-none dark:inset-shadow-xs dark:inset-shadow-white/15 " +
    "dark:enabled:hover:bg-brand-600 dark:focus-visible:outline-brand-300",
  secondary:
    "bg-white text-ash-900 shadow-xs ring-1 ring-ash-300 ring-inset " +
    "enabled:hover:bg-ash-50 focus-visible:outline-brand-700 " +
    "dark:bg-ash-900 dark:text-ash-100 dark:shadow-none dark:ring-ash-800 " +
    "dark:inset-shadow-xs dark:inset-shadow-white/10 " +
    "dark:enabled:hover:bg-ash-800 dark:focus-visible:outline-brand-300",
  ghost:
    "text-ash-700 enabled:hover:bg-ash-100 enabled:hover:text-ash-900 focus-visible:outline-brand-700 " +
    "dark:text-ash-400 dark:enabled:hover:bg-ash-800 dark:enabled:hover:text-ash-100 " +
    "dark:focus-visible:outline-brand-300",
  danger:
    "bg-brick-700 text-white shadow-xs enabled:hover:bg-brick-800 focus-visible:outline-brick-700 " +
    "dark:shadow-none dark:inset-shadow-xs dark:inset-shadow-white/15 " +
    "dark:enabled:hover:bg-brick-600 dark:focus-visible:outline-brick-400",
};
