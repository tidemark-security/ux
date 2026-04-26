import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Bot, FolderKanban, LayoutDashboard, Search, Settings, ShieldCheck, Sparkles, Users } from "lucide-react";

import { Button, IconButton, SidebarRailWithLabels, SidebarWithSections, Tag } from "../../../src";

const meta = {
  title: "Patterns/Navigation/Workspaces",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const OperationsConsole: Story = {
  render: () => (
    <div className="flex h-[820px] w-full bg-page-background p-4">
      <div className="flex w-full overflow-hidden rounded-xl border border-neutral-border bg-default-background shadow-sm">
        <SidebarRailWithLabels
          aria-label="Primary workspace rail"
          header={<div className="text-caption-bold font-caption-bold text-brand-primary">TM</div>}
          footer={<SidebarRailWithLabels.NavItem icon={<Settings />}>Settings</SidebarRailWithLabels.NavItem>}
        >
          <SidebarRailWithLabels.NavItem icon={<LayoutDashboard />}>Overview</SidebarRailWithLabels.NavItem>
          <SidebarRailWithLabels.NavItem icon={<Sparkles />}>Assist</SidebarRailWithLabels.NavItem>
          <SidebarRailWithLabels.NavItem icon={<Users />}>Analysts</SidebarRailWithLabels.NavItem>
          <SidebarRailWithLabels.NavItem icon={<Bell />}>Alerts</SidebarRailWithLabels.NavItem>
        </SidebarRailWithLabels>

        <SidebarWithSections
          aria-label="Operations sections"
          header={
            <div className="flex w-full flex-col gap-1">
              <span className="text-heading-3 font-heading-3 text-default-font">Monitor</span>
              <span className="text-body font-body text-subtext-color">Shared queues and escalation surfaces</span>
            </div>
          }
          footer={<div className="text-caption font-caption text-subtext-color">12 connected analysts</div>}
          className="w-72 shrink-0 border-r"
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

        <div className="grid min-w-0 grow grid-cols-[1.4fr_0.8fr] gap-0">
          <section className="grid min-w-0 gap-4 border-r border-neutral-border p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="grid gap-1">
                <span className="text-heading-2 font-heading-2 text-default-font">Operations workspace</span>
                <span className="text-body font-body text-subtext-color">Rail navigation, sectioned task lists, and shared work surfaces combined into one shell.</span>
              </div>
              <div className="flex items-center gap-2">
                <IconButton aria-label="Search workspace" icon={<Search />} />
                <Button size="small">Create case</Button>
              </div>
            </div>
            <div className="grid gap-4 mobile:grid-cols-1 md:grid-cols-2">
              <div className="rounded-lg border border-neutral-border bg-page-background p-4">
                <span className="text-body-bold font-body-bold text-default-font">Active queue</span>
                <p className="mt-2 text-body font-body text-subtext-color">Critical alert triage, analyst review, and enrichment exceptions can live in the primary workspace column.</p>
              </div>
              <div className="rounded-lg border border-neutral-border bg-page-background p-4">
                <span className="text-body-bold font-body-bold text-default-font">Recent activity</span>
                <p className="mt-2 text-body font-body text-subtext-color">This area stays stable while the left rail and sectioned sidebar provide persistent navigation context.</p>
              </div>
            </div>
          </section>

          <aside className="grid gap-4 bg-neutral-50 p-6">
            <div className="rounded-lg border border-neutral-border bg-default-background p-4">
              <span className="text-body-bold font-body-bold text-default-font">Inspector</span>
              <p className="mt-2 text-body font-body text-subtext-color">Composite navigation patterns make the surrounding shell visible without documenting each nav primitive twice.</p>
            </div>
            <div className="rounded-lg border border-neutral-border bg-default-background p-4">
              <span className="text-body-bold font-body-bold text-default-font">Escalation notes</span>
              <p className="mt-2 text-body font-body text-subtext-color">Use this panel for next actions, routing policy notes, or analyst metadata.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  ),
};

export const MobileDispatchView: Story = {
  render: () => (
    <div className="mx-auto flex h-[780px] w-[430px] flex-col overflow-hidden rounded-[28px] border border-neutral-border bg-default-background shadow-sm">
      <div className="grid gap-4 p-5">
        <div className="grid gap-1">
          <span className="text-heading-3 font-heading-3 text-default-font">Mobile dispatch</span>
          <span className="text-body font-body text-subtext-color">A compact workspace that keeps essential destinations docked while the content area remains focused.</span>
        </div>
        <div className="rounded-lg border border-neutral-border bg-page-background p-4">
          <span className="text-body-bold font-body-bold text-default-font">Assigned alerts</span>
          <p className="mt-2 text-body font-body text-subtext-color">Use the content area for a focused queue or detail surface while the mobile rail stays persistent at the bottom.</p>
        </div>
        <div className="rounded-lg border border-neutral-border bg-page-background p-4">
          <span className="text-body-bold font-body-bold text-default-font">Current task</span>
          <p className="mt-2 text-body font-body text-subtext-color">Analysts can bounce between alerts, cases, and assist without losing context.</p>
        </div>
      </div>

      <div className="mt-auto border-t border-neutral-border p-3">
        <SidebarRailWithLabels mobile className="rounded-lg border border-brand-primary bg-black">
          <SidebarRailWithLabels.NavItem mobile icon={<Bell />}>Alerts</SidebarRailWithLabels.NavItem>
          <SidebarRailWithLabels.NavItem mobile icon={<FolderKanban />}>Cases</SidebarRailWithLabels.NavItem>
          <SidebarRailWithLabels.NavItem mobile icon={<Sparkles />}>Assist</SidebarRailWithLabels.NavItem>
        </SidebarRailWithLabels>
      </div>
    </div>
  ),
};