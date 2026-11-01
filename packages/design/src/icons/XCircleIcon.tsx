/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function XCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="m7.75 7.75 4.5 4.5m0-4.5-4.5 4.5" />
    </SvgIcon>
  );
}
