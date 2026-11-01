/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArrowPathIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3.85 10A6.15 6.15 0 0 1 15.5 7.25M15.5 3.75v3.5H12" />
      <path d="M16.15 10A6.15 6.15 0 0 1 4.5 12.75M4.5 16.25v-3.5H8" />
    </SvgIcon>
  );
}
