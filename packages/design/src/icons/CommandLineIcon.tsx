/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function CommandLineIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="2.75" y="3.75" width="14.5" height="12.5" rx="1.5" />
      <path d="m6 8 2 2-2 2M10.5 12H14" />
    </SvgIcon>
  );
}
