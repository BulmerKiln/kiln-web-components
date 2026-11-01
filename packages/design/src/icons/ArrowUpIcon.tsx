/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArrowUpIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 15.5v-11M5.5 9 10 4.5 14.5 9" />
    </SvgIcon>
  );
}
