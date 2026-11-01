/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import type { SpinnerProps } from "./Spinner.types";

/** Indeterminate progress, announced politely; reduced motion slows it. */
export function Spinner({
  label = "Loading",
  showLabel = false,
  className,
}: SpinnerProps) {
  return (
    <span
      role="status"
      className="inline-flex items-center gap-2 text-sm text-ash-700 dark:text-ash-400"
    >
      <svg
        viewBox="0 0 20 20"
        width="1em"
        height="1em"
        fill="none"
        aria-hidden="true"
        className={classNames(
          "shrink-0 animate-spin reduce-motion:animate-[spin_2.5s_linear_infinite]",
          className,
        )}
      >
        <circle
          cx="10"
          cy="10"
          r="7.5"
          strokeWidth="2"
          className="stroke-ash-200 dark:stroke-ash-800"
        />
        <path
          d="M10 2.5a7.5 7.5 0 0 1 7.5 7.5"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-brand-700 dark:stroke-brand-300"
        />
      </svg>
      <span className={showLabel ? undefined : "sr-only"}>{label}</span>
    </span>
  );
}
