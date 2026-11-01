/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import { Icon } from "../Icon/Icon";
import type { LogoLayout, LogoProps, LogoSize } from "./Logo.types";

// The wordmark's size sets the lockup's; the mark and gap scale with it in em.
const layoutStyles: Record<LogoLayout, string> = {
  horizontal: "flex-row gap-[0.25em]",
  stacked: "flex-col gap-[0.33em]",
};

const markStyles: Record<LogoLayout, string> = {
  horizontal: "size-[1.08em]",
  stacked: "size-[2.22em]",
};

const sizeStyles: Record<LogoSize, string> = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-6xl",
};

export function Logo({
  layout = "horizontal",
  size = "md",
  variant = "color",
  className,
}: LogoProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center font-sans leading-none font-semibold tracking-tight",
        "text-ash-900 dark:text-ash-100",
        layoutStyles[layout],
        sizeStyles[size],
        className,
      )}
    >
      <Icon variant={variant} className={markStyles[layout]} />
      <span>Kiln</span>
    </span>
  );
}
