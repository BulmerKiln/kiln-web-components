/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ChevronUpIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m5.5 12 4.5-4.5 4.5 4.5" />
    </SvgIcon>
  );
}
