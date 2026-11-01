/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentPropsWithRef, ElementType } from "react";

/**
 * Props for a component that can render as another element or component:
 * its own props, `as`, and whatever `as` accepts (including `ref`), minus
 * the names the component already uses. Pass an app's router link
 * (`as={NextLink}`) and it renders with this library's styles.
 */
export type PolymorphicProps<
  E extends ElementType,
  Own extends object = object,
> = Own & { as?: E } & Omit<ComponentPropsWithRef<E>, keyof Own | "as">;
