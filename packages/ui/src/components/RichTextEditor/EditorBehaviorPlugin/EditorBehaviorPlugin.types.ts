/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EditorBehaviorPluginProps {
  /** Makes the editor read-only. */
  disabled: boolean;
  /** Focuses the text on mount, with the caret at the end. */
  autoFocus: boolean;
  /** Called on ⌘Enter / Ctrl+Enter. */
  onSubmitShortcut?: () => void;
}
