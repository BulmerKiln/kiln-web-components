/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowDownIcon } from "../../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../icons/ArrowUpIcon";
import { MinusIcon } from "../../icons/MinusIcon";
import classNames from "../../utils/classNames";
import type { StatCardProps, StatSentiment, StatTrend } from "./StatCard.types";

// Text on the card: celadon-700 6.43, brick-700 6.42, ash-700 8.50 (light); celadon-300, brick-300, ash-400 (dark).
const sentimentStyles: Record<StatSentiment, string> = {
  positive: "text-celadon-700 dark:text-celadon-300",
  negative: "text-brick-700 dark:text-brick-300",
  neutral: "text-ash-700 dark:text-ash-400",
};

const trendIcons = { up: ArrowUpIcon, down: ArrowDownIcon, flat: MinusIcon };
const trendWords: Record<StatTrend, string> = { up: "Up", down: "Down", flat: "No change," };

/**
 * One figure with its label: a <dl>, so the label is the term and the figure
 * its value. A change's direction is read as words, not left to the arrow.
 */
export function StatCard({ label, value, change, description, className }: StatCardProps) {
  const Trend = change ? trendIcons[change.trend] : null;
  return (
    <dl
      className={classNames(
        "flex flex-col gap-1 rounded-xl bg-white px-4 py-3.5 shadow-xs ring-1 ring-ash-200",
        "dark:bg-ash-900 dark:shadow-none dark:ring-ash-800",
        className,
      )}
    >
      <dt className="text-sm text-ash-700 dark:text-ash-400">{label}</dt>
      <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-2xl font-semibold tracking-tight text-ash-900 tabular-nums dark:text-ash-100">
          {value}
        </span>
        {change && Trend && (
          <span
            className={classNames(
              "inline-flex items-center gap-0.5 text-sm font-medium",
              sentimentStyles[change.sentiment ?? "neutral"],
            )}
          >
            <Trend className="size-3.5" />
            <span className="sr-only">{trendWords[change.trend]} </span>
            {change.value}
            {change.period && (
              <span className="ml-1 font-normal text-ash-700 dark:text-ash-400">{change.period}</span>
            )}
          </span>
        )}
      </dd>
      {description && <dd className="text-xs text-ash-700 dark:text-ash-400">{description}</dd>}
    </dl>
  );
}
