/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function StrikethroughIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3.25 10h13.5M13.5 5.75c-.55-1.25-1.85-2-3.6-2-2.15 0-3.65 1.15-3.65 2.75 0 1.05.55 1.8 1.6 2.3M6.5 13.75c.5 1.5 1.85 2.5 3.75 2.5 2.25 0 3.75-1.2 3.75-2.85 0-.45-.1-.85-.3-1.15" />
    </SvgIcon>
  );
}
