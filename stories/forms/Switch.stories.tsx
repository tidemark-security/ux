import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch } from "../../src";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <div className="flex items-center gap-3">
        <Switch checked={checked} onCheckedChange={setChecked} label />
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="grid w-fit gap-3">
      <Switch defaultChecked label />
      <Switch label />
      <Switch defaultChecked label disabled />
    </div>
  ),
};
