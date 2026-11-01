/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function GitCommitIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="10" cy="10" r="2.75" />
      <path d="M2.75 10h4.5M12.75 10h4.5" />
    </SvgIcon>
  );
}
