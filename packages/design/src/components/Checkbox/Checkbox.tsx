/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Description,
  Field,
  Checkbox as HeadlessCheckbox,
  Label,
} from "@headlessui/react";
import { CheckIcon } from "../../icons/CheckIcon";
import { MinusIcon } from "../../icons/MinusIcon";
import classNames from "../../utils/classNames";
import {
  choiceControl,
  fieldDescription,
  fieldLabel,
} from "../../utils/fieldStyles";
import type { CheckboxProps } from "./Checkbox.types";

/** The label is part of the target, so the row clears WCAG 2.5.8's 24 px. */
export function Checkbox({
  label,
  description,
  disabled,
  className,
  ...props
}: CheckboxProps) {
  return (
    <Field
      disabled={disabled}
      className={classNames("flex min-h-6 items-start gap-2.5", className)}
    >
      <HeadlessCheckbox
        {...props}
        className={classNames(choiceControl, "mt-0.5 rounded")}
      >
        <CheckIcon className="hidden size-3.5 text-white group-data-checked:block group-data-indeterminate:hidden" />
        <MinusIcon className="hidden size-3.5 text-white group-data-indeterminate:block" />
      </HeadlessCheckbox>
      <div className="flex flex-col gap-0.5">
        <Label className={fieldLabel}>{label}</Label>
        {description && (
          <Description className={fieldDescription}>{description}</Description>
        )}
      </div>
    </Field>
  );
}
