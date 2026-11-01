/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function BookOpenIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 5.75C8.5 4.5 6.25 4 3.25 4.25v10.5c3-.25 5.25.25 6.75 1.5 1.5-1.25 3.75-1.75 6.75-1.5V4.25C13.75 4 11.5 4.5 10 5.75zM10 5.75v10.5" />
    </SvgIcon>
  );
}
