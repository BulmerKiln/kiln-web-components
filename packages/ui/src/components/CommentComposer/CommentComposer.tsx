/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, classNames, Kbd, Spinner } from "@bulmerkiln/design";
import { useState } from "react";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";
import type { CommentComposerProps } from "./CommentComposer.types";

/**
 * The editor with a submit button: ⌘Enter / Ctrl+Enter submits too. It waits on the app's
 * promise, clears when it resolves, and keeps the text and says what to do when it rejects.
 */
export function CommentComposer({
  label = "Comment",
  showLabel = false,
  placeholder = "Leave a comment. Markdown works.",
  defaultValue = "",
  submitLabel = "Comment",
  onSubmit,
  onCancel,
  preview = false,
  maxLength = 10000,
  autoFocus = false,
  className,
}: CommentComposerProps) {
  const [markdown, setMarkdown] = useState(defaultValue);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const submit = async () => {
    if (pending) return;
    if (markdown.trim() === "") {
      setError("Write something first.");
      return;
    }
    if (markdown.length > maxLength) return;
    setPending(true);
    setError(undefined);
    try {
      await onSubmit(markdown);
      setMarkdown("");
    } catch {
      setError("That didn't save. Your text is still here: try again in a moment.");
    } finally {
      setPending(false);
    }
  };
  return (
    <div className={classNames("flex flex-col gap-2", className)}>
      <RichTextEditor
        autoFocus={autoFocus}
        label={label}
        hideLabel={!showLabel}
        placeholder={placeholder}
        value={markdown}
        onChange={(next) => {
          setMarkdown(next);
          if (error && next.trim() !== "") setError(undefined);
        }}
        onSubmitShortcut={submit}
        disabled={pending}
        maxLength={maxLength}
        preview={preview}
        error={error}
        rows={3}
      />
      <div className="flex items-center justify-end gap-3">
        <span className="hidden text-xs text-ash-700 sm:inline dark:text-ash-400">
          <Kbd keys={["mod", "enter"]} /> to {submitLabel.toLowerCase()}
        </span>
        {onCancel && (
          <Button variant="secondary" size="sm" onClick={onCancel} disabled={pending}>
            Cancel
          </Button>
        )}
        <Button size="sm" onClick={submit} disabled={pending}>
          {pending && <Spinner label="Saving" className="size-3.5" />}
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
