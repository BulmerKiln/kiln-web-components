/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function InformationCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 9.25v4.25M10 6.5h.01" />
    </SvgIcon>
  );
}
