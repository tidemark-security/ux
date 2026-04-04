import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Bot, FolderKanban, LayoutDashboard, Settings, ShieldCheck, Sparkles, Users } from "lucide-react";

import { SidebarRailWithLabels, SidebarWithSections, Tag } from "../src";

const meta = {
  title: "Navigation/Shells",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CompactRail: Story = {
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

export const SectionedSidebar: Story = {
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
          <SidebarWithSections.NavItem icon={<Bell />} selected rightSlot={<Tag tagText="4" />}>
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