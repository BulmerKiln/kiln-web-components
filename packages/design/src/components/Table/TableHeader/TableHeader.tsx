/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowDownIcon } from "../../../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../../icons/ArrowUpIcon";
import { ChevronUpDownIcon } from "../../../icons/ChevronUpDownIcon";
import classNames from "../../../utils/classNames";
import { alignStyles, useTableDensity } from "../Table.utils";
import type { TableHeaderProps } from "./TableHeader.types";

const sortIcons = {
  ascending: ArrowUpIcon,
  descending: ArrowDownIcon,
  none: ChevronUpDownIcon,
};

/**
 * A column (or row) header. Sortable headers hold a button, and the header
 * carries `aria-sort` while the column is sorted, so the order is announced.
 */
export function TableHeader({
  children,
  numeric = false,
  align = numeric ? "end" : "start",
  sort = "none",
  onSort,
  scope = "col",
  className,
}: TableHeaderProps) {
  const density = useTableDensity();
  const SortIcon = sortIcons[sort];
  return (
    <th
      scope={scope}
      aria-sort={onSort && sort !== "none" ? sort : undefined}
      className={classNames(
        "px-3 text-xs font-medium whitespace-nowrap text-ash-700 dark:text-ash-400",
        scope === "row" && "text-sm text-ash-900 dark:text-ash-100",
        density === "compact" ? "py-1.5" : "py-2",
        alignStyles[align],
        className,
      )}
    >
      {onSort ? (
        <button
          type="button"
          onClick={onSort}
          className={classNames(
            "-mx-1 inline-flex items-center gap-1 rounded-sm px-1 hover:text-ash-900 dark:hover:text-ash-100",
            "focus-visible:outline-2 focus-visible:outline-brand-700 dark:focus-visible:outline-brand-300",
            align === "end" && "flex-row-reverse",
            sort !== "none" && "text-ash-900 dark:text-ash-100",
          )}
        >
          {children}
          <SortIcon className="size-3.5" />
        </button>
      ) : (
        children
      )}
    </th>
  );
}
