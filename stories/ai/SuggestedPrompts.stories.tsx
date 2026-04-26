import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { SuggestedPrompts, type SuggestedPrompt } from "../../src";

const prompts: SuggestedPrompt[] = [
  { id: "1", label: "Summarize the latest alert" },
  { id: "2", label: "Find related indicators" },
  { id: "3", label: "Draft a triage note" },
];

const meta = {
  title: "AI/SuggestedPrompts",
  component: SuggestedPrompts,
  tags: ["autodocs"],
  args: {
    prompts,
    onPromptClick: fn(),
  },
} satisfies Meta<typeof SuggestedPrompts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /summarize the latest alert/i }));
    await expect(args.onPromptClick).toHaveBeenCalledWith(prompts[0]);
  },
};