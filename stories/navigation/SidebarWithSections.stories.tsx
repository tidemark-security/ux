import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Bot, FolderKanban, Settings, ShieldCheck, Users } from "lucide-react";

import { SidebarWithSections, Tag } from "../../src";

const meta = {
  title: "Navigation/SidebarWithSections",
  component: SidebarWithSections,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SidebarWithSections>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-[720px] w-[320px] bg-page-background p-6">
      <SidebarWithSections
        header={
          <div className="flex w-full flex-col gap-1">
            <span className="text-heading-3 font-heading-3 text-default-font">Workspace</span>
            <span className="text-body font-body text-subtext-color">Shared operations and admin flows</span>
          </div>
        }
        footer={<div className="text-caption font-caption text-subtext-color">12 connected analysts</div>}
        className="rounded-lg border border-neutral-border"
      >
        <SidebarWithSections.NavSection label="Monitor">
          <SidebarWithSections.NavItem icon={<Bell />} rightSlot={<Tag tagText="4" />}>
            Alerts
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem icon={<FolderKanban />}>Cases</SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem icon={<Bot />}>Assist queues</SidebarWithSections.NavItem>
        </SidebarWithSections.NavSection>
        <SidebarWithSections.NavSection label="Configure">
          <SidebarWithSections.NavItem icon={<ShieldCheck />}>Policies</SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem icon={<Users />}>Teams</SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem icon={<Settings />}>Settings</SidebarWithSections.NavItem>
        </SidebarWithSections.NavSection>
      </SidebarWithSections>
    </div>
  ),
};