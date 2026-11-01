/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Description,
  Field,
  Switch as HeadlessSwitch,
  Label,
} from "@headlessui/react";
import classNames from "../../utils/classNames";
import { fieldDescription, fieldLabel } from "../../utils/fieldStyles";
import type { SwitchProps } from "./Switch.types";

/*
 * Off is an ash-500 / ash-600 track (3.51 / 3.43:1 on the page) and on is
 * brand-700 / brand-600; the knob's side says the state without color.
 */
const track =
  "group relative inline-flex h-5 w-9 shrink-0 rounded-full bg-ash-500 p-0.5 " +
  "transition-colors duration-150 reduce-motion:transition-none " +
  "data-checked:bg-brand-700 data-disabled:opacity-50 " +
  "focus:outline-none data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-brand-700 " +
  "pointer-coarse:h-6 pointer-coarse:w-11 " +
  "dark:bg-ash-600 dark:data-checked:bg-brand-600 dark:data-focus:outline-brand-300";

const knob =
  "size-4 rounded-full bg-white shadow-xs transition-transform duration-150 reduce-motion:transition-none " +
  "group-data-checked:translate-x-4 pointer-coarse:size-5 pointer-coarse:group-data-checked:translate-x-5 " +
  "dark:bg-ash-100 dark:group-data-checked:bg-white";

export function Switch({
  label,
  description,
  disabled,
  className,
  ...props
}: SwitchProps) {
  return (
    <Field
      disabled={disabled}
      className={classNames("flex min-h-6 items-start gap-3", className)}
    >
      <HeadlessSwitch {...props} className={classNames(track, "mt-px")}>
        <span aria-hidden="true" className={knob} />
      </HeadlessSwitch>
      <div className="flex flex-col gap-0.5">
        <Label className={fieldLabel}>{label}</Label>
        {description && (
          <Description className={fieldDescription}>{description}</Description>
        )}
      </div>
    </Field>
  );
}
