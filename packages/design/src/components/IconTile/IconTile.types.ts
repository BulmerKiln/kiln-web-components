/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IconTileProps {
  /** Names the tile as an image. Leave it out when visible text already names it. */
  label?: string;
  /** Size (`size-16`) and placement; 1em square without one. */
  className?: string;
}
