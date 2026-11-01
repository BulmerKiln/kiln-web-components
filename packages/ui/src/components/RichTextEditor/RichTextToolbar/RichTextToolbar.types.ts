/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CalloutKind } from "../../../utils/richText";

export type RichTextBlockType =
  | "paragraph"
  | "h1"
  | "h2"
  | "h3"
  | "quote"
  | `callout-${CalloutKind}`
  | "code"
  | "bullet"
  | "number"
  | "check";

export interface RichTextToolbarProps {
  /** Names the toolbar: "<field label> formatting". */
  label: string;
  disabled?: boolean;
}
