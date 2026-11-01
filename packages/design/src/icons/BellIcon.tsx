/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function BellIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 8a5 5 0 0 1 10 0v3.25l1.5 2.5h-13L5 11.25z" />
      <path d="M8.25 16.25a1.75 1.75 0 0 0 3.5 0" />
    </SvgIcon>
  );
}
