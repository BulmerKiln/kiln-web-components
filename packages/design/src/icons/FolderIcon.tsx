/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function FolderIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M2.75 15.25V4.75a1.5 1.5 0 0 1 1.5-1.5h3.19a1.5 1.5 0 0 1 1.06.44L9.75 5h6a1.5 1.5 0 0 1 1.5 1.5v8.75a1.5 1.5 0 0 1-1.5 1.5H4.25a1.5 1.5 0 0 1-1.5-1.5z" />
    </SvgIcon>
  );
}
