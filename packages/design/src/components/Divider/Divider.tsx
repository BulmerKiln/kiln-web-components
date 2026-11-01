/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import type { DividerOrientation, DividerProps } from "./Divider.types";

const orientationStyles: Record<DividerOrientation, string> = {
  horizontal: "h-px w-full",
  vertical: "w-px self-stretch",
};

/** A thematic break: an <hr> when horizontal, an ARIA separator when vertical. Decoration-only color. */
export function Divider({ orientation = "horizontal", className }: DividerProps) {
  const classes = classNames(
    "shrink-0 border-0 bg-ash-200 dark:bg-ash-800",
    orientationStyles[orientation],
    className,
  );
  return orientation === "horizontal" ? (
    <hr className={classes} />
  ) : (
    <div role="separator" aria-orientation="vertical" className={classes} />
  );
}
