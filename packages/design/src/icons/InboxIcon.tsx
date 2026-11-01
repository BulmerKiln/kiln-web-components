/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function InboxIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M2.75 11.25v4a1.5 1.5 0 0 0 1.5 1.5h11.5a1.5 1.5 0 0 0 1.5-1.5v-4l-2.08-6.25a1.5 1.5 0 0 0-1.42-1h-7.5a1.5 1.5 0 0 0-1.42 1z" />
      <path d="M2.75 11.25h3.5l1 2h5.5l1-2h3.5" />
    </SvgIcon>
  );
}
