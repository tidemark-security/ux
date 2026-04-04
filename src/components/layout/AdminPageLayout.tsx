import React from "react";
import { ArrowLeft } from "lucide-react";

import { IconButton } from "../buttons/IconButton";
import { Link } from "../navigation/Link";
import { DefaultPageLayout, type DefaultPageLayoutProps } from "./DefaultPageLayout";

export interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
  children: React.ReactNode;
  backTo?: string;
  backSlot?: React.ReactNode;
  layoutProps?: Omit<DefaultPageLayoutProps, "children" | "withContainer">;
}

export const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  actionButton,
  children,
  backTo = "/",
  backSlot,
  layoutProps,
}) => {
  return (
    <DefaultPageLayout withContainer {...layoutProps}>
      <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-12 mobile:px-4 mobile:py-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6">
          <div className="flex w-full flex-shrink-0 items-center justify-between">
            <div className="flex items-center gap-4">
              {backSlot ? (
                backSlot
              ) : (
                <Link to={backTo}>
                  <IconButton icon={<ArrowLeft />} />
                </Link>
              )}
              <div className="flex flex-col items-start gap-1">
                <span className="text-heading-1 font-heading-1 text-default-font">{title}</span>
                {subtitle ? <span className="text-body font-body text-subtext-color">{subtitle}</span> : null}
              </div>
            </div>
            {actionButton ? <div>{actionButton}</div> : null}
          </div>
          <div className="flex w-full flex-col items-start gap-6">{children}</div>
        </div>
      </div>
    </DefaultPageLayout>
  );
};