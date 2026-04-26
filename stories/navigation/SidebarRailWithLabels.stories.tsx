import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, LayoutDashboard, Settings, Sparkles, Users } from "lucide-react";

import { SidebarRailWithLabels } from "../../src";

const meta = {
  title: "Navigation/SidebarRailWithLabels",
  component: SidebarRailWithLabels,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SidebarRailWithLabels>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  render: () => (
    <div className="flex h-[620px] w-[96px] bg-page-background p-4">
      <SidebarRailWithLabels
        header={<div className="text-caption-bold font-caption-bold text-brand-primary">TM</div>}
        footer={<SidebarRailWithLabels.NavItem icon={<Settings />}>Settings</SidebarRailWithLabels.NavItem>}
        className="rounded-lg border border-neutral-border"
      >
        <SidebarRailWithLabels.NavItem icon={<LayoutDashboard />} selected>
          Overview
        </SidebarRailWithLabels.NavItem>
        <SidebarRailWithLabels.NavItem icon={<Sparkles />}>Assist</SidebarRailWithLabels.NavItem>
        <SidebarRailWithLabels.NavItem icon={<Users />}>Analysts</SidebarRailWithLabels.NavItem>
        <SidebarRailWithLabels.NavItem icon={<Bell />}>Alerts</SidebarRailWithLabels.NavItem>
      </SidebarRailWithLabels>
    </div>
  ),
};

export const Mobile: Story = {
  render: () => (
    <div className="w-[420px] bg-page-background p-4">
      <SidebarRailWithLabels mobile className="rounded-lg border border-brand-primary bg-black">
        <SidebarRailWithLabels.NavItem mobile icon={<Bell />} selected>
          Alerts
        </SidebarRailWithLabels.NavItem>
        <SidebarRailWithLabels.NavItem mobile icon={<Sparkles />}>
          Assist
        </SidebarRailWithLabels.NavItem>
        <SidebarRailWithLabels.NavItem mobile icon={<Users />}>
          Analysts
        </SidebarRailWithLabels.NavItem>
      </SidebarRailWithLabels>
    </div>
  ),
};