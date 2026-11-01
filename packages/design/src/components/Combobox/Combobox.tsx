/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
} from "@headlessui/react";
import { useState } from "react";
import { CheckIcon } from "../../icons/CheckIcon";
import { ChevronUpDownIcon } from "../../icons/ChevronUpDownIcon";
import classNames from "../../utils/classNames";
import { fieldControl } from "../../utils/fieldStyles";
import {
  popoverAnchor,
  popoverItem,
  popoverPanel,
} from "../../utils/popoverStyles";
import { FormField } from "../FormField/FormField";
import type { ComboboxProps } from "./Combobox.types";

/** One value from a long list, filtered by what's typed (case-insensitive, anywhere in the label). */
export function Combobox<T>({
  label,
  description,
  error,
  options,
  value,
  onChange,
  placeholder,
  emptyMessage = "No matches",
  required,
  disabled,
  name,
  className,
}: ComboboxProps<T>) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const matches = needle
    ? options.filter((option) => option.label.toLowerCase().includes(needle))
    : options;
  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
    >
      <HeadlessCombobox
        value={value}
        onChange={onChange}
        onClose={() => setQuery("")}
        invalid={Boolean(error)}
        disabled={disabled}
        name={name}
        immediate
      >
        <div className="relative">
          <ComboboxInput
            required={required}
            placeholder={placeholder}
            displayValue={(current: T | null) =>
              options.find((option) => option.value === current)?.label ?? ""
            }
            onChange={(event) => setQuery(event.target.value)}
            className={classNames(fieldControl, "pr-8")}
          />
          <ComboboxButton
            aria-label="Show options"
            className="absolute inset-y-0 right-0 flex items-center px-2 text-ash-600 dark:text-ash-400"
          >
            <ChevronUpDownIcon className="size-4" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          anchor={{ to: "bottom start", ...popoverAnchor }}
          transition
          className={classNames(popoverPanel, "w-(--input-width)")}
        >
          {matches.length === 0 ? (
            // An option, disabled, so the listbox always holds options (ARIA) and the message is read.
            <ComboboxOption
              value={null}
              disabled
              className="px-2 py-1.5 text-sm text-ash-700 dark:text-ash-400"
            >
              {emptyMessage}
            </ComboboxOption>
          ) : (
            matches.map((option) => (
              <ComboboxOption
                key={option.label}
                value={option.value}
                disabled={option.disabled}
                className={popoverItem}
              >
                <CheckIcon className="invisible size-4 text-brand-700 group-data-selected:visible dark:text-brand-300" />
                <span className="truncate">{option.label}</span>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </HeadlessCombobox>
    </FormField>
  );
}
