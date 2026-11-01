/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComputerDesktopIcon } from "../../icons/ComputerDesktopIcon";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";
import { useTheme, type ThemeMode } from "../../context/ThemeContext";
import { SegmentedControl } from "../SegmentedControl/SegmentedControl";
import type { ThemeToggleProps } from "./ThemeToggle.types";

const modes: { value: ThemeMode; label: string; Glyph: typeof SunIcon }[] = [
  { value: "system", label: "System", Glyph: ComputerDesktopIcon },
  { value: "light", label: "Light", Glyph: SunIcon },
  { value: "dark", label: "Dark", Glyph: MoonIcon },
];

/** System, light or dark, as a radio group named "Color scheme". Needs a ThemeProvider. */
export function ThemeToggle({ showLabels = false, size = "sm", className }: ThemeToggleProps) {
  const { mode, setMode } = useTheme();
  return (
    <SegmentedControl
      label="Color scheme"
      size={size}
      value={mode}
      onChange={setMode}
      className={className}
      options={modes.map(({ value, label, Glyph }) => ({
        value,
        icon: <Glyph />,
        label: <span className={showLabels ? undefined : "sr-only"}>{label}</span>,
      }))}
    />
  );
}
