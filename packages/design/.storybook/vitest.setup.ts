/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as projectAnnotations from "./preview";

// Applies the preview's configuration (decorators, the a11y rules) to stories run as tests.
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
