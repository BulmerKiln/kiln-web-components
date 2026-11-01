/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ContainerIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="2.75" y="5.25" width="14.5" height="9.5" rx="1" />
      <path d="M6.25 7.75v4.5M10 7.75v4.5M13.75 7.75v4.5" />
    </SvgIcon>
  );
}
