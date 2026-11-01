/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ChevronRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m8 5.5 4.5 4.5L8 14.5" />
    </SvgIcon>
  );
}
