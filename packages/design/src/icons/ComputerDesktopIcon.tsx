/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ComputerDesktopIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="2.75" y="3.75" width="14.5" height="10" rx="1.5" />
      <path d="M7 16.75h6M10 13.75v3" />
    </SvgIcon>
  );
}
