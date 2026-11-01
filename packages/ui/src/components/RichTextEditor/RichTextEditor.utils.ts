/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useSyncExternalStore } from "react";

const noop = () => () => {};
const detect = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** ⌘ on Apple platforms, Ctrl elsewhere: for `aria-keyshortcuts` and shortcut hints. */
export function useIsApple(): boolean {
  return useSyncExternalStore(noop, detect, () => false);
}

/** Moves focus among a toolbar's enabled buttons with the arrows, Home and End (one tab stop). */
export function moveToolbarFocus(toolbar: HTMLElement, key: string): boolean {
  const controls = [...toolbar.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")];
  const index = controls.indexOf(document.activeElement as HTMLButtonElement);
  const next =
    key === "ArrowRight" ? (index + 1) % controls.length
    : key === "ArrowLeft" ? (index - 1 + controls.length) % controls.length
    : key === "Home" ? 0
    : key === "End" ? controls.length - 1
    : -1;
  if (next < 0 || controls.length === 0) return false;
  controls[next].focus();
  return true;
}

/** Leaves exactly one enabled button in the tab order: the focused one, else the last, else the first. */
export function syncToolbarTabStop(toolbar: HTMLElement): void {
  const controls = [...toolbar.querySelectorAll<HTMLButtonElement>("button")];
  const enabled = controls.filter((control) => !control.disabled);
  const stop =
    enabled.find((control) => control === document.activeElement) ??
    enabled.find((control) => control.tabIndex === 0) ??
    enabled[0];
  for (const control of controls) control.tabIndex = control === stop ? 0 : -1;
}
