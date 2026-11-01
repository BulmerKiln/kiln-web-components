/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Kbd } from "@bulmerkiln/design";
import { MagnifyingGlassIcon } from "@bulmerkiln/design/icons";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useId, useState } from "react";
import type { CommandPaletteItem, CommandPaletteProps } from "./CommandPalette.types";
import { filterItems, groupItems } from "./CommandPalette.utils";

const option =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-ash-900 select-none pointer-coarse:py-3 " +
  "data-focus:bg-ash-100 dark:text-ash-100 dark:data-focus:bg-ash-800";

/**
 * Search and jump: ⌘K / Ctrl+K opens it, typing filters the items, the arrows move, Enter
 * chooses and Escape closes. The app supplies the items and acts on the choice.
 */
export function CommandPalette({
  open,
  onOpenChange,
  items,
  onSelect,
  label = "Search",
  placeholder = "Search repositories, pages and actions",
  emptyMessage = "Nothing matches. Try fewer or different words.",
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const groupId = useId();
  // ⌘K / Ctrl+K: a modified key, so it can't fire while someone types (WCAG 2.1.4).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange]);
  const close = () => {
    onOpenChange(false);
    setQuery("");
  };
  const choose = (item: CommandPaletteItem | null) => {
    if (!item) return;
    close();
    onSelect(item);
  };
  const matches = filterItems(items, query);
  const groups = groupItems(matches);
  return (
    <Dialog open={open} onClose={close} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-ash-950/40 transition-opacity duration-150 data-closed:opacity-0 reduce-motion:transition-none dark:bg-black/60"
      />
      <div className="fixed inset-0 flex w-screen items-start justify-center overflow-y-auto p-4 sm:pt-[15vh]">
        <DialogPanel
          transition
          className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-ash-200 transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0 reduce-motion:transition-none dark:bg-ash-900 dark:shadow-black/50 dark:ring-ash-800"
        >
          <DialogTitle className="sr-only">{label}</DialogTitle>
          <Combobox<CommandPaletteItem | null> onChange={choose} value={null}>
            <div className="relative border-b border-ash-200 dark:border-ash-800">
              <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ash-600 dark:text-ash-400" />
              <ComboboxInput
                autoFocus
                aria-label={label}
                placeholder={placeholder}
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                // The combobox keeps Escape for its list, which is always shown here: Escape closes the palette.
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    close();
                  }
                }}
                className="h-12 w-full border-0 bg-transparent pr-4 pl-11 text-base text-ash-900 placeholder:text-ash-600 focus:ring-0 focus:outline-none sm:text-sm dark:text-ash-100 dark:placeholder:text-ash-500"
              />
            </div>
            {/* Not modal: a modal list would hide the status line and the dialog's title from screen readers. */}
            {groups.length > 0 ? (
              <ComboboxOptions static modal={false} className="max-h-80 scroll-py-2 overflow-y-auto p-2">
                {groups.map(([group, list], index) => (
                  <div
                    key={group ?? ""}
                    role="group"
                    aria-labelledby={group ? `${groupId}-${index}` : undefined}
                    className="not-first:mt-2"
                  >
                    {group && (
                      <div
                        id={`${groupId}-${index}`}
                        className="px-3 pt-1 pb-1.5 text-xs font-semibold text-ash-700 dark:text-ash-400"
                      >
                        {group}
                      </div>
                    )}
                    {list.map((item) => (
                      <ComboboxOption key={item.id} value={item} className={option}>
                        {item.icon && (
                          <span className="flex shrink-0 text-ash-700 dark:text-ash-400 [&>svg]:size-5">{item.icon}</span>
                        )}
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate font-medium">{item.label}</span>
                          {item.description && (
                            <span className="truncate text-xs text-ash-700 dark:text-ash-400">{item.description}</span>
                          )}
                        </span>
                      </ComboboxOption>
                    ))}
                  </div>
                ))}
              </ComboboxOptions>
            ) : null}
            {/* Always present, so each change is announced: the count, or that nothing matches. */}
            <p
              role="status"
              className={
                matches.length > 0 ? "sr-only" : "px-4 py-8 text-center text-sm text-ash-700 dark:text-ash-400"
              }
            >
              {matches.length > 0 ? `${matches.length} ${matches.length === 1 ? "result" : "results"}` : emptyMessage}
            </p>
          </Combobox>
          <div className="hidden items-center gap-4 border-t border-ash-200 px-4 py-2 text-xs text-ash-700 sm:flex dark:border-ash-800 dark:text-ash-400">
            <span className="flex items-center gap-1.5">
              <Kbd keys={["up"]} />
              <Kbd keys={["down"]} /> to move
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd keys={["enter"]} /> to open
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd keys={["escape"]} /> to close
            </span>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
