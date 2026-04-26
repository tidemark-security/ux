import type { Meta, StoryObj } from "@storybook/react-vite";
import { RefreshCcw } from "lucide-react";

import { Progress } from "../../src";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <div className="grid w-[480px] gap-4">
      <div className="grid gap-2">
        <span className="text-caption-bold font-caption-bold text-default-font">Queued</span>
        <Progress value={18} aria-label="Queued progress" />
      </div>
      <div className="grid gap-2">
        <span className="text-caption-bold font-caption-bold text-default-font">Enriching</span>
        <Progress value={64} aria-label="Enriching progress" />
      </div>
      <div className="grid gap-2">
        <span className="text-caption-bold font-caption-bold text-default-font">Retrying</span>
        <Progress value={42} aria-label="Retrying progress">
          <Progress.Indicator className="bg-warning-600" style={{ transform: "translateX(-58%)" }} />
        </Progress>
        <div className="flex items-center gap-1 text-caption font-caption text-subtext-color">
          <RefreshCcw className="h-3 w-3" /> Next attempt scheduled
        </div>
      </div>
    </div>
  ),
};
