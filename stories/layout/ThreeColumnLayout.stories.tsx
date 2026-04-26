import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, ChevronLeft, ChevronRight, Columns2, LayoutPanelLeft, Sparkles } from "lucide-react";

import { Button, IconButton, ThreeColumnLayout, type VisibleColumns } from "../../src";

const meta = {
  title: "Layout/ThreeColumnLayout",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const options: VisibleColumns[] = ["left", "center", "right", "left+center", "center+right", "all"];

export const Interactive: Story = {
  render: () => {
    const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>("all");
    const [leftRailCollapsed, setLeftRailCollapsed] = useState(false);
    const [leftWidth, setLeftWidth] = useState(420);

    return (
      <div className="flex h-[860px] w-full flex-col bg-page-background">
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-border px-6 py-4">
          {options.map((option) => (
            <Button
              key={option}
              size="small"
              variant={visibleColumns === option ? "brand-primary" : "neutral-secondary"}
              onClick={() => setVisibleColumns(option)}
            >
              {option}
            </Button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <IconButton
              icon={leftRailCollapsed ? <ChevronRight /> : <ChevronLeft />}
              onClick={() => setLeftRailCollapsed((value) => !value)}
            />
          </div>
        </div>

        <ThreeColumnLayout
          leftColumn={
            <div className="flex h-full w-full flex-col gap-4 p-6">
              <div className="flex items-center gap-2 text-heading-3 font-heading-3 text-default-font">
                <LayoutPanelLeft />
                Queue list
              </div>
              <div className="rounded-lg border border-neutral-border p-4 text-body font-body text-subtext-color">
                Left column content uses the shared rail for resize and collapse behavior.
              </div>
            </div>
          }
          centerColumn={
            <div className="flex h-full w-full flex-col gap-4 p-6">
              <div className="flex items-center gap-2 text-heading-3 font-heading-3 text-default-font">
                <Columns2 />
                Investigation canvas
              </div>
              <div className="rounded-lg border border-neutral-border p-4 text-body font-body text-subtext-color">
                The center region stays stable while adjacent rails appear, collapse, or float.
              </div>
            </div>
          }
          rightColumn={
            <div className="grid gap-4">
              <div className="flex items-center gap-2 text-heading-3 font-heading-3 text-default-font">
                <Sparkles />
                Analyst assist
              </div>
              <div className="rounded-lg border border-neutral-border bg-default-background p-4 text-body font-body text-subtext-color">
                Right-side drawers can be persistent on larger screens and inline on smaller ones.
              </div>
              <div className="rounded-lg border border-neutral-border bg-default-background p-4 text-body font-body text-subtext-color">
                Width is driven by the shared layout config and animation tokens.
              </div>
            </div>
          }
          visibleColumns={visibleColumns}
          onVisibleColumnsChange={setVisibleColumns}
          showLeftRail
          leftRailCollapsed={leftRailCollapsed}
          onLeftRailToggle={() => setLeftRailCollapsed((value) => !value)}
          leftColumnWidth={leftRailCollapsed ? 0 : leftWidth}
          onLeftColumnWidthChange={setLeftWidth}
          columnConfig={{
            desktop: { rightWidth: "w-[420px]" },
            ultrawide: { rightWidth: "w-[460px]" },
          }}
        />
      </div>
    );
  },
};

export const CenterAndRight: Story = {
  render: () => (
    <div className="h-[760px] w-full bg-page-background">
      <ThreeColumnLayout
        leftColumn={<div />}
        centerColumn={
          <div className="flex h-full w-full flex-col gap-4 p-6">
            <div className="flex items-center gap-2 text-heading-3 font-heading-3 text-default-font">
              <Bell />
              Alert detail
            </div>
            <div className="rounded-lg border border-neutral-border p-4 text-body font-body text-subtext-color">
              Consumers can hide the left column entirely and keep a center/detail pairing.
            </div>
          </div>
        }
        rightColumn={
          <div className="grid gap-4">
            <div className="rounded-lg border border-neutral-border bg-default-background p-4 text-body font-body text-subtext-color">
              Context panel
            </div>
          </div>
        }
        visibleColumns="center+right"
        onVisibleColumnsChange={() => {}}
      />
    </div>
  ),
};