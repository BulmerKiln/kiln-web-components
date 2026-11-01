/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { XMarkIcon } from "../../icons/XMarkIcon";
import classNames from "../../utils/classNames";
import {
  feedbackIcon,
  feedbackIconColor,
  feedbackSurface,
} from "../../utils/feedbackStyles";
import type { BannerProps } from "./Banner.types";

/** A full-width strip above the page, about the whole app. */
export function Banner({
  variant = "info",
  children,
  action,
  onDismiss,
  className,
}: BannerProps) {
  const Glyph = feedbackIcon[variant];
  return (
    <div
      className={classNames(
        "flex items-center gap-3 px-4 py-2 text-sm ring-1 ring-inset",
        feedbackSurface[variant],
        className,
      )}
    >
      <div className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="flex items-center gap-2">
          <Glyph className={classNames("size-4", feedbackIconColor[variant])} />
          {children}
        </span>
        {action}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="flex size-6 shrink-0 items-center justify-center rounded-md hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-current"
        >
          <XMarkIcon className="size-4" />
        </button>
      )}
    </div>
  );
}
