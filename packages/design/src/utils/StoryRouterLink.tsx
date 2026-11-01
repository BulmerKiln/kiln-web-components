/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentPropsWithRef } from "react";

/**
 * Stories only: a stand-in for a framework's router link (Next.js's `Link`
 * takes `href` and a `ref` and renders an <a>). It marks itself so a story can
 * check the component rendered it, with the library's styles.
 */
export function StoryRouterLink({ href, ...props }: ComponentPropsWithRef<"a"> & { href: string }) {
  return <a href={href} data-router-link="" {...props} />;
}
