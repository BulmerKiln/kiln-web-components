/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function UserPlusIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="8" cy="6.5" r="3" />
      <path d="M2.75 16.75a5.25 5.25 0 0 1 10.5 0" />
      <path d="M15.5 6.5v4.5M13.25 8.75h4.5" />
    </SvgIcon>
  );
}
