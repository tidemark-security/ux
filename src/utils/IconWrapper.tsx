import React from "react";

import { cn } from "./cn";

export const IconWrapper = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function IconWrapper({ className, ...otherProps }, ref) {
  return (
    <span ref={ref} className={cn("inline-flex flex-none items-center", className)} {...otherProps} />
  );
});

IconWrapper.displayName = "IconWrapper";