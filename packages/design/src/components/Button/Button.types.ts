/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType, ReactNode } from "react";
import type { PolymorphicProps } from "../../types/polymorphic";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonOwnProps {
  /** `primary` for the one main action in a view; `ghost` for quiet actions. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  /** Placement only (width, margins, grid position), never color or shape. */
  className?: string;
  /**
   * A link that looks like a button: it navigates, it doesn't act. Without
   * `as` it renders an <a>; with `as={NextLink}` the router's link.
   */
  href?: string;
}

/**
 * A <button> by default. `as` renders another element or component (an
 * app's router link) with the same styles and the rest of the props.
 */
export type ButtonProps<E extends ElementType = "button"> = PolymorphicProps<
  E,
  ButtonOwnProps
>;
