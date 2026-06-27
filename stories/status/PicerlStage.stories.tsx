import type { Meta, StoryObj } from "@storybook/react-vite";

import { PicerlStage } from "../../src";

const meta = {
  title: "Status/PICERL Stage",
  component: PicerlStage,
  tags: ["autodocs"],
} satisfies Meta<typeof PicerlStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stages: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <PicerlStage stage="Preparation" />
      <PicerlStage stage="Identification" />
      <PicerlStage stage="Containment" />
      <PicerlStage stage="Eradication" />
      <PicerlStage stage="Recovery" />
      <PicerlStage stage="Lessons Learned" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-3">
      <PicerlStage stage="Lessons Learned" size="mini" />
      <PicerlStage stage="Lessons Learned" size="small" />
      <PicerlStage stage="Lessons Learned" size="maxi" />
    </div>
  ),
};
