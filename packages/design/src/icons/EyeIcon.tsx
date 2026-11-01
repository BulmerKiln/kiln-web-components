/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function EyeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M2.25 10C4 6.25 6.75 4.25 10 4.25s6 2 7.75 5.75c-1.75 3.75-4.5 5.75-7.75 5.75s-6-2-7.75-5.75z" />
      <circle cx="10" cy="10" r="2.5" />
    </SvgIcon>
  );
}
