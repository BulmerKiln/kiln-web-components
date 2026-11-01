/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function PencilIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M13.25 3.5a1.77 1.77 0 0 1 2.5 2.5L6.5 15.25l-3.25.75.75-3.25zM11.75 5l2.5 2.5" />
    </SvgIcon>
  );
}
