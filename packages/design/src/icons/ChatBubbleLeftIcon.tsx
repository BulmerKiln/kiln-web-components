/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ChatBubbleLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M2.75 5.25a1.5 1.5 0 0 1 1.5-1.5h11.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5H9.25l-3.5 2.75v-2.75h-1.5a1.5 1.5 0 0 1-1.5-1.5z" />
    </SvgIcon>
  );
}
