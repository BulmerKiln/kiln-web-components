/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArrowRightEndOnRectangleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3.25h3a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-3" />
      <path d="M3.25 10h8.5M8.75 7l3 3-3 3" />
    </SvgIcon>
  );
}
