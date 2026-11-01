/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function EllipsisHorizontalIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 10h.01M10 10h.01M15 10h.01" strokeWidth={2.25} />
    </SvgIcon>
  );
}
