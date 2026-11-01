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
import type { AlertProps } from "./Alert.types";

/** A message inside the content, about the content around it. */
export function Alert({
  variant = "info",
  title,
  children,
  actions,
  onDismiss,
  announce,
  className,
}: AlertProps) {
  const Glyph = feedbackIcon[variant];
  const urgent = variant === "danger" || variant === "warning";
  return (
    <div
      role={announce ? (urgent ? "alert" : "status") : undefined}
      className={classNames(
        "flex gap-2.5 rounded-lg px-3.5 py-3 text-sm ring-1 ring-inset",
        feedbackSurface[variant],
        className,
      )}
    >
      <Glyph className={classNames("mt-0.5 size-4", feedbackIconColor[variant])} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div>{children}</div>}
        {actions && <div className="mt-2 flex flex-wrap gap-2">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="-m-1 flex size-6 shrink-0 items-center justify-center rounded-md hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-current"
        >
          <XMarkIcon className="size-4" />
        </button>
      )}
    </div>
  );
}
