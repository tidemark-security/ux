import { createTailwindMerge, getDefaultConfig } from "tailwind-merge";

const fontMixins = [
  "text-label",
  "text-label-bold",
  "text-body",
  "text-body-bold",
  "text-subheader",
  "text-section-header",
  "text-header",
  "text-monospace-body",
  "text-caption",
  "text-caption-bold",
  "text-heading-3",
  "text-heading-2",
  "text-heading-1",
];

const customTwMerge = createTailwindMerge(() => {
  const defaultConfig = getDefaultConfig();

  return {
    ...defaultConfig,
    classGroups: {
      ...defaultConfig.classGroups,
      "font-mixins": fontMixins,
    },
    conflictingClassGroups: {
      ...defaultConfig.conflictingClassGroups,
      "font-mixins": ["font-size", "leading", "font-weight"],
      "font-size": ["font-mixins"],
      leading: ["font-mixins"],
      "font-weight": ["font-mixins"],
    },
  };
});

export function cn(
  ...classes: (string | boolean | undefined | null | Record<string, boolean>)[]
): string {
  const result = classes
    .flatMap((classValue) => {
      if (!classValue) {
        return [];
      }

      if (typeof classValue === "string") {
        return classValue;
      }

      if (typeof classValue === "object") {
        return Object.entries(classValue)
          .filter(([, value]) => value)
          .map(([key]) => key);
      }

      return [];
    })
    .join(" ");

  return customTwMerge(result);
}