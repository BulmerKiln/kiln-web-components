/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function UserCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="10" cy="10" r="7.25" />
      <circle cx="10" cy="8.25" r="2.5" />
      <path d="M5.4 15.6a5.25 5.25 0 0 1 9.2 0" />
    </SvgIcon>
  );
}
