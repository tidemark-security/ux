import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { ToolApprovalCard, type ToolApproval } from "../../src";

const approval: ToolApproval = {
  id: "approval-1",
  toolName: "network_enrichment",
  description: "query external telemetry for this IP address",
  status: "pending",
};

const meta = {
  title: "AI/ToolApprovalCard",
  component: ToolApprovalCard,
  tags: ["autodocs"],
  args: {
    messageId: "message-1",
    approval,
    onApprove: fn(),
    onDeny: fn(),
  },
} satisfies Meta<typeof ToolApprovalCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ApproveAction: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /approve/i }));
    await expect(args.onApprove).toHaveBeenCalledWith("message-1", "approval-1");
  },
};

export const DenyAction: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /deny/i }));
    await expect(args.onDeny).toHaveBeenCalledWith("message-1", "approval-1");
  },
};