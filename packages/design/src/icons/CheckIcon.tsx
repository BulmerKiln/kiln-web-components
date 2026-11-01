/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function CheckIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4.5 10.5 8 14l7.5-8" />
    </SvgIcon>
  );
}
