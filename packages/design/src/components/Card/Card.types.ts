/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export type CardPadding = "none" | "sm" | "md";

export interface CardProps {
  /** A heading for the card, at `headingLevel`. */
  title?: ReactNode;
  description?: ReactNode;
  /** Buttons or a menu at the end of the header. */
  actions?: ReactNode;
  children?: ReactNode;
  /** A strip at the bottom, such as a link to everything the card summarizes. */
  footer?: ReactNode;
  /** The title's element, to fit the page's heading order. */
  headingLevel?: 2 | 3 | 4;
  /** `none` lets a table or list run edge to edge. */
  padding?: CardPadding;
  /** `section` when the card is a region of the page, labelled by its title. */
  as?: "div" | "section" | "article";
  /** Placement only. */
  className?: string;
}
