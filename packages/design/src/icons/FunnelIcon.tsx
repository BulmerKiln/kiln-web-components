/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function FunnelIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3.25 4.25a1 1 0 0 1 1-1h11.5a1 1 0 0 1 1 1v1.3a1 1 0 0 1-.3.7L12 10v5.25l-4 1.5V10L3.55 6.25a1 1 0 0 1-.3-.7z" />
    </SvgIcon>
  );
}
