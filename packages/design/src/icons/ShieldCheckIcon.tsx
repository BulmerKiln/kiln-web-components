/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ShieldCheckIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 2.75 4 5v4.5c0 3.5 2.5 6.25 6 7.75 3.5-1.5 6-4.25 6-7.75V5z" />
      <path d="m7.5 10 1.75 1.75 3.5-3.5" />
    </SvgIcon>
  );
}
