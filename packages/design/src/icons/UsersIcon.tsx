/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function UsersIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="7.5" cy="7" r="2.75" />
      <path d="M2.5 16.5a5 5 0 0 1 10 0" />
      <path d="M12.75 4.5a2.75 2.75 0 0 1 0 5M15 11.9a5 5 0 0 1 2.5 4.6" />
    </SvgIcon>
  );
}
