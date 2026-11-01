/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { classNames } from "@bulmerkiln/design";
import { XCircleIcon } from "@bulmerkiln/design/icons";
import { ShikiTokenizer, CodeShikiExtension } from "@lexical/code-shiki";
import { HistoryExtension } from "@lexical/history";
import { LinkExtension } from "@lexical/link";
import { CheckListExtension, ListExtension } from "@lexical/list";
import { registerMarkdownShortcuts } from "@lexical/markdown";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalExtensionComposer } from "@lexical/react/LexicalExtensionComposer";
import { RichTextExtension } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { configExtension, defineExtension } from "lexical";
import { type CSSProperties, useCallback, useId, useRef, useState } from "react";
import { codeTheme } from "../../utils/codeTheme";
import {
  isSafeLinkUrl,
  linkAttributes,
  markdownTransformers,
  registerRichTextRules,
  richTextNodes,
  richTextTheme,
} from "../../utils/richText";
import { RichTextContent } from "../RichTextContent/RichTextContent";
import { EditorBehaviorPlugin } from "./EditorBehaviorPlugin/EditorBehaviorPlugin";
import { MarkdownValuePlugin } from "./MarkdownValuePlugin/MarkdownValuePlugin";
import type { RichTextEditorProps } from "./RichTextEditor.types";
import { RichTextToolbar } from "./RichTextToolbar/RichTextToolbar";

// Module scope, so the editor isn't rebuilt on every render.
const editorExtension = defineExtension({
  name: "@bulmerkiln/ui/RichTextEditor",
  namespace: "RichTextEditor",
  theme: richTextTheme,
  nodes: richTextNodes,
  dependencies: [
    RichTextExtension,
    HistoryExtension,
    ListExtension,
    CheckListExtension,
    configExtension(LinkExtension, { validateUrl: isSafeLinkUrl, attributes: linkAttributes }),
    // Code without a language stays plain, so a fence without one round-trips as written.
    configExtension(CodeShikiExtension, { tokenizer: { ...ShikiTokenizer, defaultLanguage: null, defaultTheme: codeTheme } }),
  ],
  register: (editor) =>
    mergeRegister(registerMarkdownShortcuts(editor, markdownTransformers), registerRichTextRules(editor)),
  onError: (error: Error) => {
    throw error;
  },
});

/*
 * The field's ring is its boundary, so it clears 3:1 (ash-500); invalid is brick, as in Textarea.
 * Outside the box, not inset: the toolbar's background would paint over an inset ring.
 */
const frame =
  "rounded-md ring-1 " +
  "has-[[contenteditable]:focus-visible]:outline-2 has-[[contenteditable]:focus-visible]:outline-offset-0";

// Write and Preview: the selected tab's 2 px underline marks it beyond color, as in Tabs.
const tab =
  "-mb-px border-b-2 border-transparent px-2.5 pt-1.5 pb-1.5 text-sm font-medium text-ash-700 " +
  "data-hover:text-ash-900 data-selected:border-brand-700 data-selected:text-ash-900 " +
  "focus:outline-none data-focus:rounded-t-sm data-focus:outline-2 data-focus:outline-brand-700 pointer-coarse:py-2.5 " +
  "dark:text-ash-400 dark:data-hover:text-ash-100 dark:data-selected:border-brand-300 dark:data-selected:text-ash-100 " +
  "dark:data-focus:outline-brand-300";

/**
 * A text field with formatting that reads and writes Markdown: headings, quotes, callouts, lists,
 * task lists, fenced code, bold, italic, strikethrough, inline code and links. Markdown typed as you go (`## `, `- `,
 * `**bold**`) formats too. Show what it writes with `RichTextContent`.
 */
export function RichTextEditor({
  label,
  hideLabel = false,
  name,
  description,
  placeholder,
  value,
  defaultValue,
  onChange,
  autoFocus = false,
  onSubmitShortcut,
  required = false,
  disabled = false,
  rows = 4,
  preview = false,
  maxLength,
  error,
  className,
  ref,
}: RichTextEditorProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = description ? `${id}-description` : undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const markdown = value ?? internal;
  const overBy = maxLength !== undefined ? markdown.length - maxLength : 0;
  const message =
    error ??
    (overBy > 0
      ? `Shorten this by ${overBy.toLocaleString()} ${overBy === 1 ? "character" : "characters"}: it can be up to ${maxLength?.toLocaleString()}.`
      : undefined);
  const errorId = message ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  const [previewing, setPreviewing] = useState(false);
  const editable = useRef<HTMLDivElement | null>(null);
  const setEditable = useCallback(
    (node: HTMLDivElement | null) => {
      editable.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const editableProps = {
    ref: setEditable,
    "aria-labelledby": labelId,
    "aria-describedby": describedBy,
    "aria-invalid": message ? true : undefined,
    "aria-required": required || undefined,
    "aria-multiline": true,
    style: { "--rows": rows } as CSSProperties,
    className:
      "min-h-[calc(var(--rows)*1.5rem+1rem)] px-2.5 py-2 text-base text-ash-900 outline-none sm:text-sm dark:text-ash-100",
  };

  const write = (
    <>
      <RichTextToolbar label={`${label} formatting`} disabled={disabled} />
      <div className="relative">
        {placeholder ? (
          <ContentEditable
            {...editableProps}
            aria-placeholder={placeholder}
            placeholder={
              <p className="pointer-events-none absolute top-2 left-2.5 text-base text-ash-600 select-none sm:text-sm dark:text-ash-500">
                {placeholder}
              </p>
            }
          />
        ) : (
          <ContentEditable {...editableProps} />
        )}
      </div>
    </>
  );

  return (
    <div className={classNames("flex w-full min-w-0 flex-col gap-1.5", className)}>
      {/* Not a <label for>: the editable area isn't a form control, so a click focuses it instead. */}
      <span
        id={labelId}
        onClick={() => editable.current?.focus()}
        className={hideLabel ? "sr-only" : "text-sm font-medium text-ash-900 dark:text-ash-100"}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-brick-700 dark:text-brick-400">
            {" "}
            *
          </span>
        )}
      </span>
      {description && (
        <p id={descriptionId} className="text-sm text-ash-700 dark:text-ash-400">
          {description}
        </p>
      )}
      <LexicalExtensionComposer extension={editorExtension} contentEditable={null}>
        <div
          className={classNames(
            frame,
            message
              ? "ring-brick-700 has-[[contenteditable]:focus-visible]:outline-brick-700 dark:ring-brick-400 dark:has-[[contenteditable]:focus-visible]:outline-brick-400"
              : "ring-ash-500 has-[[contenteditable]:focus-visible]:outline-brand-700 dark:has-[[contenteditable]:focus-visible]:outline-brand-300",
            disabled ? "bg-ash-50 dark:bg-ash-950" : "bg-white dark:bg-ash-900",
          )}
        >
          {preview ? (
            <TabGroup selectedIndex={previewing ? 1 : 0} onChange={(index) => setPreviewing(index === 1)}>
              <TabList
                aria-label={`${label} view`}
                className="flex gap-1 rounded-t-md border-b border-ash-200 bg-ash-50 px-1.5 more-contrast:border-ash-500 dark:border-ash-800 dark:bg-ash-950"
              >
                <Tab className={tab}>Write</Tab>
                <Tab className={tab}>Preview</Tab>
              </TabList>
              <TabPanels>
                {/* Kept mounted while hidden, so the text, caret and undo history survive a preview. */}
                <TabPanel unmount={false} tabIndex={-1}>
                  {write}
                </TabPanel>
                <TabPanel
                  unmount={false}
                  style={{ "--rows": rows } as CSSProperties}
                  className="min-h-[calc(var(--rows)*1.5rem+3.5rem)] px-2.5 py-2 focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-brand-700 dark:data-focus:outline-brand-300"
                >
                  {!previewing ? null : markdown.trim() ? (
                    <RichTextContent value={markdown} />
                  ) : (
                    <p className="text-sm text-ash-700 dark:text-ash-400">Nothing to preview yet.</p>
                  )}
                </TabPanel>
              </TabPanels>
            </TabGroup>
          ) : (
            write
          )}
        </div>
        <MarkdownValuePlugin
          value={value}
          defaultValue={defaultValue}
          onChange={(next) => {
            setInternal(next);
            onChange?.(next);
          }}
        />
        <EditorBehaviorPlugin disabled={disabled} autoFocus={autoFocus} onSubmitShortcut={onSubmitShortcut} />
      </LexicalExtensionComposer>
      {name && <input type="hidden" name={name} value={markdown} disabled={disabled} />}
      {message && (
        <p id={errorId} role="alert" className="flex gap-1.5 text-sm text-brick-700 dark:text-brick-400">
          <XCircleIcon className="mt-0.5 size-4" />
          <span>{message}</span>
        </p>
      )}
    </div>
  );
}
