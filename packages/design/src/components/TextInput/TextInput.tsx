/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Input } from "@headlessui/react";
import classNames from "../../utils/classNames";
import { fieldControl } from "../../utils/fieldStyles";
import { FormField } from "../FormField/FormField";
import type { TextInputProps } from "./TextInput.types";

export function TextInput({
  label,
  description,
  error,
  leadingIcon,
  required,
  disabled,
  type = "text",
  className,
  ref,
  ...props
}: TextInputProps) {
  const input = (
    <Input
      ref={ref}
      type={type}
      required={required}
      invalid={Boolean(error)}
      className={classNames(fieldControl, leadingIcon ? "pl-8" : undefined)}
      {...props}
    />
  );
  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
    >
      {leadingIcon ? (
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-ash-600 dark:text-ash-400 [&>svg]:size-4"
          >
            {leadingIcon}
          </span>
          {input}
        </div>
      ) : (
        input
      )}
    </FormField>
  );
}
