/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Radio, RadioGroup } from "@headlessui/react";
import classNames from "../../utils/classNames";
import type {
  SegmentedControlProps,
  SegmentedControlSize,
} from "./SegmentedControl.types";

const sizeStyles: Record<SegmentedControlSize, string> = {
  sm: "min-h-6 px-2 text-xs pointer-coarse:min-h-10",
  md: "min-h-7 px-3 text-sm pointer-coarse:min-h-10",
};

/*
 * The chosen option is a raised pill whose ring clears 3:1 against the track
 * (ash-600 4.69:1 on ash-100, ash-500 4.91:1 on ash-900), so the state isn't
 * carried by a tint alone.
 */
const option =
  "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap text-ash-700 " +
  "transition-colors duration-100 reduce-motion:transition-none " +
  "data-hover:text-ash-900 data-disabled:opacity-50 " +
  "data-checked:bg-white data-checked:text-ash-900 data-checked:shadow-xs data-checked:ring-1 data-checked:ring-ash-600 " +
  "focus:outline-none data-focus:outline-2 data-focus:outline-offset-1 data-focus:outline-brand-700 " +
  "[&_svg]:size-4 " +
  "dark:text-ash-400 dark:data-hover:text-ash-100 dark:data-checked:bg-ash-700 dark:data-checked:text-ash-100 " +
  "dark:data-checked:ring-ash-500 dark:data-checked:shadow-none dark:data-focus:outline-brand-300";

/**
 * One choice from a few, side by side: a radio group, so Tab enters on the
 * chosen option and the arrow keys change it.
 */
export function SegmentedControl<T>({
  label,
  options,
  size = "md",
  className,
  ...props
}: SegmentedControlProps<T>) {
  return (
    <RadioGroup
      {...props}
      aria-label={label}
      className={classNames(
        "inline-flex items-center gap-0.5 rounded-lg bg-ash-100 p-0.5 dark:bg-ash-900 dark:ring-1 dark:ring-ash-800",
        className,
      )}
    >
      {options.map((item, index) => (
        <Radio
          key={index}
          value={item.value}
          disabled={item.disabled}
          className={classNames(option, sizeStyles[size])}
        >
          {item.icon && <span aria-hidden="true" className="contents">{item.icon}</span>}
          {item.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
