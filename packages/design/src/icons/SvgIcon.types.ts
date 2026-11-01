/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface SvgIconProps {
  /** Names the icon as an image. Leave it out for a decorative icon beside text. */
  label?: string;
  /** Size (`size-4`, `size-5`) and color; 1em square in the current text color without one. */
  className?: string;
}

export interface SvgIconBaseProps extends SvgIconProps {
  children: ReactNode;
}
