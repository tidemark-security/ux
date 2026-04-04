import { forwardRef } from "react";
import { Link as RouterLink, type LinkProps } from "react-router-dom";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ viewTransition = true, ...props }, ref) => {
    return <RouterLink ref={ref} viewTransition={viewTransition} {...props} />;
  },
);

Link.displayName = "Link";