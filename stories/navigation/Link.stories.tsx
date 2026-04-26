import type { Meta, StoryObj } from "@storybook/react-vite";

import { Link } from "../../src";

const meta = {
  title: "Navigation/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    to: "/cases/CAS-102",
    children: "Open linked case",
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithViewTransitionDisabled: Story = {
  args: {
    children: "Open alert details",
    to: "/alerts/ALT-2031",
    viewTransition: false,
  },
};