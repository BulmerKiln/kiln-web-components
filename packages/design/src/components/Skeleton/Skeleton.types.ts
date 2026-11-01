/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export type SkeletonShape = "text" | "block" | "circle";

export interface SkeletonProps {
  /** `text` draws lines the height of body text; `block` and `circle` take their size from `className`. */
  shape?: SkeletonShape;
  /** For `text`: how many lines; the last is shorter. */
  lines?: number;
  /** Size (`h-24`, `size-8`, `w-48`) and placement. */
  className?: string;
}
