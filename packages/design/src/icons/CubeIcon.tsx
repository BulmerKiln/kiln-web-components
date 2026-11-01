/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function CubeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 2.75 16.25 6.25v7.5L10 17.25 3.75 13.75v-7.5z" />
      <path d="M3.75 6.25 10 9.75l6.25-3.5M10 9.75v7.5" />
    </SvgIcon>
  );
}
