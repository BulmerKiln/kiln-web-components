/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Fragment } from "react";
import classNames from "../../utils/classNames";
import type { KbdProps } from "./Kbd.types";
import { keyFace, useIsApple } from "./Kbd.utils";

const key =
  "inline-flex min-w-5 items-center justify-center rounded border border-b-2 border-ash-300 bg-ash-50 px-1 " +
  "font-sans text-[0.75em] leading-5 font-medium text-ash-800 " +
  "dark:border-ash-700 dark:bg-ash-900 dark:text-ash-100";

/**
 * A key combination: an outer <kbd> holding one <kbd> per key, as HTML
 * specifies. Symbols are read by name. Pair it with `aria-keyshortcuts` on
 * the control the shortcut triggers.
 */
export function Kbd({ keys, className }: KbdProps) {
  const apple = useIsApple();
  return (
    <kbd className={classNames("inline-flex items-center gap-0.5 font-sans", className)}>
      {keys.map((name, index) => {
        const face = keyFace(name, apple);
        return (
          <Fragment key={`${index}-${name}`}>
            {index > 0 && <span className="sr-only"> plus </span>}
            <kbd className={key}>
              {face.spoken ? (
                <>
                  <span aria-hidden="true">{face.label}</span>
                  <span className="sr-only">{face.spoken}</span>
                </>
              ) : (
                face.label
              )}
            </kbd>
          </Fragment>
        );
      })}
    </kbd>
  );
}
