/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArrowUpRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6.5 13.5 13.5 6.5M8 6.5h5.5V12" />
    </SvgIcon>
  );
}
