/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ChevronLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 5.5 7.5 10l4.5 4.5" />
    </SvgIcon>
  );
}
