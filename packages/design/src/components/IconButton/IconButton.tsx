/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType } from "react";
import classNames from "../../utils/classNames";
import { buttonBase, buttonVariantStyles } from "../../utils/buttonStyles";
import type { ButtonSize } from "../Button/Button.types";
import type { IconButtonProps } from "./IconButton.types";

/** Square, with the icon sized to match the label text of the same size. */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "size-7 rounded-md [&>svg]:size-4 pointer-coarse:size-10",
  md: "size-8 rounded-md [&>svg]:size-4.5 pointer-coarse:size-11",
  lg: "size-10 rounded-lg [&>svg]:size-5 pointer-coarse:size-11",
};

export function IconButton<E extends ElementType = "button">({
  as,
  label,
  variant = "ghost",
  size = "md",
  className,
  ...props
}: IconButtonProps<E>) {
  const href = (props as { href?: string }).href;
  const Component: ElementType = as ?? (href === undefined ? "button" : "a");
  return (
    <Component
      {...(Component === "button" ? { type: "button" } : {})}
      {...props}
      aria-label={label}
      className={classNames(
        buttonBase,
        buttonVariantStyles[variant],
        sizeStyles[size],
        className,
      )}
    />
  );
}
