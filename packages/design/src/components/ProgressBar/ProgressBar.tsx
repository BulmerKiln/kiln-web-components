/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useId, type CSSProperties } from "react";
import classNames from "../../utils/classNames";
import type {
  MeterProps,
  ProgressBarProps,
  ProgressBarSize,
  ProgressIntensity,
  ProgressProps,
  ProgressSegment,
  ProgressTone,
  SegmentedProps,
} from "./ProgressBar.types";

/*
 * Fills against the track (ash-200 light, ash-800 dark): strong fills 3.84 to
 * 6.38:1. Segments sit apart, 2 px of page between them, so each is measured
 * against the page instead: strong 6.0:1 or better, medium 3.5:1 or better.
 * The legend says every value in text, so color is never the only carrier.
 */
const fills: Record<ProgressIntensity, Record<ProgressTone, string>> = {
  strong: {
    brand: "bg-brand-700 dark:bg-brand-300",
    success: "bg-celadon-700 dark:bg-celadon-300",
    // accent-600, not 700: 700 reads olive rather than amber. 3.84:1 on the track, 5.12:1 on white.
    warning: "bg-accent-600 dark:bg-accent-300",
    danger: "bg-brick-700 dark:bg-brick-300",
    neutral: "bg-ash-700 dark:bg-ash-300",
  },
  medium: {
    brand: "bg-brand-500",
    success: "bg-celadon-500",
    warning: "bg-accent-500",
    danger: "bg-brick-500",
    neutral: "bg-ash-500",
  },
};

const sizeStyles: Record<ProgressBarSize, string> = {
  sm: "h-1.5",
  md: "h-2",
};

const track = "relative w-full overflow-hidden rounded-full bg-ash-200 dark:bg-ash-800";

const percent = (value: number, max: number) =>
  max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

// Widths are runtime values: they go through a CSS variable read by `w-(--fill)`.
const fillWidth = (pct: number) => ({ "--fill": `${pct}%` }) as CSSProperties;

function Header({ id, label, value }: { id: string; label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <span id={id} className="font-medium text-ash-900 dark:text-ash-100">
        {label}
      </span>
      {value && <span className="text-ash-700 tabular-nums dark:text-ash-400">{value}</span>}
    </div>
  );
}

function Single(props: ProgressProps | MeterProps) {
  const id = useId();
  const { label, hideLabel, size = "md", max = 100, valueText, className } = props;
  const meter = props.variant === "meter";
  const value = props.value;
  const pct = value === undefined ? undefined : percent(value, max);
  let tone: ProgressTone = "brand";
  if (meter && value !== undefined) {
    if (props.dangerAt !== undefined && value >= props.dangerAt) tone = "danger";
    else if (props.warningAt !== undefined && value >= props.warningAt) tone = "warning";
  }
  const shown = valueText ?? (pct === undefined ? undefined : `${Math.round(pct)}%`);
  return (
    <div className={classNames("flex flex-col gap-1.5", className)}>
      {!hideLabel && <Header id={id} label={label} value={shown} />}
      <div
        role={meter ? "meter" : "progressbar"}
        aria-labelledby={hideLabel ? undefined : id}
        aria-label={hideLabel ? label : undefined}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={valueText}
        className={classNames(track, sizeStyles[size])}
      >
        {pct === undefined ? (
          <div
            data-part="fill"
            className={classNames(
              "h-full w-2/5 rounded-full animate-progress-sweep reduce-motion:animate-none",
              fills.strong.brand,
            )}
          />
        ) : (
          <div
            data-part="fill"
            style={fillWidth(pct)}
            className={classNames(
              "h-full w-(--fill) rounded-full transition-[width] duration-300 reduce-motion:transition-none",
              fills.strong[tone],
            )}
          />
        )}
      </div>
    </div>
  );
}

const describe = (segment: ProgressSegment, total: number) =>
  `${segment.value} (${Math.round(percent(segment.value, total))}%)`;

function Segmented({ label, hideLabel, hideLegend, size = "md", segments, className }: SegmentedProps) {
  const id = useId();
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const shown = segments.filter((segment) => segment.value > 0);
  const summary = `${label}: ${segments.map((s) => `${s.label} ${describe(s, total)}`).join(", ")}`;
  const swatch = (segment: ProgressSegment) => fills[segment.intensity ?? "strong"][segment.tone];
  return (
    <div
      role={hideLegend ? undefined : "group"}
      aria-labelledby={hideLegend || hideLabel ? undefined : id}
      aria-label={!hideLegend && hideLabel ? label : undefined}
      className={classNames("flex flex-col gap-2", className)}
    >
      {!hideLabel && <Header id={id} label={label} value={hideLegend ? undefined : String(total)} />}
      <div
        {...(hideLegend ? { role: "img", "aria-label": summary } : { "aria-hidden": true })}
        className={classNames(track, "flex gap-0.5 bg-transparent dark:bg-transparent", sizeStyles[size])}
      >
        {total === 0 ? (
          <div className="h-full w-full bg-ash-200 dark:bg-ash-800" />
        ) : (
          shown.map((segment) => (
            <div
              key={segment.label}
              data-part="segment"
              style={fillWidth(percent(segment.value, total))}
              className={classNames("h-full w-(--fill) shrink-0 first:rounded-l-full last:rounded-r-full", swatch(segment))}
            />
          ))
        )}
      </div>
      {!hideLegend && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ash-700 dark:text-ash-400">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={classNames("size-2 rounded-full", swatch(segment))} />
              <span className="font-medium text-ash-900 dark:text-ash-100">{segment.label}</span>
              <span className="tabular-nums">{describe(segment, total)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * One bar, three meanings: `progress` (role progressbar) for work getting
 * done, `meter` (role meter) for a measurement in a range, `segmented` for a
 * whole split into parts, with a legend.
 */
export function ProgressBar(props: ProgressBarProps) {
  return props.variant === "segmented" ? <Segmented {...props} /> : <Single {...props} />;
}
