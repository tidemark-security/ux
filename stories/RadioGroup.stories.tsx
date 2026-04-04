import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup } from "../src";

const meta = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = useState("notify");

    return (
      <RadioGroup label="Notification strategy" value={value} onValueChange={setValue}>
        <RadioGroup.Option value="notify" label="Notify analyst immediately" />
        <RadioGroup.Option value="queue" label="Queue for later review" />
        <RadioGroup.Option value="ignore" label="Ignore this event" />
      </RadioGroup>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState("medium");

    return (
      <RadioGroup
        label="Priority"
        helpText="Used for downstream routing"
        horizontal
        value={value}
        onValueChange={setValue}
      >
        <RadioGroup.Option value="low" label="Low" />
        <RadioGroup.Option value="medium" label="Medium" />
        <RadioGroup.Option value="high" label="High" />
      </RadioGroup>
    );
  },
};