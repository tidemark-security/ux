import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowUpDown, Tag as TagIcon } from "lucide-react";

import {
    AssigneeSelector,
    DateRangePicker,
    Toolbar,
    ToolbarButton,
    type DateRangeValue,
} from "../../src";

const users = [
    { userId: 1, username: "alex", email: "alex@tidemark.ai" },
    { userId: 2, username: "riley", email: "riley@tidemark.ai" },
    { userId: 3, username: "sam", email: "sam@tidemark.ai" },
];

const meta = {
    title: "Navigation/Toolbar",
    component: Toolbar,
    tags: ["autodocs"],
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
    render: () => (
        <div className="w-[640px]">
            <Toolbar>
                <ToolbarButton
                    icon={<TagIcon className="h-4 w-4" />}
                    label="Tags"
                    value="Any"
                    chevron
                />
                <ToolbarButton
                    icon={<ArrowUpDown className="h-4 w-4" />}
                    label="Sort"
                    value="Newest"
                    chevron
                    active
                />
            </Toolbar>
        </div>
    ),
};

export const EntityFilters: Story = {
    render: () => {
        const [selectedAssignees, setSelectedAssignees] = useState<string[] | null>(["alex"]);
        const [dateRange, setDateRange] = useState<DateRangeValue | null>(null);

        return (
            <div className="flex w-[640px] flex-col gap-3">
                <Toolbar>
                    <AssigneeSelector
                        presentation="toolbar"
                        mode="filter"
                        currentUser="riley"
                        selectedAssignees={selectedAssignees}
                        users={users}
                        onSelectionChange={setSelectedAssignees}
                    />
                    <DateRangePicker
                        presentation="toolbar"
                        value={dateRange}
                        onChange={setDateRange}
                    />
                    <ToolbarButton
                        icon={<TagIcon className="h-4 w-4" />}
                        label="Tags"
                        value="Any"
                        chevron
                    />
                </Toolbar>
                <pre className="rounded-md border border-neutral-border bg-neutral-50 p-3 text-caption font-caption text-default-font">
                    {JSON.stringify({ selectedAssignees, dateRange }, null, 2)}
                </pre>
            </div>
        );
    },
};
