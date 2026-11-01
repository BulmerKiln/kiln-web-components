/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ServerStackIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="2.75" y="3.25" width="14.5" height="5.5" rx="1.5" />
      <rect x="2.75" y="11.25" width="14.5" height="5.5" rx="1.5" />
      <path d="M5.75 6h.01M5.75 14h.01M10.5 6h3.75M10.5 14h3.75" />
    </SvgIcon>
  );
}
