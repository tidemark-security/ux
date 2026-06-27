import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArrowDown,
  ArrowUp,
  Asterisk,
  Bell,
  BookOpen,
  CheckSquare,
  ClipboardCheck,
  Clock,
  Edit3,
  Eye,
  Filter,
  NotebookPen,
  RotateCcw,
  ShieldCheck,
  ShieldOff,
  Sparkles,
} from "lucide-react";

import { ToggleGroup } from "../../src";

const meta = {
  title: "Forms/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState("alerts");

    return (
      <ToggleGroup value={value} onValueChange={setValue}>
        <ToggleGroup.Item icon={<Bell />} value="alerts">
          Alerts
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<NotebookPen />} value="cases">
          Cases
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<CheckSquare />} value="tasks">
          Tasks
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["triage", "review"]);

    return (
      <div className="grid gap-3">
        <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
          <ToggleGroup.Item icon={<Filter />} value="triage">
            Triage
          </ToggleGroup.Item>
          <ToggleGroup.Item icon={<Sparkles />} value="review">
            Review
          </ToggleGroup.Item>
          <ToggleGroup.Item icon={null} value="disabled" disabled>
            Disabled
          </ToggleGroup.Item>
        </ToggleGroup>
        <pre className="rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
          {JSON.stringify({ value }, null, 2)}
        </pre>
      </div>
    );
  },
};

export const TimelinePicker: Story = {
  render: () => {
    const [sortBy, setSortBy] = useState("timestamp");
    const [sortDirection, setSortDirection] = useState("desc");
    const [itemType, setItemType] = useState("all");

    return (
      <div className="flex flex-wrap items-start gap-2">
        <ToggleGroup
          value={sortBy}
          labelDisplay="tooltip"
          className="border border-neutral-border"
          onValueChange={(value) => {
            if (value) {
              setSortBy(value);
            }
          }}
        >
          <ToggleGroup.Item icon={<Clock />} value="timestamp">
            Time
          </ToggleGroup.Item>
          <ToggleGroup.Item icon={<Edit3 />} value="created_at">
            Modified
          </ToggleGroup.Item>
        </ToggleGroup>

        <ToggleGroup
          value={sortDirection}
          labelDisplay="tooltip"
          className="border border-neutral-border"
          onValueChange={(value) => {
            if (value) {
              setSortDirection(value);
            }
          }}
        >
          <ToggleGroup.Item icon={<ArrowDown />} value="desc">
            Newest first
          </ToggleGroup.Item>
          <ToggleGroup.Item icon={<ArrowUp />} value="asc">
            Oldest first
          </ToggleGroup.Item>
        </ToggleGroup>

        <ToggleGroup
          value={itemType}
          className="border border-neutral-border"
          onValueChange={(value) => {
            if (value) {
              setItemType(value);
            }
          }}
        >
          <ToggleGroup.Item icon={<Asterisk />} value="all">
            All Items
          </ToggleGroup.Item>
          <ToggleGroup.Item icon={<NotebookPen />} value="note">
            Note
          </ToggleGroup.Item>
          <ToggleGroup.Item icon={<Bell />} value="alert">
            Alert
          </ToggleGroup.Item>
          <ToggleGroup.Item icon={<CheckSquare />} value="task">
            Task
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>
    );
  },
};

export const CompactButtonVariant: Story = {
  render: () => {
    const [value, setValue] = useState("task");

    return (
      <ToggleGroup
        value={value}
        variant="compact-button"
        className="border border-neutral-border"
        onValueChange={(nextValue) => {
          if (nextValue) {
            setValue(nextValue);
          }
        }}
      >
        <ToggleGroup.Item icon={<NotebookPen />} value="note">
          Note
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<Bell />} value="alert">
          Alert
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<CheckSquare />} value="task">
          Task
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const ContractedLabelsWithTooltips: Story = {
  render: () => {
    const [value, setValue] = useState("timeline");

    return (
      <ToggleGroup
        value={value}
        variant="compact-button"
        labelDisplay="tooltip"
        className="border border-neutral-border"
        onValueChange={(nextValue) => {
          if (nextValue) {
            setValue(nextValue);
          }
        }}
      >
        <ToggleGroup.Item icon={<NotebookPen />} value="timeline">
          Timeline
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<Filter />} value="filters">
          Filters
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<RotateCcw />} value="reset">
          Reset filters
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const RichTooltips: Story = {
  render: () => {
    const [value, setValue] = useState("containment");

    return (
      <ToggleGroup
        value={value}
        variant="two-line-button"
        className="border border-neutral-border"
        onValueChange={(nextValue) => {
          if (nextValue) {
            setValue(nextValue);
          }
        }}
      >
        <ToggleGroup.Item
          icon={<ClipboardCheck />}
          value="preparation"
          tooltip={
            <div className="flex flex-col gap-0.5">
              <span className="text-caption-bold font-caption-bold text-black">
                0. Preparation
              </span>
              <span className="text-caption font-caption text-black">
                0 complete · 3 open · 3 total
              </span>
            </div>
          }
        >
          0. Prep 0/3
        </ToggleGroup.Item>
        <ToggleGroup.Item
          icon={<ShieldCheck />}
          value="containment"
          tooltip={
            <div className="flex flex-col gap-0.5">
              <span className="text-caption-bold font-caption-bold text-black">
                2. Containment
              </span>
              <span className="text-caption font-caption text-black">
                1 complete · 0 open · 1 total
              </span>
            </div>
          }
        >
          2. Contain 1/1
        </ToggleGroup.Item>
        <ToggleGroup.Item
          icon={<ShieldOff />}
          value="eradication"
          tooltip={
            <div className="flex flex-col gap-0.5">
              <span className="text-caption-bold font-caption-bold text-black">
                3. Eradication
              </span>
              <span className="text-caption font-caption text-black">
                0 complete · 2 open · 2 total
              </span>
            </div>
          }
        >
          3. Erad 0/2
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const ButtonVariant: Story = {
  render: () => {
    const [value, setValue] = useState("containment");

    return (
      <ToggleGroup
        value={value}
        variant="button"
        className="border border-neutral-border"
        onValueChange={(nextValue) => {
          if (nextValue) {
            setValue(nextValue);
          }
        }}
      >
        <ToggleGroup.Item icon={<ClipboardCheck />} value="preparation">
          Prepare
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<ShieldCheck />} value="containment">
          Contain
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<RotateCcw />} value="recovery">
          Recover
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const TwoLineButtonVariant: Story = {
  render: () => {
    const [value, setValue] = useState("Identification");

    return (
      <ToggleGroup
        value={value}
        variant="two-line-button"
        className="border border-neutral-border"
        onValueChange={(nextValue) => {
          if (nextValue) {
            setValue(nextValue);
          }
        }}
      >
        <ToggleGroup.Item icon={<Asterisk />} value="all">
          <span className="flex min-w-0 flex-col items-start gap-0.5">
            <span>All Stages</span>
            <span className="text-caption font-caption opacity-80">8/18</span>
          </span>
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<Eye />} value="Identification">
          <span className="flex min-w-0 flex-col items-start gap-0.5">
            <span className="truncate">Identification</span>
            <span className="text-caption font-caption opacity-80">3/5</span>
          </span>
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<ShieldOff />} value="Eradication">
          <span className="flex min-w-0 flex-col items-start gap-0.5">
            <span className="truncate">Eradication</span>
            <span className="text-caption font-caption opacity-80">1/4</span>
          </span>
        </ToggleGroup.Item>
        <ToggleGroup.Item icon={<BookOpen />} value="Lessons Learned">
          <span className="flex min-w-0 flex-col items-start gap-0.5">
            <span className="truncate">Lessons Learned</span>
            <span className="text-caption font-caption opacity-80">0/3</span>
          </span>
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};
