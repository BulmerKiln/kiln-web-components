/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
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
import type { SelectProps } from "./Select.types";

/** One value from a short list; Combobox for long lists or typing to filter. */
export function Select<T>({
  label,
  description,
  error,
  options,
  value,
  onChange,
  placeholder = "Choose…",
  required,
  disabled,
  name,
  className,
}: SelectProps<T>) {
  const selected = options.find((option) => option.value === value);
  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
    >
      <Listbox
        // Headless UI types the value as T, but takes null as "nothing chosen".
        value={value as T}
        onChange={onChange}
        invalid={Boolean(error)}
        disabled={disabled}
        name={name}
      >
        <ListboxButton
          aria-required={required || undefined}
          className={classNames(
            fieldControl,
            "flex items-center justify-between gap-2 text-left",
          )}
        >
          <span
            className={classNames(
              "truncate",
              !selected && "text-ash-600 dark:text-ash-500",
            )}
          >
            {selected?.label ?? placeholder}
          </span>
          <ChevronUpDownIcon className="size-4 text-ash-600 dark:text-ash-400" />
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: "bottom start", ...popoverAnchor }}
          transition
          className={classNames(popoverPanel, "w-(--button-width)")}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.label}
              value={option.value}
              disabled={option.disabled}
              className={popoverItem}
            >
              <CheckIcon className="invisible size-4 text-brand-700 group-data-selected:visible dark:text-brand-300" />
              <span className="truncate">{option.label}</span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </FormField>
  );
}
