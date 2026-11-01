/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function EyeSlashIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8.1 4.5A7.5 7.5 0 0 1 10 4.25c3.25 0 6 2 7.75 5.75a12 12 0 0 1-1.9 2.95M5.5 5.85C4.15 6.85 3.1 8.2 2.25 10c1.75 3.75 4.5 5.75 7.75 5.75 1.6 0 3.05-.48 4.3-1.4" />
      <path d="M8.25 8.2a2.5 2.5 0 0 0 3.55 3.55M3.25 3.25l13.5 13.5" />
    </SvgIcon>
  );
}
