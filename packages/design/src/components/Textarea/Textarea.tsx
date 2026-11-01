/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Textarea as HeadlessTextarea } from "@headlessui/react";
import classNames from "../../utils/classNames";
import { fieldControl } from "../../utils/fieldStyles";
import { FormField } from "../FormField/FormField";
import type { TextareaProps } from "./Textarea.types";

export function Textarea({
  label,
  description,
  error,
  required,
  disabled,
  rows = 3,
  className,
  ref,
  ...props
}: TextareaProps) {
  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
    >
      <HeadlessTextarea
        ref={ref}
        rows={rows}
        required={required}
        invalid={Boolean(error)}
        className={classNames(fieldControl, "resize-y py-1.5")}
        {...props}
      />
    </FormField>
  );
}
