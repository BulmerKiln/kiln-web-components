/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType } from "react";
import classNames from "../../utils/classNames";
import { buttonBase, buttonVariantStyles } from "../../utils/buttonStyles";
import type { ButtonProps, ButtonSize } from "./Button.types";

/*
 * Slim for a mouse: 28, 32 and 40 px, all above WCAG 2.5.8's 24 px. A coarse
 * pointer (touch) gets 40 to 44 px targets instead.
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-7 gap-1 rounded-md px-2.5 text-xs pointer-coarse:min-h-10",
  md: "min-h-8 gap-1.5 rounded-md px-3 text-sm pointer-coarse:min-h-11",
  lg: "min-h-10 gap-2 rounded-lg px-4 text-sm pointer-coarse:min-h-11",
};

export function Button<E extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps<E>) {
  const href = (props as { href?: string }).href;
  const Component: ElementType = as ?? (href === undefined ? "button" : "a");
  return (
    <Component
      // Only a native button submits forms by default; it never should here.
      {...(Component === "button" ? { type: "button" } : {})}
      {...props}
      className={classNames(
        buttonBase,
        buttonVariantStyles[variant],
        sizeStyles[size],
        className,
      )}
    />
  );
}
