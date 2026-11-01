/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function CodeBracketIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6.75 5.75 2.75 10l4 4.25M13.25 5.75l4 4.25-4 4.25" />
    </SvgIcon>
  );
}
