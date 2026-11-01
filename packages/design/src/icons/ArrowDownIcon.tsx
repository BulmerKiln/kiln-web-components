/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArrowDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 4.5v11M5.5 11l4.5 4.5 4.5-4.5" />
    </SvgIcon>
  );
}
