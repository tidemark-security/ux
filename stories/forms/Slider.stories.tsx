import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Slider } from "../../src";

const meta = {
  title: "Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState([45]);

    return (
      <div className="grid w-[420px] gap-3">
        <span className="text-caption font-caption text-subtext-color">Confidence threshold: {value[0]}%</span>
        <Slider min={0} max={100} step={1} value={value} onValueChange={setValue} />
      </div>
    );
  },
};