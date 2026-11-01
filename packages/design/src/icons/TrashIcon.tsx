/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function TrashIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3.25 5.25h13.5M8 5.25V3.75h4v1.5M4.75 5.25l.75 10.6a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4l.75-10.6M8.25 8.75v5M11.75 8.75v5" />
    </SvgIcon>
  );
}
