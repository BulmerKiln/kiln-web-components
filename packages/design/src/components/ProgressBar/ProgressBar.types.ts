/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProgressBarVariant = "progress" | "meter" | "segmented";
export type ProgressBarSize = "sm" | "md";
/** A fill's color: brand, celadon, accent, brick or ash. */
export type ProgressTone = "brand" | "success" | "warning" | "danger" | "neutral";
/** `strong` is the tone's bold stop (700 light, 600 for warning; 300 dark), `medium` its 500. */
export type ProgressIntensity = "strong" | "medium";

interface ProgressBarOwnProps {
  /** Names the bar; shown above it unless `hideLabel`. */
  label: string;
  hideLabel?: boolean;
  size?: ProgressBarSize;
  /** Placement only. */
  className?: string;
}

/** A task moving toward completion: uploads, scans, imports. */
export interface ProgressProps extends ProgressBarOwnProps {
  variant?: "progress";
  /** Leave out while the amount of work is unknown: the bar sweeps instead. */
  value?: number;
  max?: number;
  /** Shown and announced in place of the percentage: "12 of 40 layers". */
  valueText?: string;
}

/** A measurement in a known range: storage used of a quota, seats of a plan. */
export interface MeterProps extends ProgressBarOwnProps {
  variant: "meter";
  value: number;
  max?: number;
  valueText?: string;
  /** From this value up the fill is warning. */
  warningAt?: number;
  /** From this value up the fill is danger. */
  dangerAt?: number;
}

export interface ProgressSegment {
  label: string;
  value: number;
  tone: ProgressTone;
  intensity?: ProgressIntensity;
}

/** A whole split into parts: findings by severity, storage by format. */
export interface SegmentedProps extends ProgressBarOwnProps {
  variant: "segmented";
  /** In order; each one's share is its value over the sum. */
  segments: ProgressSegment[];
  /** Hides the legend; the bar is then read as one image with every part in its name. */
  hideLegend?: boolean;
}

export type ProgressBarProps = ProgressProps | MeterProps | SegmentedProps;
