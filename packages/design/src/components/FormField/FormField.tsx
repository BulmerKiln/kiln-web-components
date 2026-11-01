/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Description, Field, Label } from "@headlessui/react";
import { XCircleIcon } from "../../icons/XCircleIcon";
import classNames from "../../utils/classNames";
import {
  fieldDescription,
  fieldError,
  fieldLabel,
} from "../../utils/fieldStyles";
import type { FormFieldProps } from "./FormField.types";

/**
 * A label, help text and error around one control. Headless UI's Field links
 * them: the label names the control, help and error describe it.
 */
export function FormField({
  label,
  description,
  error,
  required,
  disabled,
  children,
  className,
}: FormFieldProps) {
  return (
    <Field
      disabled={disabled}
      className={classNames("flex flex-col gap-1.5", className)}
    >
      <Label className={fieldLabel}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-brick-700 dark:text-brick-400">
            {" "}
            *
          </span>
        )}
      </Label>
      {description && (
        <Description className={fieldDescription}>{description}</Description>
      )}
      {children}
      {error && (
        <Description role="alert" className={fieldError}>
          <XCircleIcon className="mt-0.5 size-4" />
          <span>{error}</span>
        </Description>
      )}
    </Field>
  );
}
