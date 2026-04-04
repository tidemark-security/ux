import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DateTimeManager, TagInput, TagsManager } from "../src";

const meta = {
  title: "Forms/Metadata Controls",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TagEntry: Story = {
  render: () => (
    <div className="w-[420px]">
      <TagInput label="Indicators" placeholder="malware; phishing; c2" tags={<div className="text-caption font-caption text-subtext-color">Tags render below the field.</div>} />
    </div>
  ),
};

export const TagsManagerStory: Story = {
  render: () => {
    const [tags, setTags] = useState(["sigma", "windows", "persistence"]);

    return (
      <div className="grid w-[520px] gap-6">
        <TagsManager tags={tags} onTagsChange={setTags} />
        <TagsManager tags={tags} onTagsChange={setTags} inline />
      </div>
    );
  },
};

export const DateTimeManagerStory: Story = {
  render: () => {
    const [value, setValue] = useState("2026-04-04 15:30");

    return (
      <div className="grid w-[420px] gap-4">
        <DateTimeManager value={value} onChange={setValue} helpText="Times are stored in your local timezone display format." />
        <DateTimeManager value={value} onChange={setValue} size="small" label="Observed" />
      </div>
    );
  },
};