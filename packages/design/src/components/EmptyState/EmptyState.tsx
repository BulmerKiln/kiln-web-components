/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import type { EmptyStateProps } from "./EmptyState.types";

export function EmptyState({
  icon,
  title,
  description,
  action,
  headingLevel = 2,
  className,
}: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-2 rounded-xl px-6 py-10 text-center ring-1 ring-ash-200 ring-inset dark:ring-ash-800",
        className,
      )}
    >
      {icon && (
        <span
          aria-hidden="true"
          className="mb-1 flex size-10 items-center justify-center rounded-lg bg-ash-100 text-ash-700 dark:bg-ash-900 dark:text-ash-400 [&>svg]:size-5"
        >
          {icon}
        </span>
      )}
      <Heading className="text-sm font-semibold text-ash-900 dark:text-ash-100">
        {title}
      </Heading>
      {description && (
        <p className="max-w-sm text-sm text-ash-700 dark:text-ash-400">
          {description}
        </p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
