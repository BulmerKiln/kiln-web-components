/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function GlobeAltIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 2.75c-2 2-3 4.5-3 7.25s1 5.25 3 7.25M10 2.75c2 2 3 4.5 3 7.25s-1 5.25-3 7.25M2.75 10h14.5" />
    </SvgIcon>
  );
}
