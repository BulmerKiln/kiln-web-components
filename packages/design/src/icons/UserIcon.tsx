/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function UserIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="10" cy="6.5" r="3" />
      <path d="M4.25 16.75a5.75 5.75 0 0 1 11.5 0" />
    </SvgIcon>
  );
}
