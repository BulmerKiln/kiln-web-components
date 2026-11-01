/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ArrowUturnRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12.75 11.5l3.75-3.75L12.75 4M16.5 7.75h-9a3.75 3.75 0 0 0 0 7.5h2.25" />
    </SvgIcon>
  );
}
