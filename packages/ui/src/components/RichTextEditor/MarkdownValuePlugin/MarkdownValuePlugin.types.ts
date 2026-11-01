/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MarkdownValuePluginProps {
  /** Controlled Markdown; loaded whenever it changes from outside. */
  value?: string;
  /** Loaded once, when uncontrolled. */
  defaultValue?: string;
  onChange: (markdown: string) => void;
}
