/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import { Icon } from "../Icon/Icon";
import type { SpinnerOverlayProps } from "./SpinnerOverlay.types";

/**
 * Loading for a whole page or region: the Kiln mark with its flame flickering,
 * on the page's own background, with the label announced politely. Spinner is
 * the inline one.
 */
export function SpinnerOverlay({
  label = "Loading",
  contained = false,
  className,
}: SpinnerOverlayProps) {
  return (
    <div
      role="status"
      className={classNames(
        contained ? "absolute" : "fixed",
        "inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white dark:bg-ash-950",
        className,
      )}
    >
      <Icon animated className="size-16" />
      <p className="text-sm text-ash-700 dark:text-ash-400">{label}</p>
    </div>
  );
}
