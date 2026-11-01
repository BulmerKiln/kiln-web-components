/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { classNames } from "@bulmerkiln/design";
import { type CSSProperties, useEffect, useId, useState } from "react";
import type { ThemedToken } from "shiki/core";
import { CopyButton } from "../CopyButton/CopyButton";
import type { CodeBlockProps } from "./CodeBlock.types";
import { tokenize } from "./CodeBlock.utils";

interface Highlight {
  code: string;
  language: string;
  tokens: ThemedToken[][];
}

/**
 * Read-only code on a dark surface, colored by language once its grammar loads. The code region
 * scrolls sideways rather than wrapping, and takes focus so it can be scrolled by keyboard.
 */
export function CodeBlock({
  code,
  language,
  title,
  lineNumbers = false,
  copyLabel = "Copy code",
  copyable = true,
  className,
}: CodeBlockProps) {
  const titleId = useId();
  const [highlight, setHighlight] = useState<Highlight>();
  useEffect(() => {
    if (!language) return;
    let current = true;
    tokenize(code, language).then(
      (tokens) => current && tokens && setHighlight({ code, language, tokens }),
      // A grammar that fails to load leaves the code uncolored, which is still correct.
      () => {},
    );
    return () => {
      current = false;
    };
  }, [code, language]);
  // Tokens for other code are stale: show the plain text until the new ones arrive.
  const lines =
    highlight?.code === code && highlight.language === language
      ? highlight.tokens
      : code.split("\n").map((line) => [{ content: line, offset: 0 } as ThemedToken]);
  return (
    // Dark in both themes: the theme's dark variant applies inside it, so the copy button follows.
    <div
      data-theme="dark"
      className={classNames(
        "overflow-hidden rounded-lg bg-ash-950 text-ash-100 ring-1 ring-ash-800",
        className,
      )}
    >
      {(title || copyable) && (
        <div className="flex min-h-9 items-center justify-between gap-2 border-b border-ash-800 py-1 pr-1 pl-3">
          <span id={titleId} className="truncate font-mono text-xs text-ash-400">
            {title}
          </span>
          {copyable && <CopyButton value={code} label={copyLabel} />}
        </div>
      )}
      <pre
        role="region"
        tabIndex={0}
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Code"}
        className="overflow-x-auto py-3 font-mono text-xs leading-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-300"
      >
        <code className="grid min-w-max">
          {lines.map((tokens, index) => (
            <span key={index} className="flex min-h-5 px-3">
              {lineNumbers && (
                <span aria-hidden="true" className="mr-4 w-6 shrink-0 text-right text-ash-500 select-none">
                  {index + 1}
                </span>
              )}
              <span>
                {tokens.map((token, i) =>
                  token.color ? (
                    <span key={i} style={{ "--token": token.color } as CSSProperties} className="text-(--token)">
                      {token.content}
                    </span>
                  ) : (
                    token.content
                  ),
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
