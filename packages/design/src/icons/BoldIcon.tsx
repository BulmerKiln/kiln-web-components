/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function BoldIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6 3.75h4.75a3 3 0 0 1 0 6H6zM6 9.75h5.5a3.25 3.25 0 0 1 0 6.5H6z" />
    </SvgIcon>
  );
}
