/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType, ReactNode } from "react";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../icons/ChevronRightIcon";
import classNames from "../../utils/classNames";
import type { PaginationProps } from "./Pagination.types";
import { pageItems } from "./Pagination.utils";

const control =
  "inline-flex min-h-8 min-w-8 items-center justify-center gap-1 rounded-md px-2 text-sm font-medium " +
  "text-ash-700 hover:bg-ash-100 hover:text-ash-900 pointer-coarse:min-h-11 pointer-coarse:min-w-11 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 " +
  "dark:text-ash-400 dark:hover:bg-ash-800 dark:hover:text-ash-100 dark:focus-visible:outline-brand-300";

// The current page: a tint and a ring as well as aria-current, so it isn't color alone.
const current =
  "bg-brand-50 text-brand-800 ring-1 ring-brand-200 ring-inset hover:bg-brand-50 hover:text-brand-800 " +
  "dark:bg-brand-950 dark:text-brand-200 dark:ring-brand-800 dark:hover:bg-brand-950 dark:hover:text-brand-200";

const unavailable = "pointer-events-none opacity-50";

/**
 * Moves through a paged list. Narrow containers show "Page 3 of 11" between
 * Previous and Next instead of the page numbers.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  getHref,
  linkAs: Anchor = "a",
  summary,
  label = "Pagination",
  className,
}: PaginationProps) {
  const target = (to: number, content: ReactNode, extra: Record<string, unknown> = {}, classes = control) => {
    const off = to < 1 || to > pageCount;
    if (getHref) {
      if (off) {
        return (
          <span aria-disabled="true" className={classNames(classes, unavailable)} {...extra}>
            {content}
          </span>
        );
      }
      const Link: ElementType = Anchor;
      return (
        <Link href={getHref(to)} className={classes} {...extra}>
          {content}
        </Link>
      );
    }
    return (
      <button
        type="button"
        disabled={off}
        onClick={() => onPageChange?.(to)}
        className={classNames(classes, "disabled:opacity-50")}
        {...extra}
      >
        {content}
      </button>
    );
  };
  return (
    <nav
      aria-label={label}
      className={classNames("@container/pagination flex flex-wrap items-center justify-between gap-3", className)}
    >
      {summary && <p className="text-sm text-ash-700 dark:text-ash-400">{summary}</p>}
      <ul className="flex items-center gap-1">
        <li>
          {target(
            page - 1,
            <>
              <ChevronLeftIcon className="size-4" />
              <span className="hidden @sm/pagination:inline">Previous</span>
            </>,
            { "aria-label": "Previous page" },
          )}
        </li>
        {pageItems(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <li key={`gap-${index}`} aria-hidden="true" className="hidden px-1 text-sm text-ash-600 @md/pagination:block dark:text-ash-500">
              …
            </li>
          ) : (
            <li key={item} className="hidden @md/pagination:block">
              {target(
                item,
                item,
                {
                  "aria-label": `Page ${item}`,
                  ...(item === page ? { "aria-current": "page" } : {}),
                },
                classNames(control, "tabular-nums", item === page && current),
              )}
            </li>
          ),
        )}
        <li aria-hidden="true" className="px-2 text-sm text-ash-700 tabular-nums @md/pagination:hidden dark:text-ash-400">
          Page {page} of {pageCount}
        </li>
        <li>
          {target(
            page + 1,
            <>
              <span className="hidden @sm/pagination:inline">Next</span>
              <ChevronRightIcon className="size-4" />
            </>,
            { "aria-label": "Next page" },
          )}
        </li>
      </ul>
    </nav>
  );
}
