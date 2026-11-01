/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { $isListNode, ListItemNode, ListNode } from "@lexical/list";
import {
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  CHECK_LIST,
  CODE,
  type ElementTransformer,
  HEADING,
  INLINE_CODE,
  ITALIC_STAR,
  ITALIC_UNDERSCORE,
  LINK,
  ORDERED_LIST,
  QUOTE,
  STRIKETHROUGH,
  type Transformer,
  UNORDERED_LIST,
} from "@lexical/markdown";
import { $createQuoteNode, $isQuoteNode, HeadingNode, QuoteNode } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import {
  $getState,
  $isLineBreakNode,
  $setState,
  createState,
  type EditorThemeClasses,
  type Klass,
  $getNodeByKey,
  type LexicalEditor,
  type LexicalNode,
  ParagraphNode,
  TextNode,
  type TextFormatType,
} from "lexical";

export type CalloutKind = "note" | "tip" | "important" | "warning" | "caution";

export const calloutKinds: CalloutKind[] = ["note", "tip", "important", "warning", "caution"];

/** A quote that's a callout carries its kind; a plain quote carries none. */
export const calloutState = createState("callout", {
  parse: (value): CalloutKind | null => (calloutKinds.includes(value as CalloutKind) ? (value as CalloutKind) : null),
});

/**
 * GitHub's alerts: a quote whose first line is `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]` or
 * `[!CAUTION]`. The marker line starts a callout; QUOTE then appends the `>` lines that follow, as
 * it does to any quote. Listed before QUOTE, so it writes callouts first.
 */
export const CALLOUT: ElementTransformer = {
  dependencies: [QuoteNode],
  export: (node, exportChildren) => {
    if (!$isQuoteNode(node)) return null;
    const kind = $getState(node, calloutState);
    if (!kind) return null;
    const body = exportChildren(node);
    const lines = body ? body.split("\n").map((line) => `> ${line}`) : [];
    return [`> [!${kind.toUpperCase()}]`, ...lines].join("\n");
  },
  regExp: /^>\s?\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/i,
  replace: (parentNode, children, match) => {
    const callout = $setState($createQuoteNode(), calloutState, match[1].toLowerCase() as CalloutKind);
    callout.append(...children);
    parentNode.replace(callout);
  },
  type: "element",
};

/*
 * The Markdown that rich text reads and writes: CommonMark's headings, quotes, lists, fenced code,
 * emphasis, inline code and links, plus GFM's strikethrough and task lists and GitHub's callouts.
 * Nothing else round-trips, so nothing else is offered or kept. Task lists come before bullet
 * lists and callouts before quotes, so the more specific form wins.
 */
export const markdownTransformers: Transformer[] = [
  HEADING,
  CALLOUT,
  QUOTE,
  CHECK_LIST,
  UNORDERED_LIST,
  ORDERED_LIST,
  CODE,
  INLINE_CODE,
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  ITALIC_STAR,
  ITALIC_UNDERSCORE,
  STRIKETHROUGH,
  LINK,
];

export const richTextNodes: Klass<LexicalNode>[] = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  LinkNode,
  CodeNode,
  CodeHighlightNode,
];

const safeProtocols = new Set(["http:", "https:", "mailto:"]);

/** Only absolute http, https and mailto links: never `javascript:`, `data:` or a relative path. */
export function isSafeLinkUrl(url: string): boolean {
  try {
    return safeProtocols.has(new URL(url).protocol);
  } catch {
    return false;
  }
}

/** Links in rich text are someone else's: they open apart from the app and pass no credit or referrer. */
export const linkAttributes = { rel: "noopener noreferrer nofollow ugc", target: "_blank" } as const;

// Formats a paste can bring that Markdown can't hold.
const unsupportedFormats: TextFormatType[] = [
  "underline",
  "highlight",
  "subscript",
  "superscript",
  "lowercase",
  "uppercase",
  "capitalize",
];

/**
 * Keeps the content to what Markdown holds as it changes, whether typed, pasted or loaded: unsafe
 * links become their text, and formats, styles, alignment and indents Markdown can't hold are
 * dropped, so what's shown is what's saved.
 */
export function registerRichTextRules(editor: LexicalEditor): () => void {
  return mergeRegister(
    editor.registerNodeTransform(LinkNode, (link) => {
      if (isSafeLinkUrl(link.getURL())) {
        if (link.getRel() !== linkAttributes.rel) link.setRel(linkAttributes.rel);
        if (link.getTarget() !== linkAttributes.target) link.setTarget(linkAttributes.target);
        return;
      }
      for (const child of link.getChildren()) link.insertBefore(child);
      link.remove();
    }),
    editor.registerNodeTransform(TextNode, (text) => {
      for (const format of unsupportedFormats) if (text.hasFormat(format)) text.toggleFormat(format);
      if (text.getStyle() !== "") text.setStyle("");
    }),
    editor.registerNodeTransform(ParagraphNode, (paragraph) => {
      if (paragraph.getFormatType() !== "") paragraph.setFormat("");
      if (paragraph.getIndent() !== 0) paragraph.setIndent(0);
    }),
    editor.registerNodeTransform(HeadingNode, (heading) => {
      if (heading.getFormatType() !== "") heading.setFormat("");
    }),
    // A callout's body follows its marker line, so the first line break QUOTE adds is the marker's.
    editor.registerNodeTransform(QuoteNode, (quote) => {
      const first = quote.getFirstChild();
      if ($getState(quote, calloutState) && $isLineBreakNode(first)) first.remove();
    }),
    // Lexical makes a task list's items checkboxes, so its <ul> is a group of them, not a list.
    editor.registerMutationListener(ListNode, (mutations) => {
      editor.getEditorState().read(() => {
        for (const [key, mutation] of mutations) {
          if (mutation === "destroyed") continue;
          const element = editor.getElementByKey(key);
          const node = $getNodeByKey(key);
          if (!element || !$isListNode(node)) continue;
          if (node.getListType() === "check") element.setAttribute("role", "group");
          else element.removeAttribute("role");
        }
      });
    }),
    // The quote's own element doesn't show its state; mark it so the theme can style each kind.
    editor.registerMutationListener(QuoteNode, (mutations) => {
      editor.getEditorState().read(() => {
        for (const [key, mutation] of mutations) {
          if (mutation === "destroyed") continue;
          const element = editor.getElementByKey(key);
          const node = $getNodeByKey(key);
          if (!element || !$isQuoteNode(node)) continue;
          const kind = $getState(node, calloutState);
          if (kind) element.dataset.callout = kind;
          else delete element.dataset.callout;
        }
      });
    }),
  );
}

/** Classes shared by the editor and RichTextContent, so text reads the same while written and after. */
export const richTextClasses = {
  paragraph: "my-2 first:mt-0 last:mb-0",
  h1: "mt-4 mb-2 text-lg font-semibold first:mt-0",
  h2: "mt-4 mb-2 text-base font-semibold first:mt-0",
  h3: "mt-3 mb-1 text-sm font-semibold first:mt-0",
  // A quote's shape; plain quotes add `quoteColor`, callouts their kind's colors.
  quoteShape: "my-2 border-l-2 pl-3 first:mt-0 last:mb-0",
  quoteColor: "border-ash-300 text-ash-700 more-contrast:border-ash-500 dark:border-ash-700 dark:text-ash-400",
  ul: "my-2 list-disc pl-6 first:mt-0 last:mb-0",
  ol: "my-2 list-decimal pl-6 first:mt-0 last:mb-0",
  listitem: "my-0.5",
  nestedListitem: "list-none",
  // Lexical puts the bullet list's class on a task list too; `!` keeps the task list flush.
  checklist: "my-2 list-none pl-0! first:mt-0 last:mb-0",
  link:
    "font-medium text-brand-700 underline decoration-brand-700/40 underline-offset-2 hover:decoration-brand-700 " +
    "dark:text-brand-300 dark:decoration-brand-300/40 dark:hover:decoration-brand-300",
  inlineCode:
    "rounded-sm bg-ash-100 px-1 py-0.5 font-mono text-[0.875em] text-ash-900 dark:bg-ash-800 dark:text-ash-100",
  bold: "font-semibold",
  italic: "italic",
  strikethrough: "line-through",
};

/**
 * Each callout's accent and title, for the reader and the editor alike. The title text clears 4.5:1
 * on the page and the 2 px rule 3:1: brand-700 / brand-300, celadon-700 / celadon-400, accent-700 /
 * accent-200, brick-700 / brick-400, ash-700 / ash-400.
 */
export const calloutStyles: Record<CalloutKind, { title: string; border: string; text: string }> = {
  note: { title: "Note", border: "border-ash-500 dark:border-ash-400", text: "text-ash-700 dark:text-ash-400" },
  tip: { title: "Tip", border: "border-celadon-700 dark:border-celadon-400", text: "text-celadon-700 dark:text-celadon-400" },
  important: { title: "Important", border: "border-brand-700 dark:border-brand-300", text: "text-brand-700 dark:text-brand-300" },
  warning: { title: "Warning", border: "border-accent-700 dark:border-accent-200", text: "text-accent-700 dark:text-accent-200" },
  caution: { title: "Caution", border: "border-brick-700 dark:border-brick-400", text: "text-brick-700 dark:text-brick-400" },
};

/*
 * In the editor a callout is a quote marked `data-callout`: its rule takes the kind's color and its
 * title is drawn before the text, so the title isn't editable text.
 */
const calloutEditorClasses =
  "not-data-callout:border-ash-300 not-data-callout:text-ash-700 more-contrast:not-data-callout:border-ash-500 " +
  "dark:not-data-callout:border-ash-700 dark:not-data-callout:text-ash-400 " +
  "data-callout:not-italic data-callout:text-ash-900 dark:data-callout:text-ash-100 " +
  "data-callout:before:mb-1 data-callout:before:block data-callout:before:text-sm data-callout:before:font-semibold " +
  "data-[callout=note]:border-ash-500 data-[callout=note]:before:content-['Note'] data-[callout=note]:before:text-ash-700 " +
  "dark:data-[callout=note]:border-ash-400 dark:data-[callout=note]:before:text-ash-400 " +
  "data-[callout=tip]:border-celadon-700 data-[callout=tip]:before:content-['Tip'] data-[callout=tip]:before:text-celadon-700 " +
  "dark:data-[callout=tip]:border-celadon-400 dark:data-[callout=tip]:before:text-celadon-400 " +
  "data-[callout=important]:border-brand-700 data-[callout=important]:before:content-['Important'] " +
  "data-[callout=important]:before:text-brand-700 dark:data-[callout=important]:border-brand-300 " +
  "dark:data-[callout=important]:before:text-brand-300 " +
  "data-[callout=warning]:border-accent-700 data-[callout=warning]:before:content-['Warning'] " +
  "data-[callout=warning]:before:text-accent-700 dark:data-[callout=warning]:border-accent-200 " +
  "dark:data-[callout=warning]:before:text-accent-200 " +
  "data-[callout=caution]:border-brick-700 data-[callout=caution]:before:content-['Caution'] " +
  "data-[callout=caution]:before:text-brick-700 dark:data-[callout=caution]:border-brick-400 " +
  "dark:data-[callout=caution]:before:text-brick-400";

/*
 * A task list item draws its box before the text; Lexical toggles the item on a click inside that
 * box (the ::before's width), and on Space. The box's edge clears 3:1 (ash-500); checked fills
 * brand-700, or brand-600 in dark, as Checkbox does.
 */
const checkItem =
  "relative my-0.5 list-none pl-6 outline-none " +
  "before:absolute before:top-0.5 before:left-0 before:size-4 before:rounded-sm before:border " +
  "focus-visible:before:outline-2 focus-visible:before:outline-offset-2 " +
  "focus-visible:before:outline-brand-700 dark:focus-visible:before:outline-brand-300";

const checkItemUnchecked = "before:border-ash-500 before:bg-white dark:before:bg-ash-900";

const checkItemChecked =
  "before:border-brand-700 before:bg-brand-700 dark:before:border-brand-600 dark:before:bg-brand-600 " +
  "after:absolute after:top-1 after:left-1.5 after:h-2.5 after:w-1 after:rotate-45 after:border-r-2 after:border-b-2 " +
  "after:border-white";

/**
 * The editor's theme. A code block is ash-950 in both themes; the `!` beats the background and
 * color that Shiki's highlighter writes on the block.
 */
export const richTextTheme: EditorThemeClasses = {
  paragraph: richTextClasses.paragraph,
  heading: { h1: richTextClasses.h1, h2: richTextClasses.h2, h3: richTextClasses.h3 },
  quote: `${richTextClasses.quoteShape} ${calloutEditorClasses}`,
  list: {
    ul: richTextClasses.ul,
    ol: richTextClasses.ol,
    checklist: richTextClasses.checklist,
    listitem: richTextClasses.listitem,
    listitemChecked: `${checkItem} ${checkItemChecked}`,
    listitemUnchecked: `${checkItem} ${checkItemUnchecked}`,
    nested: { listitem: richTextClasses.nestedListitem },
  },
  link: richTextClasses.link,
  code:
    "my-2 block overflow-x-auto rounded-lg bg-ash-950! px-3 py-2.5 font-mono text-xs leading-5 whitespace-pre " +
    "text-ash-100! first:mt-0 last:mb-0",
  text: {
    bold: richTextClasses.bold,
    italic: richTextClasses.italic,
    strikethrough: richTextClasses.strikethrough,
    code: richTextClasses.inlineCode,
  },
};
