import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { ChatInput } from "../../src";

const meta = {
  title: "AI/ChatInput",
  component: ChatInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Ask me anything...",
    showHistoryButton: true,
    onSendMessage: fn(),
    onHistoryClick: fn(),
  },
} satisfies Meta<typeof ChatInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[760px] rounded-md border border-neutral-border bg-default-background p-4">
      <ChatInput {...args} />
    </div>
  ),
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByRole("textbox"), "Summarize this alert");
    await userEvent.click(canvas.getByRole("button", { name: /send message/i }));
    await expect(args.onSendMessage).toHaveBeenCalledWith("Summarize this alert");
  },
};

export const HistoryButton: Story = {
  render: (args) => (
    <div className="w-[760px] rounded-md border border-neutral-border bg-default-background p-4">
      <ChatInput {...args} />
    </div>
  ),
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /show chat history/i }));
    await expect(args.onHistoryClick).toHaveBeenCalled();
  },
};