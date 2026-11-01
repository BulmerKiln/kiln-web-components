/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import type { DescriptionListProps } from "./DescriptionList.types";

/** Terms and their details, such as a version's facts: a <dl> with one group per item. */
export function DescriptionList({ items, layout = "columns", className }: DescriptionListProps) {
  const columns = layout === "columns";
  return (
    <div className={classNames("@container/description-list", className)}>
      <dl className="divide-y divide-ash-200 text-sm dark:divide-ash-800">
        {items.map((item, index) => (
          <div
            key={index}
            className={classNames(
              "flex flex-col gap-0.5 py-2.5 first:pt-0 last:pb-0",
              columns && "@md/description-list:grid @md/description-list:grid-cols-[minmax(8rem,1fr)_2fr] @md/description-list:gap-4",
            )}
          >
            <dt className="text-ash-700 dark:text-ash-400">{item.term}</dt>
            <dd className="min-w-0 break-words text-ash-900 dark:text-ash-100">{item.details}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
