import { useEffect, useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, Star, ThumbsDown, ThumbsUp } from "lucide-react";

import { CarouselControl } from "../../src";
import type { CarouselControlSize } from "../../src";
import { useTheme } from "../../src/contexts/ThemeContext";

const meta = {
  title: "Navigation/CarouselControl",
  component: CarouselControl,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Discrete carousel controls: previous / next chevrons flanking a row of square position markers. The active item is shown as an elongated bar. Pair with a `group` parent and a subtle opacity class to keep it unobtrusive but discoverable.",
      },
    },
  },
} satisfies Meta<typeof CarouselControl>;

export default meta;

type Story = StoryObj<typeof meta>;

const COUNT = 5;

function SizeRow({ size }: { size: CarouselControlSize }) {
  const [index, setIndex] = useState(2);

  return (
    <div className="flex items-center gap-6">
      <span className="w-16 text-caption-bold font-caption-bold text-subtext-color">{size}</span>
      <CarouselControl
        size={size}
        count={COUNT}
        index={index}
        onPrevious={() => setIndex((prev) => (prev - 1 + COUNT) % COUNT)}
        onNext={() => setIndex((prev) => (prev + 1) % COUNT)}
        onSelect={setIndex}
        itemLabel="slide"
      />
    </div>
  );
}

/**
 * All three sizes side by side. Each control is interactive - use the chevrons
 * or click a marker to move between positions.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 border border-neutral-border bg-default-background p-8">
      <SizeRow size="mini" />
      <SizeRow size="medium" />
      <SizeRow size="large" />
    </div>
  ),
};

function TipBox() {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  const kbdClass = [
    "p-1 font-mono border",
    isDarkTheme ? "border-brand-1000 bg-brand-1100" : "border-neutral-border bg-brand-primary",
  ].join(" ");

  const tips = useMemo<Array<{ icon: React.ReactNode; content: React.ReactNode }>>(
    () => [
      {
        icon: <Search />,
        content: (
          <>
            You can press <kbd className={kbdClass}>Ctrl</kbd>+<kbd className={kbdClass}>K</kbd> from anywhere to open
            instant search.
          </>
        ),
      },
      {
        icon: <Star />,
        content: (
          <>
            When you use the <ThumbsUp className="inline h-4 w-4" /> and <ThumbsDown className="inline h-4 w-4" /> buttons
            in AI chat, that feedback goes direct to your admins - it never leaves your environment.
          </>
        ),
      },
      {
        icon: <Star />,
        content: <>Markers stay square to match the brand&#39;s flat-surface visual language.</>,
      },
    ],
    [kbdClass]
  );

  const [tipIndex, setTipIndex] = useState(0);
  const count = tips.length;

  // Auto-advance; manual navigation resets the timer via the tipIndex dep.
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % count);
    }, 4000);
    return () => clearInterval(interval);
  }, [count, tipIndex]);

  return (
    <div
      className={[
        "group flex w-[480px] flex-col gap-4 border border-neutral-border bg-default-background px-6 py-4 text-caption-bold",
        isDarkTheme ? "text-brand-500" : "text-black",
      ].join(" ")}
    >
      <span className="text-heading-3 font-heading-3 text-default-font">Did you know?</span>

      <div className="my-2 grid w-full">
        {tips.map((tip, index) => (
          <div
            key={index}
            aria-hidden={index !== tipIndex}
            className={[
              "col-start-1 row-start-1 flex w-full items-center gap-3 transition-opacity duration-500",
              index === tipIndex ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
          >
            <span className="text-heading-2 pr-3">{tip.icon}</span>
            <div>{tip.content}</div>
          </div>
        ))}
      </div>

      <CarouselControl
        count={count}
        index={tipIndex}
        onPrevious={() => setTipIndex((prev) => (prev - 1 + count) % count)}
        onNext={() => setTipIndex((prev) => (prev + 1) % count)}
        onSelect={setTipIndex}
        itemLabel="tip"
        className="opacity-60 transition-opacity group-hover:opacity-100"
      />
    </div>
  );
}

/**
 * In use inside a rotating "Did you know?" tip box. All tips are stacked in one
 * grid cell so the box sizes to the tallest tip (no layout shift), and the
 * control sits subtly at the bottom - brightening on hover.
 */
export const InTipBox: Story = {
  render: () => <TipBox />,
};
