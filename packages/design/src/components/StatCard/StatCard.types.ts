/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export type StatTrend = "up" | "down" | "flat";
/** Whether the change is good news; it sets the color, never the only cue. */
export type StatSentiment = "positive" | "negative" | "neutral";

export interface StatChange {
  /** As shown: "12%", "3 more". */
  value: string;
  trend: StatTrend;
  sentiment?: StatSentiment;
  /** The comparison, shown after it: "vs last week". */
  period?: string;
}

export interface StatCardProps {
  label: ReactNode;
  /** The figure, formatted: "12,410", "3.1 GB". */
  value: ReactNode;
  change?: StatChange;
  /** A line under the figure, such as what it counts. */
  description?: ReactNode;
  /** Placement only. */
  className?: string;
}
