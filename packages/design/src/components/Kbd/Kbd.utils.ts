/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useSyncExternalStore } from "react";

interface KeyFace {
  /** What's shown. */
  label: string;
  /** What a screen reader says, when the label is a symbol. */
  spoken?: string;
}

/** Each named key as shown and spoken, on Apple platforms and elsewhere. */
export function keyFace(key: string, apple: boolean): KeyFace {
  switch (key.toLowerCase()) {
    case "mod":
      return apple ? { label: "⌘", spoken: "Command" } : { label: "Ctrl", spoken: "Control" };
    case "shift":
      return { label: "⇧", spoken: "Shift" };
    case "alt":
      return apple ? { label: "⌥", spoken: "Option" } : { label: "Alt" };
    case "enter":
      return { label: "↵", spoken: "Enter" };
    case "escape":
      return { label: "Esc", spoken: "Escape" };
    case "up":
      return { label: "↑", spoken: "Up arrow" };
    case "down":
      return { label: "↓", spoken: "Down arrow" };
    case "left":
      return { label: "←", spoken: "Left arrow" };
    case "right":
      return { label: "→", spoken: "Right arrow" };
    default:
      return { label: key.length === 1 ? key.toUpperCase() : key };
  }
}

const noop = () => () => {};
const detect = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** Whether this is an Apple platform; false on the server, so the first render matches. */
export function useIsApple(): boolean {
  return useSyncExternalStore(noop, detect, () => false);
}
