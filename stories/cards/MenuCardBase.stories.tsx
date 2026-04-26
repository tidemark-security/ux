import type { Meta, StoryObj } from "@storybook/react-vite";

import { MenuCardBase, getMenuCardMetaClassName, getMenuCardTitleClassName } from "../../src/components/cards/MenuCardBase";
import { useTheme } from "../../src/contexts/ThemeContext";

const meta = {
  title: "Cards/MenuCardBase",
  component: MenuCardBase,
  tags: ["autodocs"],
} satisfies Meta<typeof MenuCardBase>;

export default meta;

type Story = StoryObj<typeof meta>;

function CardContent({ variant }: { variant: "default" | "selected" }) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4">
        <span className={getMenuCardTitleClassName(isDarkTheme, variant)}>Suspicious PowerShell chain</span>
        <span className={getMenuCardMetaClassName(isDarkTheme, variant)}>ALT-2031</span>
      </div>
      <div className={getMenuCardMetaClassName(isDarkTheme, variant, "mt-2 w-full")}>
        Analyst workflow card with reusable title and meta styling.
      </div>
    </>
  );
}

export const Variants: Story = {
  render: () => (
    <div className="grid w-[560px] gap-2 rounded-md border border-neutral-border bg-default-background p-4">
      <MenuCardBase variant="default">
        <CardContent variant="default" />
      </MenuCardBase>
      <MenuCardBase variant="selected">
        <CardContent variant="selected" />
      </MenuCardBase>
    </div>
  ),
};