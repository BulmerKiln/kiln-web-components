/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronRightIcon } from "../../icons/ChevronRightIcon";
import classNames from "../../utils/classNames";
import type { BreadcrumbProps } from "./Breadcrumb.types";

// Links ash-700 / ash-400 (8.50 / 8.91:1); the current page ash-900 / ash-100.
const link =
  "rounded-sm text-ash-700 hover:text-ash-900 hover:underline underline-offset-2 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 " +
  "dark:text-ash-400 dark:hover:text-ash-100 dark:focus-visible:outline-brand-300";

/** Where the page sits: a named navigation landmark holding an ordered list. */
export function Breadcrumb({
  items,
  linkAs: Anchor = "a",
  label = "Breadcrumb",
  className,
}: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${index}-${item.label}`} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && (
                <ChevronRightIcon className="size-3.5 text-ash-500 dark:text-ash-600" />
              )}
              {current || !item.href ? (
                <span
                  aria-current={current ? "page" : undefined}
                  className={classNames(
                    "truncate",
                    current ? "font-medium text-ash-900 dark:text-ash-100" : "text-ash-700 dark:text-ash-400",
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Anchor href={item.href} className={classNames(link, "truncate")}>
                  {item.label}
                </Anchor>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
