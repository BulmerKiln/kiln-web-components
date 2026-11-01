/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ExclamationTriangleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8.7 3.75a1.5 1.5 0 0 1 2.6 0l5.6 9.75a1.5 1.5 0 0 1-1.3 2.25H4.4a1.5 1.5 0 0 1-1.3-2.25z" />
      <path d="M10 8v3.25M10 13.75h.01" />
    </SvgIcon>
  );
}
