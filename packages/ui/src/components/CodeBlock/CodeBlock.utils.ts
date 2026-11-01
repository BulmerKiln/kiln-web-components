/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createHighlighterCore, type HighlighterCore, type ThemedToken } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { bundledLanguagesInfo } from "shiki/langs";
import { bundledThemes } from "shiki/themes";
import { codeTheme } from "../../utils/codeTheme";

let highlighter: Promise<HighlighterCore> | undefined;

/** Created on first use; grammars load one at a time, as code in them is shown. */
function getHighlighter(): Promise<HighlighterCore> {
  highlighter ??= createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    themes: [bundledThemes[codeTheme]],
    langs: [],
  });
  return highlighter;
}

/** Splits code into colored tokens by line, or null when the language isn't one Shiki knows. */
export async function tokenize(code: string, language: string): Promise<ThemedToken[][] | null> {
  const id = language.toLowerCase();
  const info = bundledLanguagesInfo.find((lang) => lang.id === id || lang.aliases?.includes(id));
  if (!info) return null;
  const shiki = await getHighlighter();
  if (!shiki.getLoadedLanguages().includes(info.id)) await shiki.loadLanguage(info.import());
  return shiki.codeToTokens(code, { lang: info.id, theme: codeTheme }).tokens;
}
