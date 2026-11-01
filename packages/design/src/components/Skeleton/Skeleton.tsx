/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import type { SkeletonProps, SkeletonShape } from "./Skeleton.types";

const shapeStyles: Record<SkeletonShape, string> = {
  text: "h-[1lh] rounded-sm",
  block: "rounded-lg",
  circle: "rounded-full",
};

const placeholder = "bg-ash-200 animate-pulse reduce-motion:animate-none dark:bg-ash-800";

/**
 * The shape of content that's on its way. Hidden from assistive technology:
 * mark the region `aria-busy="true"` and say what's loading there (a
 * Spinner's label, or the page title) instead.
 */
export function Skeleton({ shape = "text", lines = 1, className }: SkeletonProps) {
  if (shape === "text") {
    return (
      // A flex box fills its row already; no width of its own, so `className` sets it.
      <span aria-hidden="true" className={classNames("flex flex-col gap-2 text-sm", className)}>
        {Array.from({ length: lines }, (_, index) => (
          <span
            key={index}
            data-part="skeleton"
            className={classNames(
              "block",
              placeholder,
              shapeStyles.text,
              lines > 1 && index === lines - 1 ? "w-3/5" : "w-full",
            )}
          />
        ))}
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      data-part="skeleton"
      className={classNames("block", placeholder, shapeStyles[shape], className)}
    />
  );
}
