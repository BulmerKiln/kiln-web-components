/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function BuildingOfficeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4.25 17.25V4a1.25 1.25 0 0 1 1.25-1.25h6A1.25 1.25 0 0 1 12.75 4v13.25" />
      <path d="M12.75 8.25h2a1.25 1.25 0 0 1 1.25 1.25v7.75M2.75 17.25h14.5" />
      <path d="M7 5.75h.01M10 5.75h.01M7 8.5h.01M10 8.5h.01M7 11.25h.01M10 11.25h.01M7.25 17.25v-2.5h3v2.5" />
    </SvgIcon>
  );
}
