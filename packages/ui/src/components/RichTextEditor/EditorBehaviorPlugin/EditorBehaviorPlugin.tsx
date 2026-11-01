/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from "lexical";
import { useEffect } from "react";
import type { EditorBehaviorPluginProps } from "./EditorBehaviorPlugin.types";

/**
 * Read-only while disabled, focused at the end when asked, and ⌘Enter / Ctrl+Enter submits instead
 * of starting a paragraph.
 */
export function EditorBehaviorPlugin({ disabled, autoFocus, onSubmitShortcut }: EditorBehaviorPluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => editor.setEditable(!disabled), [editor, disabled]);
  // The caret goes after any text being edited.
  useEffect(() => {
    if (autoFocus) editor.focus(undefined, { defaultSelection: "rootEnd" });
  }, [editor, autoFocus]);
  useEffect(() => {
    if (!onSubmitShortcut) return;
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        if (!event || !(event.metaKey || event.ctrlKey)) return false;
        event.preventDefault();
        onSubmitShortcut();
        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor, onSubmitShortcut]);
  return null;
}
