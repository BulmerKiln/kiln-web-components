/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function InboxStackIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M2.75 12v3.25a1.5 1.5 0 0 0 1.5 1.5h11.5a1.5 1.5 0 0 0 1.5-1.5V12h-3.5l-1 2h-5.5l-1-2z" />
      <path d="M4.5 8.75h11M6.25 5.5h7.5M7.75 2.75h4.5" />
    </SvgIcon>
  );
}
