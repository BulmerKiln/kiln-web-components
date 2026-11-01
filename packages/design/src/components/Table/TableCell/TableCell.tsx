/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../../utils/classNames";
import { alignStyles, useTableDensity } from "../Table.utils";
import type { TableCellProps } from "./TableCell.types";

export function TableCell({
  children,
  numeric = false,
  align = numeric ? "end" : "start",
  mono = false,
  colSpan,
  className,
}: TableCellProps) {
  const density = useTableDensity();
  return (
    <td
      colSpan={colSpan}
      className={classNames(
        "px-3",
        density === "compact" ? "py-1.5" : "py-2.5",
        alignStyles[align],
        numeric && "tabular-nums",
        mono && "font-mono text-xs",
        className,
      )}
    >
      {children}
    </td>
  );
}
