/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { $convertFromMarkdownString, $convertToMarkdownString } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $createParagraphNode, $getRoot, HISTORY_MERGE_TAG, type LexicalEditor } from "lexical";
import { useEffect, useRef } from "react";
import { markdownTransformers } from "../../../utils/richText";
import type { MarkdownValuePluginProps } from "./MarkdownValuePlugin.types";

/** Replaces the content with `markdown`, as a change that can't be undone. */
function loadMarkdown(editor: LexicalEditor, markdown: string) {
  editor.update(
    () => {
      $convertFromMarkdownString(markdown, markdownTransformers);
      const root = $getRoot();
      if (root.getChildrenSize() === 0) root.append($createParagraphNode());
    },
    { tag: HISTORY_MERGE_TAG },
  );
}

/**
 * Keeps the editor and its Markdown in step. A controlled `value` is loaded when it changes from
 * outside (data finishing loading, a reset after submit); edits are reported as Markdown.
 *
 * Reported values the parent hasn't rendered yet are remembered: typing fast, the parent can render
 * an earlier report after a later one, and reloading it would undo the newer typing and move the
 * caret. Such a value is the parent catching up, not a change from outside.
 */
export function MarkdownValuePlugin({ value, defaultValue, onChange }: MarkdownValuePluginProps) {
  const [editor] = useLexicalComposerContext();
  const last = useRef<string | null>(null);
  const reported = useRef<string[]>([]);
  useEffect(() => {
    const markdown = value ?? (last.current === null ? (defaultValue ?? "") : null);
    if (markdown === null) return;
    const caughtUp = reported.current.indexOf(markdown);
    if (caughtUp >= 0) {
      reported.current = reported.current.slice(caughtUp + 1);
      return;
    }
    if (markdown === last.current) return;
    last.current = markdown;
    reported.current = [];
    loadMarkdown(editor, markdown);
  }, [editor, value, defaultValue]);
  return (
    <OnChangePlugin
      ignoreSelectionChange
      ignoreHistoryMergeTagChange
      onChange={(editorState) => {
        const markdown = editorState.read(() =>
          $getRoot().getTextContent().trim() === "" ? "" : $convertToMarkdownString(markdownTransformers),
        );
        if (markdown === last.current) return;
        last.current = markdown;
        reported.current.push(markdown);
        onChange(markdown);
      }}
    />
  );
}
