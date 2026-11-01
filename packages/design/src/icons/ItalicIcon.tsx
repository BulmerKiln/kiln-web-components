/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ItalicIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8.75 3.75h6M5.25 16.25h6M11.75 3.75l-3.5 12.5" />
    </SvgIcon>
  );
}
