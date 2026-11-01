/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ClipboardIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="5" y="4.5" width="10" height="12" rx="2" />
      <path d="M7.75 4.5V4a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1v.5" />
    </SvgIcon>
  );
}
