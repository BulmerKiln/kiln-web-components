/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import type { BadgeProps, BadgeSize, BadgeTone } from "./Badge.types";

/*
 * Text on its tint, light / dark: ash 11.5 / 11.5, brand 9.22 / 9.47,
 * celadon 8.26 / 9.44, accent 11.76 / 11.99, brick 9.21 / 9.36.
 */
const toneStyles: Record<BadgeTone, string> = {
  neutral: "bg-ash-100 text-ash-800 ring-ash-200 dark:bg-ash-800 dark:text-ash-100 dark:ring-ash-700",
  brand: "bg-brand-50 text-brand-800 ring-brand-200 dark:bg-brand-950 dark:text-brand-200 dark:ring-brand-900",
  success:
    "bg-celadon-50 text-celadon-800 ring-celadon-200 dark:bg-celadon-950 dark:text-celadon-200 dark:ring-celadon-900",
  warning:
    "bg-accent-50 text-accent-900 ring-accent-200 dark:bg-accent-950 dark:text-accent-100 dark:ring-accent-900",
  danger: "bg-brick-50 text-brick-800 ring-brick-200 dark:bg-brick-950 dark:text-brick-200 dark:ring-brick-900",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "gap-1 px-1.5 py-px text-xs [&>svg]:size-3",
  md: "gap-1.5 px-2 py-0.5 text-xs [&>svg]:size-3.5",
};

/** A short label for a status or category: "Verified", "Deprecated", "3 critical". */
export function Badge({ children, tone = "neutral", size = "md", icon, className }: BadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-md font-medium whitespace-nowrap ring-1 ring-inset",
        toneStyles[tone],
        sizeStyles[size],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
