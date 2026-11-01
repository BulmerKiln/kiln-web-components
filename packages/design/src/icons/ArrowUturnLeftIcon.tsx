/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArrowUturnLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7.25 11.5 3.5 7.75 7.25 4M3.5 7.75h9a3.75 3.75 0 0 1 0 7.5h-2.25" />
    </SvgIcon>
  );
}
