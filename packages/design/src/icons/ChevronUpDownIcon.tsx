/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ChevronUpDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6.5 8 10 4.5 13.5 8m-7 4 3.5 3.5 3.5-3.5" />
    </SvgIcon>
  );
}
