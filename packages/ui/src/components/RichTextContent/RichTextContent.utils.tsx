/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { $isCodeNode } from "@lexical/code";
import { $isLinkNode } from "@lexical/link";
import { $isListItemNode, $isListNode } from "@lexical/list";
import { $convertFromMarkdownString } from "@lexical/markdown";
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text";
import { CheckCircleIcon, CheckIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@bulmerkiln/design/icons";
import { $getRoot, $getState, $isElementNode, $isLineBreakNode, $isTextNode, createEditor, type LexicalNode } from "lexical";
import type { ReactNode } from "react";
import {
  type CalloutKind,
  calloutState,
  calloutStyles,
  isSafeLinkUrl,
  linkAttributes,
  markdownTransformers,
  registerRichTextRules,
  richTextClasses,
  richTextNodes,
} from "../../utils/richText";
import { CodeBlock } from "../CodeBlock/CodeBlock";

const calloutIcons: Record<CalloutKind, ReactNode> = {
  note: <InformationCircleIcon className="size-4" />,
  tip: <CheckCircleIcon className="size-4" />,
  important: <InformationCircleIcon className="size-4" />,
  warning: <ExclamationTriangleIcon className="size-4" />,
  caution: <XCircleIcon className="size-4" />,
};

/**
 * Parses Markdown with the editor's own nodes and rules, so content reads back as it was written.
 * `idPrefix` keeps the ids that name task items and callouts unique on the page.
 */
export function renderMarkdown(markdown: string, idPrefix: string): ReactNode {
  const editor = createEditor({
    namespace: "RichTextContent",
    nodes: richTextNodes,
    onError: (error) => {
      throw error;
    },
  });
  registerRichTextRules(editor);
  editor.update(() => $convertFromMarkdownString(markdown, markdownTransformers), { discrete: true });
  return editor.getEditorState().read(() => $getRoot().getChildren().map((node) => $render(node, idPrefix)));
}

function $children(node: LexicalNode, idPrefix: string): ReactNode {
  return $isElementNode(node) ? node.getChildren().map((child) => $render(child, idPrefix)) : null;
}

/** Each node as an element: text as React children, never HTML. */
function $render(node: LexicalNode, idPrefix: string): ReactNode {
  const key = node.getKey();
  const id = `${idPrefix}-${key}`;
  if ($isTextNode(node)) {
    let text: ReactNode = node.getTextContent();
    if (node.hasFormat("code")) text = <code className={richTextClasses.inlineCode}>{text}</code>;
    if (node.hasFormat("strikethrough")) text = <s className={richTextClasses.strikethrough}>{text}</s>;
    if (node.hasFormat("italic")) text = <em className={richTextClasses.italic}>{text}</em>;
    if (node.hasFormat("bold")) text = <strong className={richTextClasses.bold}>{text}</strong>;
    return <span key={key}>{text}</span>;
  }
  if ($isLineBreakNode(node)) return <br key={key} />;
  if ($isLinkNode(node)) {
    // An unsafe link keeps its text and loses its target.
    if (!isSafeLinkUrl(node.getURL())) return <span key={key}>{$children(node, idPrefix)}</span>;
    return (
      <a key={key} href={node.getURL()} {...linkAttributes} className={richTextClasses.link}>
        {$children(node, idPrefix)}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if ($isCodeNode(node)) {
    return (
      <CodeBlock
        key={key}
        code={node.getTextContent()}
        language={node.getLanguage() ?? undefined}
        title={node.getLanguage() ?? undefined}
        className="my-2 first:mt-0 last:mb-0"
      />
    );
  }
  if ($isHeadingNode(node)) {
    const Heading = node.getTag() === "h1" ? "h3" : node.getTag() === "h2" ? "h4" : "h5";
    const level = node.getTag() as "h1" | "h2" | "h3";
    return (
      <Heading key={key} className={richTextClasses[level]}>
        {$children(node, idPrefix)}
      </Heading>
    );
  }
  if ($isQuoteNode(node)) {
    const kind = $getState(node, calloutState);
    if (kind) {
      const style = calloutStyles[kind];
      return (
        <div key={key} role="note" aria-labelledby={id} className={`${richTextClasses.quoteShape} ${style.border}`}>
          <p id={id} className={`mb-1 flex items-center gap-1.5 text-sm font-semibold ${style.text}`}>
            {calloutIcons[kind]}
            {style.title}
          </p>
          <div className="text-ash-900 dark:text-ash-100">{$children(node, idPrefix)}</div>
        </div>
      );
    }
    return (
      <blockquote key={key} className={`${richTextClasses.quoteShape} ${richTextClasses.quoteColor}`}>
        {$children(node, idPrefix)}
      </blockquote>
    );
  }
  if ($isListNode(node)) {
    const List = node.getListType() === "number" ? "ol" : "ul";
    const className = node.getListType() === "check" ? richTextClasses.checklist : richTextClasses[List];
    return (
      <List key={key} start={List === "ol" && node.getStart() !== 1 ? node.getStart() : undefined} className={className}>
        {$children(node, idPrefix)}
      </List>
    );
  }
  if ($isListItemNode(node)) {
    const nested = node.getChildren().some((child) => $isListNode(child));
    const parent = node.getParent();
    if (!nested && $isListNode(parent) && parent.getListType() === "check") {
      // Not a control: here it can't be changed, so the box is drawn and its state said in words.
      const checked = node.getChecked() ?? false;
      return (
        <li key={key} className="my-0.5 flex items-start gap-2">
          <span
            aria-hidden="true"
            className={
              checked
                ? "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm bg-brand-700 text-white dark:bg-brand-600"
                : "mt-0.5 size-4 shrink-0 rounded-sm border border-ash-500 bg-white dark:bg-ash-900"
            }
          >
            {checked && <CheckIcon className="size-3.5" />}
          </span>
          <span>
            <span className="sr-only">{checked ? "Done: " : "To do: "}</span>
            {$children(node, idPrefix)}
          </span>
        </li>
      );
    }
    return (
      <li key={key} className={nested ? richTextClasses.nestedListitem : richTextClasses.listitem}>
        {$children(node, idPrefix)}
      </li>
    );
  }
  return (
    <p key={key} className={richTextClasses.paragraph}>
      {$children(node, idPrefix)}
    </p>
  );
}
