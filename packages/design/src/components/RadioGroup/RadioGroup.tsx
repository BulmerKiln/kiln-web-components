/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Description,
  Field,
  RadioGroup as HeadlessRadioGroup,
  Label,
  Radio,
} from "@headlessui/react";
import { XCircleIcon } from "../../icons/XCircleIcon";
import classNames from "../../utils/classNames";
import {
  choiceControl,
  fieldDescription,
  fieldError,
  fieldLabel,
} from "../../utils/fieldStyles";
import type { RadioGroupProps } from "./RadioGroup.types";

/**
 * Arrow keys move between options; Tab enters and leaves the group. The
 * group's label, help and error are Headless UI's, so they name and describe
 * the radiogroup itself.
 */
export function RadioGroup<T>({
  label,
  description,
  error,
  options,
  className,
  ...props
}: RadioGroupProps<T>) {
  return (
    <HeadlessRadioGroup
      {...props}
      aria-invalid={error ? true : undefined}
      className={classNames("flex flex-col gap-2", className)}
    >
      <Label as="p" className={fieldLabel}>
        {label}
      </Label>
      {description && (
        <Description className={fieldDescription}>{description}</Description>
      )}
      <div className="flex flex-col gap-2.5">
        {options.map((option, index) => (
          <Field
            key={index}
            disabled={option.disabled}
            className="flex min-h-6 items-start gap-2.5"
          >
            <Radio
              value={option.value}
              className={classNames(choiceControl, "mt-0.5 rounded-full")}
            >
              <span className="invisible size-1.5 rounded-full bg-white group-data-checked:visible pointer-coarse:size-2" />
            </Radio>
            <div className="flex flex-col gap-0.5">
              <Label className={fieldLabel}>{option.label}</Label>
              {option.description && (
                <Description className={fieldDescription}>
                  {option.description}
                </Description>
              )}
            </div>
          </Field>
        ))}
      </div>
      {error && (
        <Description role="alert" className={fieldError}>
          <XCircleIcon className="mt-0.5 size-4" />
          <span>{error}</span>
        </Description>
      )}
    </HeadlessRadioGroup>
  );
}
