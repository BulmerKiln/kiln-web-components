/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function CircleStackIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <ellipse cx="10" cy="5" rx="6" ry="2.25" />
      <path d="M4 5v10c0 1.24 2.69 2.25 6 2.25s6-1.01 6-2.25V5M4 10c0 1.24 2.69 2.25 6 2.25s6-1.01 6-2.25" />
    </SvgIcon>
  );
}
