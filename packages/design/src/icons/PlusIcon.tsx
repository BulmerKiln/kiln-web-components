/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function PlusIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 5v10M5 10h10" />
    </SvgIcon>
  );
}
