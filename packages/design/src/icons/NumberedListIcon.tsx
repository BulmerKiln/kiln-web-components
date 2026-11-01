/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function NumberedListIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8.25 5h8.5M8.25 10h8.5M8.25 15h8.5M3.25 4.25l1.25-.75v4M3.25 12.75a1.1 1.1 0 0 1 2.2.15c0 .85-2.2 1.85-2.2 3.35h2.25" />
    </SvgIcon>
  );
}
