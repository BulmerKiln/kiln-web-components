/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SvgIcon } from "./SvgIcon";
import type { SvgIconProps } from "./SvgIcon.types";

export function KeyIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="7" cy="13" r="3.25" />
      <path d="m9.3 10.7 6.2-6.2M14 6l1.75 1.75M12.25 7.75l1.25 1.25" />
    </SvgIcon>
  );
}
