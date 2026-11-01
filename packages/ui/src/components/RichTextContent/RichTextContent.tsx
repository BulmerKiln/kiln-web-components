/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { classNames } from "@bulmerkiln/design";
import { useId, useMemo } from "react";
import type { RichTextContentProps } from "./RichTextContent.types";
import { renderMarkdown } from "./RichTextContent.utils";

/**
 * Shows Markdown written with `RichTextEditor`: elements built from the parsed text, never HTML, so
 * markup in the text shows as text. Links open in a new tab and only http, https and mailto links
 * are kept; fenced code is a `CodeBlock`. Headings start at `h3`, below the page's and a card's.
 */
export function RichTextContent({ value, className }: RichTextContentProps) {
  const idPrefix = useId();
  const content = useMemo(() => renderMarkdown(value, idPrefix), [value, idPrefix]);
  return <div className={classNames("text-sm text-ash-900 dark:text-ash-100", className)}>{content}</div>;
}
