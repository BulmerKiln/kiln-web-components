/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentPropsWithRef, MouseEvent } from "react";
import { navigate } from "./router";

/**
 * The app's link: what Next.js's Link or React Router's is to a real app. The
 * libraries render it through `as` and `linkAs`, with their own styles.
 */
export function RouterLink({ href, onClick, ...props }: ComponentPropsWithRef<"a"> & { href: string }) {
  const follow = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || modified || event.button !== 0 || props.target) return;
    event.preventDefault();
    navigate(href);
  };
  return <a href={href} onClick={follow} {...props} />;
}
