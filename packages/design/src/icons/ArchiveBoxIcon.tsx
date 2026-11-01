/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArchiveBoxIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="2.75" y="3.75" width="14.5" height="3.5" rx="1" />
      <path d="M4 7.25v8a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-8M8.25 10.25h3.5" />
    </SvgIcon>
  );
}
