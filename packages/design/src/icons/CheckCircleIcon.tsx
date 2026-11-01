/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function CheckCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="m7 10.25 2 2 4-4.5" />
    </SvgIcon>
  );
}
