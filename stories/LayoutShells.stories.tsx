import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Filter, PanelLeftClose, Plus, Search, Settings, Sparkles, Users } from "lucide-react";

import {
  AdminPageLayout,
  Button,
  DefaultPageLayout,
  IconButton,
  SidebarRailWithLabels,
  SidebarWithSections,
} from "../src";

const meta = {
  title: "Layout/Page Shells",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function MockDesktopRail() {
  return (
    <SidebarRailWithLabels
      header={<div className="text-caption-bold font-caption-bold text-brand-primary">TM</div>}
      footer={<SidebarRailWithLabels.NavItem icon={<Settings />}>Settings</SidebarRailWithLabels.NavItem>}
    >
      <SidebarRailWithLabels.NavItem icon={<Bell />} selected>
        Alerts
      </SidebarRailWithLabels.NavItem>
      <SidebarRailWithLabels.NavItem icon={<Sparkles />}>Assist</SidebarRailWithLabels.NavItem>
      <SidebarRailWithLabels.NavItem icon={<Users />}>Teams</SidebarRailWithLabels.NavItem>
    </SidebarRailWithLabels>
  );
}

function MockMobileRail() {
  return (
    <SidebarRailWithLabels mobile>
      <SidebarRailWithLabels.NavItem mobile icon={<Bell />} selected>
        Alerts
      </SidebarRailWithLabels.NavItem>
      <SidebarRailWithLabels.NavItem mobile icon={<Sparkles />}>
        Assist
      </SidebarRailWithLabels.NavItem>
      <SidebarRailWithLabels.NavItem mobile icon={<Users />}>
        Teams
      </SidebarRailWithLabels.NavItem>
    </SidebarRailWithLabels>
  );
}

export const DefaultShell: Story = {
  render: () => (
    <div className="h-[820px] w-full">
      <DefaultPageLayout
        priority="high"
        withContainer
        desktopSidebar={<MockDesktopRail />}
        mobileSidebar={<MockMobileRail />}
        overlaySlot={<div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-500/10 to-transparent" />}
      >
        <div className="flex h-full w-full flex-col items-start gap-6 px-8 py-8">
          <div className="flex w-full items-start justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-heading-1 font-heading-1 text-default-font">Investigation workspace</span>
              <span className="max-w-2xl text-body font-body text-subtext-color">
                A generic shell for product surfaces that need persistent navigation, atmospheric priority styling, and a contained workspace body.
              </span>
            </div>
            <div className="flex gap-2">
              <IconButton icon={<Search />} />
              <Button variant="neutral-secondary" icon={<Filter />}>
                Filter
              </Button>
              <Button icon={<Plus />}>Create</Button>
            </div>
          </div>
          <div className="grid w-full grow grid-cols-[1.3fr_0.9fr] gap-6 mobile:grid-cols-1">
            <div className="rounded-lg border border-neutral-border bg-page-background p-6">
              <div className="grid gap-3">
                <span className="text-heading-3 font-heading-3 text-default-font">Activity stream</span>
                <div className="rounded-md border border-neutral-border p-4 text-body font-body text-subtext-color">
                  Primary workspace content renders here.
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-neutral-border bg-page-background p-6">
              <div className="grid gap-3">
                <span className="text-heading-3 font-heading-3 text-default-font">Inspector</span>
                <div className="rounded-md border border-neutral-border p-4 text-body font-body text-subtext-color">
                  Overlay or dock content can sit above the shell via the dedicated slot.
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultPageLayout>
    </div>
  ),
};

export const AdminShell: Story = {
  render: () => (
    <div className="h-[820px] w-full">
      <AdminPageLayout
        title="Case routing policies"
        subtitle="Reusable admin shell with page heading, back affordance, and primary action slot."
        actionButton={<Button icon={<Plus />}>New policy</Button>}
        layoutProps={{
          desktopSidebar: (
            <SidebarWithSections
              header={<span className="text-heading-3 font-heading-3 text-default-font">Admin</span>}
              className="w-72"
            >
              <SidebarWithSections.NavSection label="Operations">
                <SidebarWithSections.NavItem icon={<Sparkles />}>Automations</SidebarWithSections.NavItem>
                <SidebarWithSections.NavItem icon={<Users />}>Teams</SidebarWithSections.NavItem>
                <SidebarWithSections.NavItem icon={<PanelLeftClose />} selected>
                  Routing
                </SidebarWithSections.NavItem>
              </SidebarWithSections.NavSection>
            </SidebarWithSections>
          ),
        }}
      >
        <div className="grid w-full gap-4">
          <div className="rounded-lg border border-neutral-border bg-page-background p-5">
            <span className="text-body-bold font-body-bold text-default-font">Policy list</span>
            <p className="mt-2 text-body font-body text-subtext-color">
              Shell consumers provide their own content while reusing the layout frame.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-border bg-page-background p-5">
            <span className="text-body-bold font-body-bold text-default-font">Review queue</span>
            <p className="mt-2 text-body font-body text-subtext-color">Secondary admin sections fit naturally under the shared header.</p>
          </div>
        </div>
      </AdminPageLayout>
    </div>
  ),
};