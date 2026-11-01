/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function Cog6ToothIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M15.22 8.6L17.18 8.99L17.18 11.01L15.22 11.4L14.68 12.7L15.79 14.36L14.36 15.79L12.7 14.68L11.4 15.22L11.01 17.18L8.99 17.18L8.6 15.22L7.3 14.68L5.64 15.79L4.21 14.36L5.32 12.7L4.78 11.4L2.82 11.01L2.82 8.99L4.78 8.6L5.32 7.3L4.21 5.64L5.64 4.21L7.3 5.32L8.6 4.78L8.99 2.82L11.01 2.82L11.4 4.78L12.7 5.32L14.36 4.21L15.79 5.64L14.68 7.3z" />
      <circle cx="10" cy="10" r="2.25" />
    </SvgIcon>
  );
}
