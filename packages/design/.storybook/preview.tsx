/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import "../src/theme.css";
import "./forms-plugin-check.css";
import "./canvas.css";

// The toolbars, decorators and axe settings live in preview-config, without
// CSS, so @bulmerkiln/ui's Storybook shares them and brings its own styles.
export { default } from "./preview-config";
