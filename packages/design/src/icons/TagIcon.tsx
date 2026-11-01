/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function TagIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M2.75 4.25v4.13a1.5 1.5 0 0 0 .44 1.06l7.32 7.32a1.5 1.5 0 0 0 2.12 0l4.13-4.13a1.5 1.5 0 0 0 0-2.12L9.44 3.19a1.5 1.5 0 0 0-1.06-.44H4.25a1.5 1.5 0 0 0-1.5 1.5z" />
      <path d="M6.5 6.5h.01" />
    </SvgIcon>
  );
}
