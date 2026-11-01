/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function LockOpenIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="4.25" y="8.75" width="11.5" height="8.5" rx="1.5" />
      <path d="M6.75 8.75V6a3.25 3.25 0 0 1 6.4-.8M10 12.25v1.5" />
    </SvgIcon>
  );
}
