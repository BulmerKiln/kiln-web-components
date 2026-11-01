/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function Bars3Icon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3.5 6h13M3.5 10h13M3.5 14h13" />
    </SvgIcon>
  );
}
