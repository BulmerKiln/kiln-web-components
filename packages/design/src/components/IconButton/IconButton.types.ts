/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType, ReactElement } from "react";
import type { PolymorphicProps } from "../../types/polymorphic";
import type { ButtonSize, ButtonVariant } from "../Button/Button.types";

export interface IconButtonOwnProps {
  /** The accessible name, required: the button shows no text. */
  label: string;
  /** One icon from `@bulmerkiln/design/icons`; it's sized to the button. */
  children: ReactElement;
  /** Defaults to `ghost`. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Placement only. */
  className?: string;
  /** Navigates instead of acting; renders an <a>, or `as`. */
  href?: string;
}

export type IconButtonProps<E extends ElementType = "button"> = PolymorphicProps<
  E,
  IconButtonOwnProps
>;
