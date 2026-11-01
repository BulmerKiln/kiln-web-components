/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExclamationTriangleIcon } from "../../icons/ExclamationTriangleIcon";
import classNames from "../../utils/classNames";
import { Button } from "../Button/Button";
import type { ErrorStateProps } from "./ErrorState.types";

/** A region whose content failed to load. Never shows internals: say what to do. */
export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
  action,
  headingLevel = 2,
  className,
}: ErrorStateProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-2 rounded-xl px-6 py-10 text-center ring-1 ring-ash-200 ring-inset dark:ring-ash-800",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="mb-1 flex size-10 items-center justify-center rounded-lg bg-brick-50 text-brick-700 dark:bg-brick-950 dark:text-brick-300"
      >
        <ExclamationTriangleIcon className="size-5" />
      </span>
      <Heading className="text-sm font-semibold text-ash-900 dark:text-ash-100">
        {title}
      </Heading>
      {description && (
        <p className="max-w-sm text-sm text-ash-700 dark:text-ash-400">
          {description}
        </p>
      )}
      {(onRetry || action) && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {onRetry && (
            <Button variant="secondary" onClick={onRetry}>
              Try again
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
