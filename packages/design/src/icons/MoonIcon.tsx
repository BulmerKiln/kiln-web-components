/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function MoonIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M16.25 12.1A6.75 6.75 0 0 1 7.9 3.75a6.75 6.75 0 1 0 8.35 8.35z" />
    </SvgIcon>
  );
}
