/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ChartBarIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3.25 16.75h13.5M5.5 13.75v-3.5M10 13.75v-9.5M14.5 13.75v-6" />
    </SvgIcon>
  );
}
