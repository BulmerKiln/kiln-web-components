/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArrowDownTrayIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 3v9.25M6.5 8.75 10 12.25l3.5-3.5" />
      <path d="M3.25 13.5v1.75a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V13.5" />
    </SvgIcon>
  );
}
