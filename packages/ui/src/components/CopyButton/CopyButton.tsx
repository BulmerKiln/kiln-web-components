/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { IconButton, Tooltip } from "@bulmerkiln/design";
import { CheckIcon, ClipboardIcon } from "@bulmerkiln/design/icons";
import { useEffect, useState } from "react";
import type { CopyButtonProps } from "./CopyButton.types";

type CopyState = "idle" | "copied" | "failed";

const resetAfter = 2000;

/**
 * Copies `value` to the clipboard. The icon turns to a check, the tooltip
 * says "Copied", and a polite status announces it; if the browser refuses,
 * the status says so and what to do instead.
 */
export function CopyButton({ value, label = "Copy", variant = "ghost", size = "sm", className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), resetAfter);
    return () => clearTimeout(timer);
  }, [state]);
  const copy = () => {
    navigator.clipboard.writeText(value).then(
      () => setState("copied"),
      () => setState("failed"),
    );
  };
  const tip = state === "copied" ? "Copied" : state === "failed" ? "Couldn't copy" : label;
  return (
    <>
      <Tooltip content={tip}>
        <IconButton label={label} variant={variant} size={size} onClick={copy} className={className}>
          {state === "copied" ? <CheckIcon /> : <ClipboardIcon />}
        </IconButton>
      </Tooltip>
      <span role="status" className="sr-only">
        {state === "copied" && "Copied"}
        {state === "failed" && "Couldn't copy. Select the text and copy it with your keyboard instead."}
      </span>
    </>
  );
}
