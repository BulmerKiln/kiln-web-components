/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArrowRightStartOnRectangleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8 3.25H5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h3" />
      <path d="M8.5 10h8.25M13.75 7l3 3-3 3" />
    </SvgIcon>
  );
}
