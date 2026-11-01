/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { CheckCircleIcon } from "../../icons/CheckCircleIcon";
import { ExclamationTriangleIcon } from "../../icons/ExclamationTriangleIcon";
import { Badge } from "./Badge";
import type { BadgeTone } from "./Badge.types";

const meta = {
  title: "Data display/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Verified", tone: "success" },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-29: a badge's meaning is in its text; an icon beside it is decorative. */
export const Default: Story = {
  args: { icon: <CheckCircleIcon /> },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText("Verified")).toBeVisible();
    await expect(canvasElement.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  },
};

const samples: Record<BadgeTone, string> = {
  neutral: "Private",
  brand: "Release",
  success: "Verified",
  warning: "Deprecated",
  danger: "3 critical",
};

const All = () => (
  <div className="flex flex-col gap-3">
    {(["md", "sm"] as const).map((size) => (
      <div key={size} className="flex flex-wrap items-center gap-2">
        {(Object.keys(samples) as BadgeTone[]).map((tone) => (
          <Badge key={tone} tone={tone} size={size}>
            {samples[tone]}
          </Badge>
        ))}
        <Badge tone="warning" size={size} icon={<ExclamationTriangleIcon />}>
          Unsigned
        </Badge>
      </div>
    ))}
  </div>
);

export const Tones: Story = { globals: { theme: "light" }, render: All };

export const Dark: Story = { globals: { theme: "dark" }, render: All };
