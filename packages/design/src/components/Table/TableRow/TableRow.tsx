/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../../utils/classNames";
import type { TableRowProps } from "./TableRow.types";

export function TableRow({ children, selected }: TableRowProps) {
  return (
    <tr
      aria-selected={selected}
      className={classNames(
        "transition-colors duration-100 reduce-motion:transition-none [tbody_&]:hover:bg-ash-50 dark:[tbody_&]:hover:bg-ash-800/40",
        selected && "bg-brand-50 [tbody_&]:hover:bg-brand-50 dark:bg-brand-950 dark:[tbody_&]:hover:bg-brand-950",
      )}
    >
      {children}
    </tr>
  );
}
