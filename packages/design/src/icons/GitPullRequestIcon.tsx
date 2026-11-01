/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function GitPullRequestIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="6" cy="4.75" r="1.75" />
      <circle cx="6" cy="15.25" r="1.75" />
      <circle cx="14" cy="15.25" r="1.75" />
      <path d="M6 6.5v7M14 13.5V7.75a2 2 0 0 0-2-2H9.25m1.5-1.5-1.5 1.5 1.5 1.5" />
    </SvgIcon>
  );
}
