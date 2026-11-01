/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentType } from "react";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { ExclamationTriangleIcon } from "../icons/ExclamationTriangleIcon";
import { InformationCircleIcon } from "../icons/InformationCircleIcon";
import { XCircleIcon } from "../icons/XCircleIcon";
import type { SvgIconProps } from "../icons/SvgIcon.types";
import type { FeedbackVariant } from "../types/feedback";

/*
 * Tinted surfaces for Alert and Banner. Text on its tint: ash 16.48 / 14.86,
 * celadon 8.26 / 9.44, accent 11.76 / 11.99, brick 9.21 / 9.36 (light / dark).
 */
export const feedbackSurface: Record<FeedbackVariant, string> = {
  info: "bg-ash-50 text-ash-900 ring-ash-200 dark:bg-ash-900 dark:text-ash-100 dark:ring-ash-800",
  success:
    "bg-celadon-50 text-celadon-800 ring-celadon-200 dark:bg-celadon-950 dark:text-celadon-200 dark:ring-celadon-900",
  warning:
    "bg-accent-50 text-accent-900 ring-accent-200 dark:bg-accent-950 dark:text-accent-100 dark:ring-accent-900",
  danger:
    "bg-brick-50 text-brick-800 ring-brick-200 dark:bg-brick-950 dark:text-brick-200 dark:ring-brick-900",
};

/** Icon color per tone, 3:1 or better on its tint and on a plain surface. */
export const feedbackIconColor: Record<FeedbackVariant, string> = {
  info: "text-ash-700 dark:text-ash-400",
  success: "text-celadon-700 dark:text-celadon-300",
  warning: "text-accent-700 dark:text-accent-200",
  danger: "text-brick-700 dark:text-brick-300",
};

/** The icon that says the tone without color. */
export const feedbackIcon: Record<FeedbackVariant, ComponentType<SvgIconProps>> = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  danger: XCircleIcon,
};
