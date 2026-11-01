/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ListBulletIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7.75 5h9M7.75 10h9M7.75 15h9M3.75 5h.01M3.75 10h.01M3.75 15h.01" />
    </SvgIcon>
  );
}
