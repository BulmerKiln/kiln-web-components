/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3.25 9 10 3.25 16.75 9M4.75 7.75v7.5a1.5 1.5 0 0 0 1.5 1.5h7.5a1.5 1.5 0 0 0 1.5-1.5v-7.5M8.25 16.75v-4.5h3.5v4.5" />
    </SvgIcon>
  );
}
