/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function ChatBubbleLeftRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M2.75 9a1.5 1.5 0 0 1 1.5-1.5h6.5a1.5 1.5 0 0 1 1.5 1.5v4.25a1.5 1.5 0 0 1-1.5 1.5H7.25l-2.75 2.25v-2.25h-.25a1.5 1.5 0 0 1-1.5-1.5z" />
      <path d="M7.5 5.5v-.75a1.5 1.5 0 0 1 1.5-1.5h6.75a1.5 1.5 0 0 1 1.5 1.5V9a1.5 1.5 0 0 1-1.5 1.5v2.25l-2.75-2.25" />
    </SvgIcon>
  );
}
