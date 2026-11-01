/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useId } from "react";
import classNames from "../../utils/classNames";
import type { TableProps } from "./Table.types";
import { TableDensityContext } from "./Table.utils";

/**
 * A data table. The caption sits above the scroll region rather than inside
 * it, so it stays put while a wide table scrolls; it names both the region and
 * the table. Wide tables scroll sideways inside a focusable region, so
 * keyboard users can scroll them too (tables are exempt from WCAG 1.4.10
 * reflow: their rows and columns are the information).
 */
export function Table({
  caption,
  hideCaption = false,
  children,
  density = "comfortable",
  className,
}: TableProps) {
  const id = useId();
  return (
    <TableDensityContext value={density}>
      <div className={classNames("flex w-full flex-col gap-2", className)}>
        <p id={id} className={hideCaption ? "sr-only" : "text-sm font-semibold text-ash-900 dark:text-ash-100"}>
          {caption}
        </p>
        <div
          role="region"
          aria-labelledby={id}
          tabIndex={0}
          className="w-full overflow-x-auto rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:focus-visible:outline-brand-300"
        >
          <table
            aria-labelledby={id}
            className="w-full border-collapse text-left text-sm text-ash-900 dark:text-ash-100"
          >
            {children}
          </table>
        </div>
      </div>
    </TableDensityContext>
  );
}
