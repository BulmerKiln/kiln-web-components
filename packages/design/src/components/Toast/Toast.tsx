/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "../../icons/XMarkIcon";
import classNames from "../../utils/classNames";
import { feedbackIcon, feedbackIconColor } from "../../utils/feedbackStyles";
import type { ToastProps } from "./Toast.types";

const defaultDuration = 6000;

/**
 * One notification. Shown through `useToast()`; the ToastProvider owns the
 * live region it appears in. Hovering or focusing it stops the timer (WCAG 2.2.1).
 */
export function Toast({
  variant = "info",
  title,
  description,
  duration = variant === "danger" ? null : defaultDuration,
  onDismiss,
}: ToastProps) {
  const [paused, setPaused] = useState(false);
  const remaining = useRef(duration ?? 0);
  useEffect(() => {
    if (duration === null || paused) return;
    const started = Date.now();
    const timer = setTimeout(onDismiss, remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - started;
    };
  }, [duration, paused, onDismiss]);
  const Glyph = feedbackIcon[variant];
  return (
    <div
      role={variant === "danger" ? "alert" : "status"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="pointer-events-auto flex w-80 max-w-full gap-2.5 rounded-lg bg-white px-3.5 py-3 text-sm text-ash-900 shadow-lg ring-1 ring-ash-200 dark:bg-ash-900 dark:text-ash-100 dark:shadow-black/40 dark:ring-ash-800"
    >
      <Glyph className={classNames("mt-0.5 size-4", feedbackIconColor[variant])} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="font-medium">{title}</p>
        {description && (
          <p className="text-ash-700 dark:text-ash-400">{description}</p>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className="-m-1 flex size-6 shrink-0 items-center justify-center rounded-md text-ash-700 hover:bg-ash-100 hover:text-ash-900 focus-visible:outline-2 focus-visible:outline-brand-700 dark:text-ash-400 dark:hover:bg-ash-800 dark:hover:text-ash-100 dark:focus-visible:outline-brand-300"
      >
        <XMarkIcon className="size-4" />
      </button>
    </div>
  );
}
