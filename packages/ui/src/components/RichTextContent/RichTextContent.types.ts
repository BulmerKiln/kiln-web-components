/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RichTextContentProps {
  /** Markdown, as `RichTextEditor` writes it. Anything it doesn't support shows as plain text. */
  value: string;
  /** Placement only. */
  className?: string;
}
