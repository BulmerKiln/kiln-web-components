/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function GitMergeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="6" cy="4.75" r="1.75" />
      <circle cx="6" cy="15.25" r="1.75" />
      <circle cx="14" cy="12.5" r="1.75" />
      <path d="M6 6.5v7M6 6.5c0 3.25 2.5 6 6.25 6" />
    </SvgIcon>
  );
}
