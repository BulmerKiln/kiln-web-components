/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../utils/classNames";
import type { SvgIconBaseProps } from "./SvgIcon.types";

/** The shared frame of every UI icon: a 20 px grid, 1.5 px rounded strokes in the text color. */
export function SvgIcon({ label, className, children }: SvgIconBaseProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={classNames("shrink-0", className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {children}
    </svg>
  );
}
