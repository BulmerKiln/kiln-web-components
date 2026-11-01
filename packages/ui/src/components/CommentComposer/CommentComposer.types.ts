/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CommentComposerProps {
  /** Names the field: "Comment", "Reply to Ada Lovelace". */
  label?: string;
  /** Shows the label; it's hidden by default, where the place makes it plain. */
  showLabel?: boolean;
  placeholder?: string;
  /** Text to start from, such as the comment being edited. */
  defaultValue?: string;
  /** The submit button's text: "Comment", "Reply", "Save". */
  submitLabel?: string;
  /** Called with the Markdown. While a returned promise is pending the composer waits; if it rejects, the text is kept and the composer says so. */
  onSubmit: (markdown: string) => void | Promise<void>;
  /** Shows a Cancel button. */
  onCancel?: () => void;
  /** Adds the editor's Write and Preview tabs. */
  preview?: boolean;
  /** Longest Markdown accepted. */
  maxLength?: number;
  /** Focuses the text when it appears, as when replying or editing. */
  autoFocus?: boolean;
  /** Placement only. */
  className?: string;
}
