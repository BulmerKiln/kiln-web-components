/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLayoutEffect, type ReactNode } from "react";
import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";

document.documentElement.lang = "en-US";

/*
 * Each toolbar setting maps to the <html> attribute theme.css reads. "default"
 * leaves the attribute off, so the operating system's preference applies.
 */
const attributes = {
  theme: "data-theme",
  contrast: "data-contrast",
  textSize: "data-text-size",
  textSpacing: "data-text-spacing",
  motion: "data-motion",
} as const;

function HtmlAttributes({
  globals,
  skip = [],
  children,
}: {
  globals: Record<string, string | undefined>;
  skip?: string[];
  children: ReactNode;
}) {
  const values = Object.entries(attributes)
    .filter(([global]) => !skip.includes(global))
    .map(([global, name]) => [name, globals[global]] as const);
  const key = JSON.stringify(values);
  useLayoutEffect(() => {
    const html = document.documentElement;
    const applied = values.filter(([, v]) => v && v !== "default");
    for (const [name, value] of applied) html.setAttribute(name, value!);
    return () => {
      for (const [name] of applied) html.removeAttribute(name);
    };
    // `key` stands in for `values`, which is rebuilt every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return <>{children}</>;
}

const toolbar = (
  title: string,
  icon: "mirror" | "contrast" | "paragraph" | "ruler" | "play",
  items: [string, string][],
) => ({
  description: title,
  toolbar: {
    title,
    icon,
    items: items.map(([value, t]) => ({ value, title: t })),
    dynamicTitle: true,
  },
});

const preview: Preview = {
  globalTypes: {
    theme: toolbar("Theme", "mirror", [
      ["default", "System theme"],
      ["light", "Light theme"],
      ["dark", "Dark theme"],
    ]),
    contrast: toolbar("Contrast", "contrast", [
      ["default", "Default contrast"],
      ["more", "Increased contrast"],
    ]),
    textSize: toolbar("Text size", "paragraph", [
      ["default", "Default text"],
      ["large", "Large text"],
      ["larger", "Larger text"],
    ]),
    textSpacing: toolbar("Text spacing", "ruler", [
      ["default", "Default spacing"],
      ["wide", "Wider spacing"],
    ]),
    motion: toolbar("Motion", "play", [
      ["default", "Default motion"],
      ["reduce", "Reduced motion"],
    ]),
  },
  initialGlobals: {
    theme: "default",
    contrast: "default",
    textSize: "default",
    textSpacing: "default",
    motion: "default",
  },
  decorators: [
    (Story, { globals, viewMode }) => {
      // A story's own view themes the whole canvas through <html>. A docs page
      // shows many stories at once, so there each one gets a themed wrapper.
      if (viewMode !== "docs") {
        return (
          <HtmlAttributes globals={globals}>
            <Story />
          </HtmlAttributes>
        );
      }
      const theme = globals.theme === "default" ? undefined : globals.theme;
      return (
        <HtmlAttributes globals={globals} skip={["theme"]}>
          <div data-theme={theme} className="kiln-story-theme">
            <Story />
          </div>
        </HtmlAttributes>
      );
    },
  ],
  parameters: {
    // The sidebar's categories, in order. Each story's `title` is "<Category>/<Name>";
    // eslint.config.js refuses any other category.
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Colors", "Typography", "Icons"],
          "Brand",
          "Layout",
          "Navigation",
          "Controls",
          "Feedback",
          "Overlays",
          "Data display",
        ],
      },
    },
    // The theme toolbar colors the canvas; Storybook's own backgrounds would fight it.
    backgrounds: { disable: true },
    docs: {
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? themes.dark
        : themes.light,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // A violation fails the story's test.
      test: "error",
      // Headless UI's focus guards (around a non-modal Popover) are aria-hidden
      // buttons by design: they catch Tab, pass focus on and never keep it.
      // Only they are excluded; everything else in the page is checked.
      context: { include: ["body"], exclude: ["[data-headlessui-focus-guard]"] },
      config: {
        rules: [{ id: "scrollable-region-focusable", enabled: true }],
      },
      options: {
        runOnly: [
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22a",
          "wcag22aa",
        ],
      },
    },
  },
};

export default preview;
