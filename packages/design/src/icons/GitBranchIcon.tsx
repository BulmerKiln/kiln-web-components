/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function GitBranchIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="6" cy="4.75" r="1.75" />
      <circle cx="6" cy="15.25" r="1.75" />
      <circle cx="14" cy="6" r="1.75" />
      <path d="M6 6.5v7M14 7.75v.25a2.75 2.75 0 0 1-2.75 2.75h-2.5A2.75 2.75 0 0 0 6 13.5" />
    </SvgIcon>
  );
}
