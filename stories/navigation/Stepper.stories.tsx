import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stepper } from "../../src";

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Progress: Story = {
  render: () => (
    <div className="w-[720px] rounded-md border border-neutral-border bg-default-background p-6">
      <Stepper>
        <Stepper.Step firstStep stepNumber="1" label="Intake" variant="completed" />
        <Stepper.Step stepNumber="2" label="Triage" variant="active" />
        <Stepper.Step stepNumber="3" label="Escalation" />
        <Stepper.Step lastStep stepNumber="4" label="Closure" />
      </Stepper>
    </div>
  ),
};