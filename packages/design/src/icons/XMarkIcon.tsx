/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function XMarkIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m5.5 5.5 9 9m0-9-9 9" />
    </SvgIcon>
  );
}
