/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DisclosureButton,
  DisclosurePanel,
  Disclosure as HeadlessDisclosure,
} from "@headlessui/react";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import classNames from "../../utils/classNames";
import type { DisclosureProps } from "./Disclosure.types";

/** Content shown or hidden by a button whose `aria-expanded` says which. Enter and Space toggle it. */
export function Disclosure({
  title,
  children,
  defaultOpen = false,
  headingLevel,
  divided = false,
  className,
}: DisclosureProps) {
  const Heading = headingLevel ? (`h${headingLevel}` as const) : "div";
  return (
    <HeadlessDisclosure
      as="div"
      defaultOpen={defaultOpen}
      className={classNames(divided && "border-b border-ash-200 dark:border-ash-800", className)}
    >
      <Heading className="text-sm font-medium">
        <DisclosureButton
          className={classNames(
            "group flex w-full items-center justify-between gap-3 rounded-sm py-2.5 text-left text-ash-900 pointer-coarse:py-3.5",
            "hover:text-brand-700 focus:outline-none data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-brand-700",
            "dark:text-ash-100 dark:hover:text-brand-300 dark:data-focus:outline-brand-300",
          )}
        >
          {title}
          <ChevronDownIcon className="size-4 shrink-0 text-ash-600 transition-transform duration-150 group-data-open:rotate-180 reduce-motion:transition-none dark:text-ash-400" />
        </DisclosureButton>
      </Heading>
      <DisclosurePanel
        transition
        className="pb-3 text-sm text-ash-700 transition duration-150 ease-out data-closed:-translate-y-1 data-closed:opacity-0 dark:text-ash-400"
      >
        {children}
      </DisclosurePanel>
    </HeadlessDisclosure>
  );
}
