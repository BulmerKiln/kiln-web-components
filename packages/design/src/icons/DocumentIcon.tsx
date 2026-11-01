/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function DocumentIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6 2.75h5.25l4 4v9a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5v-11.5A1.5 1.5 0 0 1 6 2.75z" />
      <path d="M11.25 2.75v3a1 1 0 0 0 1 1h3" />
    </SvgIcon>
  );
}
