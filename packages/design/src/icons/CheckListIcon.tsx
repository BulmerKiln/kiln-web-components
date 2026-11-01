/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function CheckListIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="2.75" y="3.25" width="4.5" height="4.5" rx="1" />
      <rect x="2.75" y="12.25" width="4.5" height="4.5" rx="1" />
      <path d="m3.9 5.6.9.9 1.4-1.75M10 5.5h7.25M10 14.5h7.25" />
    </SvgIcon>
  );
}
