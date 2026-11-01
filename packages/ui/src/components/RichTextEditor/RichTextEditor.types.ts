/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Ref } from "react";

export interface RichTextEditorProps {
  /** Names the field, its toolbar ("<label> formatting") and the editable area. */
  label: string;
  /** Keeps `label` as the accessible name but hides it. */
  hideLabel?: boolean;
  /** Submits the Markdown with a form, through a hidden input of this name. */
  name?: string;
  /** Help text under the label. */
  description?: string;
  /** Shown while empty; never instead of a label. */
  placeholder?: string;
  /** Controlled Markdown. Leave it out and use `defaultValue` to let the editor keep its own. */
  value?: string;
  /** Initial Markdown when uncontrolled. */
  defaultValue?: string;
  /** Called with the content as Markdown, or "" when empty. */
  onChange?: (markdown: string) => void;
  /** Focuses the text on mount with the caret at the end, as when replying or editing. */
  autoFocus?: boolean;
  /** Called on ⌘Enter / Ctrl+Enter, to submit without leaving the keyboard. */
  onSubmitShortcut?: () => void;
  required?: boolean;
  disabled?: boolean;
  /**
   * Adds Write and Preview tabs: Preview shows the Markdown as `RichTextContent` will, links and
   * code blocks included. Switching keeps the text, the caret and the undo history.
   */
  preview?: boolean;
  /** Lines of text shown before the editor grows. */
  rows?: number;
  /** Longest Markdown accepted; past it the field is invalid and says by how much. */
  maxLength?: number;
  /** What went wrong and how to fix it; marks the field invalid and is announced. */
  error?: string;
  /** Placement only. */
  className?: string;
  /** The editable area. */
  ref?: Ref<HTMLDivElement>;
}
