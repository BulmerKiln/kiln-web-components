/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useId } from "react";
import type { SideNavGroupProps } from "./SideNavGroup.types";

export function SideNavGroup({ label, children }: SideNavGroupProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p id={id} className="px-2.5 text-xs font-medium text-ash-700 dark:text-ash-400">
          {label}
        </p>
      )}
      <ul aria-labelledby={label ? id : undefined} className="flex flex-col gap-0.5">
        {children}
      </ul>
    </div>
  );
}
