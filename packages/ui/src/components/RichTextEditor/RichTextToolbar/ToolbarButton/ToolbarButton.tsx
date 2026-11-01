/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { classNames, Kbd, Tooltip } from "@bulmerkiln/design";
import { useIsApple } from "../../RichTextEditor.utils";
import type { ToolbarButtonProps } from "./ToolbarButton.types";

/** An icon button in the editor's toolbar; a pressed toggle shows its state beyond color. */
export function ToolbarButton({ label, shortcut, pressed, disabled = false, onClick, children }: ToolbarButtonProps) {
  const apple = useIsApple();
  const keyshortcuts = shortcut
    ?.map((key) => (key === "mod" ? (apple ? "Meta" : "Control") : key === "shift" ? "Shift" : key))
    .join("+");
  return (
    <Tooltip
      content={
        <span className="flex items-center gap-2">
          {label}
          {shortcut && <Kbd keys={shortcut} />}
        </span>
      }
    >
      <button
        type="button"
        aria-label={label}
        aria-keyshortcuts={keyshortcuts}
        aria-pressed={pressed}
        disabled={disabled}
        // Keeps the editor's selection, so the command applies to it.
        onMouseDown={(event) => event.preventDefault()}
        onClick={onClick}
        className={classNames(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-ash-700 transition-colors",
          "reduce-motion:transition-none pointer-coarse:size-10 [&>svg]:size-4",
          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-700",
          "enabled:hover:bg-ash-100 enabled:hover:text-ash-900 disabled:opacity-50",
          "aria-pressed:bg-brand-50 aria-pressed:text-brand-700 aria-pressed:ring-1 aria-pressed:ring-brand-700 aria-pressed:ring-inset",
          "dark:text-ash-400 dark:enabled:hover:bg-ash-800 dark:enabled:hover:text-ash-100 dark:focus-visible:outline-brand-300",
          "dark:aria-pressed:bg-brand-950 dark:aria-pressed:text-brand-300 dark:aria-pressed:ring-brand-300",
        )}
      >
        {children}
      </button>
    </Tooltip>
  );
}
