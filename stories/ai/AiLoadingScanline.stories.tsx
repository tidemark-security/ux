import type { Meta, StoryObj } from "@storybook/react-vite";

import { AiLoadingScanline } from "../../src";

const meta = {
  title: "AI/AiLoadingScanline",
  component: AiLoadingScanline,
  tags: ["autodocs"],
} satisfies Meta<typeof AiLoadingScanline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[520px] rounded-md border border-neutral-border bg-default-background p-4">
      <div className="flex w-full min-w-0 flex-col items-start gap-2 rounded-md bg-neutral-100 px-3 py-3">
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-2 text-caption font-caption text-default-font">
            <span>Generating response</span>
          </div>
          <AiLoadingScanline />
        </div>
      </div>
    </div>
  ),
};