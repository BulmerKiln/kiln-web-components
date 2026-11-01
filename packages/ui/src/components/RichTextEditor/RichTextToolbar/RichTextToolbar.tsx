/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { classNames } from "@bulmerkiln/design";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  BoldIcon,
  CheckIcon,
  CheckListIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  ItalicIcon,
  LinkIcon,
  ListBulletIcon,
  NumberedListIcon,
  StrikethroughIcon,
} from "@bulmerkiln/design/icons";
import { $createCodeNode, $isCodeNode } from "@lexical/code";
import { $createLinkNode, $isLinkNode, $toggleLink, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { HistoryExtension } from "@lexical/history";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useExtensionSignalValue } from "@lexical/react/useExtensionSignalValue";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, $isQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import {
  $createParagraphNode,
  $createTextNode,
  $getSelection,
  $getState,
  $isRangeSelection,
  $setSelection,
  $setState,
  type BaseSelection,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  type TextFormatType,
  UNDO_COMMAND,
} from "lexical";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { calloutKinds, calloutState, calloutStyles, linkAttributes } from "../../../utils/richText";
import { moveToolbarFocus, syncToolbarTabStop } from "../RichTextEditor.utils";
import { LinkDialog } from "./LinkDialog/LinkDialog";
import type { RichTextBlockType, RichTextToolbarProps } from "./RichTextToolbar.types";
import { ToolbarButton } from "./ToolbarButton/ToolbarButton";

const textFormats: TextFormatType[] = ["bold", "italic", "strikethrough", "code"];

// Lists have their own buttons, so they aren't offered here.
const blockOptions: { value: RichTextBlockType; label: string; className: string }[] = [
  { value: "paragraph", label: "Paragraph", className: "text-sm" },
  { value: "h1", label: "Heading 1", className: "text-base font-semibold" },
  { value: "h2", label: "Heading 2", className: "text-sm font-semibold" },
  { value: "h3", label: "Heading 3", className: "text-xs font-semibold" },
  { value: "quote", label: "Quote", className: "text-sm italic" },
  ...calloutKinds.map((kind) => ({
    value: `callout-${kind}` as const,
    label: `${calloutStyles[kind].title} callout`,
    className: `text-sm font-semibold ${calloutStyles[kind].text}`,
  })),
  { value: "code", label: "Code block", className: "font-mono text-xs" },
];

const separator = <span aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-ash-200 dark:bg-ash-800" />;

/** Formatting for `RichTextEditor`, following the selection. One tab stop; the arrows move within. */
export function RichTextToolbar({ label, disabled = false }: RichTextToolbarProps) {
  const [editor] = useLexicalComposerContext();
  const canUndo = useExtensionSignalValue(HistoryExtension, "canUndo");
  const canRedo = useExtensionSignalValue(HistoryExtension, "canRedo");
  const toolbar = useRef<HTMLDivElement>(null);
  const [formats, setFormats] = useState<Set<TextFormatType>>(new Set());
  const [blockType, setBlockType] = useState<RichTextBlockType>("paragraph");
  const [inLink, setInLink] = useState(false);
  const [linking, setLinking] = useState(false);
  const linkSelection = useRef<BaseSelection | null>(null);

  useEffect(
    () =>
      editor.registerUpdateListener(({ editorState }) =>
        editorState.read(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;
          setFormats(new Set(textFormats.filter((format) => selection.hasFormat(format))));
          const anchor = selection.anchor.getNode();
          setInLink($findMatchingParent(anchor, $isLinkNode) !== null);
          const block = anchor.getKey() === "root" ? anchor : anchor.getTopLevelElementOrThrow();
          const list = $getNearestNodeOfType(anchor, ListNode);
          if (list && $isListNode(list)) setBlockType(list.getListType());
          else if ($isHeadingNode(block)) setBlockType(block.getTag() as RichTextBlockType);
          else if ($isQuoteNode(block)) {
            const kind = $getState(block, calloutState);
            setBlockType(kind ? `callout-${kind}` : "quote");
          }
          else if ($isCodeNode(block)) setBlockType("code");
          else setBlockType("paragraph");
        }),
      ),
    [editor],
  );

  // Buttons enable and disable as the selection moves; keep one of them in the tab order.
  useLayoutEffect(() => {
    if (toolbar.current) syncToolbarTabStop(toolbar.current);
  });

  const setBlock = (type: RichTextBlockType) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () =>
        type === "h1" || type === "h2" || type === "h3"
          ? $createHeadingNode(type)
          : type === "quote"
            ? $createQuoteNode()
            : type.startsWith("callout-")
              ? $setState($createQuoteNode(), calloutState, calloutKinds.find((kind) => type === `callout-${kind}`) ?? null)
              : type === "code"
                ? $createCodeNode()
                : $createParagraphNode(),
      );
    });
    editor.focus();
  };

  const listCommands = {
    bullet: INSERT_UNORDERED_LIST_COMMAND,
    number: INSERT_ORDERED_LIST_COMMAND,
    check: INSERT_CHECK_LIST_COMMAND,
  };
  const toggleList = (type: keyof typeof listCommands) =>
    editor.dispatchCommand(blockType === type ? REMOVE_LIST_COMMAND : listCommands[type], undefined);

  const toggleLink = () => {
    if (inLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      return;
    }
    // The dialog takes focus, so remember where the link goes.
    linkSelection.current = editor.getEditorState().read(() => $getSelection()?.clone() ?? null);
    setLinking(true);
  };

  const applyLink = (url: string) => {
    setLinking(false);
    editor.update(() => {
      $setSelection(linkSelection.current);
      const current = $getSelection();
      if (!$isRangeSelection(current)) return;
      if (current.isCollapsed()) {
        current.insertNodes([$createLinkNode(url, linkAttributes).append($createTextNode(url))]);
      } else {
        $toggleLink(url, linkAttributes);
      }
    });
    editor.focus();
  };

  const format = (type: TextFormatType) => editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  const isList = blockType === "bullet" || blockType === "number" || blockType === "check";
  const blockLabel = blockOptions.find((option) => option.value === blockType)?.label ?? "Paragraph";

  return (
    <div
      ref={toolbar}
      role="toolbar"
      aria-label={label}
      aria-disabled={disabled || undefined}
      onKeyDown={(event) => {
        if (event.target instanceof HTMLButtonElement && moveToolbarFocus(event.currentTarget, event.key)) {
          event.preventDefault();
        }
      }}
      onFocus={() => toolbar.current && syncToolbarTabStop(toolbar.current)}
      className="flex flex-wrap items-center gap-0.5 rounded-t-md border-b in-[[role=tabpanel]]:rounded-none border-ash-200 bg-ash-50 px-1 py-1 more-contrast:border-ash-500 dark:border-ash-800 dark:bg-ash-950"
    >
      <Listbox value={isList ? "paragraph" : blockType} onChange={setBlock} disabled={disabled || isList}>
        <ListboxButton
          // The name holds the visible style, as WCAG 2.5.3 asks: "Text style: Paragraph".
          aria-label={`Text style: ${blockLabel}`}
          className={classNames(
            "inline-flex h-8 w-40 shrink-0 items-center justify-between gap-1 rounded-md px-2 text-sm text-ash-900 pointer-coarse:h-10",
            "data-hover:bg-ash-100 data-open:bg-ash-100 data-disabled:opacity-50",
            "focus:outline-none data-focus:outline-2 data-focus:outline-offset-1 data-focus:outline-brand-700",
            "dark:text-ash-100 dark:data-hover:bg-ash-800 dark:data-open:bg-ash-800 dark:data-focus:outline-brand-300",
          )}
        >
          <span className="truncate">{blockLabel}</span>
          <ChevronDownIcon className="size-4 text-ash-600 dark:text-ash-400" />
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: "bottom start", gap: 4, padding: 8 }}
          transition
          className="z-50 w-48 rounded-lg bg-white p-1 shadow-lg ring-1 ring-ash-200 transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0 reduce-motion:transition-none dark:bg-ash-900 dark:shadow-black/40 dark:ring-ash-800"
        >
          {blockOptions.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className="group flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-ash-900 select-none data-focus:bg-ash-100 pointer-coarse:py-2.5 dark:text-ash-100 dark:data-focus:bg-ash-800"
            >
              <span className={option.className}>{option.label}</span>
              <CheckIcon className="invisible size-4 text-brand-700 group-data-selected:visible dark:text-brand-300" />
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      {separator}
      <ToolbarButton label="Bold" shortcut={["mod", "B"]} pressed={formats.has("bold")} disabled={disabled} onClick={() => format("bold")}>
        <BoldIcon />
      </ToolbarButton>
      <ToolbarButton label="Italic" shortcut={["mod", "I"]} pressed={formats.has("italic")} disabled={disabled} onClick={() => format("italic")}>
        <ItalicIcon />
      </ToolbarButton>
      <ToolbarButton label="Strikethrough" pressed={formats.has("strikethrough")} disabled={disabled} onClick={() => format("strikethrough")}>
        <StrikethroughIcon />
      </ToolbarButton>
      <ToolbarButton label="Code" pressed={formats.has("code")} disabled={disabled} onClick={() => format("code")}>
        <CodeBracketIcon />
      </ToolbarButton>
      <ToolbarButton label={inLink ? "Remove link" : "Link"} pressed={inLink} disabled={disabled} onClick={toggleLink}>
        <LinkIcon />
      </ToolbarButton>
      {separator}
      <ToolbarButton label="Bulleted list" pressed={blockType === "bullet"} disabled={disabled} onClick={() => toggleList("bullet")}>
        <ListBulletIcon />
      </ToolbarButton>
      <ToolbarButton label="Numbered list" pressed={blockType === "number"} disabled={disabled} onClick={() => toggleList("number")}>
        <NumberedListIcon />
      </ToolbarButton>
      <ToolbarButton label="Task list" pressed={blockType === "check"} disabled={disabled} onClick={() => toggleList("check")}>
        <CheckListIcon />
      </ToolbarButton>
      <span className="ml-auto flex items-center gap-0.5">
        <ToolbarButton label="Undo" shortcut={["mod", "Z"]} disabled={disabled || !canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
          <ArrowUturnLeftIcon />
        </ToolbarButton>
        <ToolbarButton label="Redo" shortcut={["mod", "shift", "Z"]} disabled={disabled || !canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
          <ArrowUturnRightIcon />
        </ToolbarButton>
      </span>
      <LinkDialog open={linking} onClose={() => setLinking(false)} onApply={applyLink} />
    </div>
  );
}
