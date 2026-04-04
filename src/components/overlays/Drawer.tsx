"use client";

import React, { useCallback, useState } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

import { PortalContainerProvider } from "../../contexts/PortalContainerContext";
import { cn } from "../../utils/cn";

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>(function Content(
  { children, className, ...otherProps },
  ref,
) {
  return children ? (
    <div
      className={cn(
        "flex h-full min-w-[320px] flex-col items-start gap-2 border-l border-solid border-neutral-border bg-default-background",
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  ) : null;
});

interface DrawerRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  modal?: boolean;
}

const DrawerRoot = React.forwardRef<HTMLDivElement, DrawerRootProps>(function DrawerRoot(
  { children, className, open, onOpenChange, modal = true, ...otherProps },
  ref,
) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const overlayRef = useCallback((node: HTMLDivElement | null) => {
    setPortalContainer(node);
  }, []);

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange} modal={modal}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay asChild>
          <div
            className={cn(
              "fixed inset-0 z-[var(--z-modal-backdrop)] flex h-full w-full flex-col items-end justify-center gap-2 bg-[#00000066]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              className,
            )}
            ref={overlayRef}
            {...otherProps}
          >
            <RadixDialog.Content asChild>
              <div
                className={cn(
                  "z-[var(--z-modal)] h-full",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
                )}
                ref={ref}
              >
                <PortalContainerProvider container={portalContainer}>{children}</PortalContainerProvider>
              </div>
            </RadixDialog.Content>
          </div>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
});

const Close = RadixDialog.Close;
const Trigger = RadixDialog.Trigger;
const Title = RadixDialog.Title;
const Description = RadixDialog.Description;

export const Drawer = Object.assign(DrawerRoot, {
  Content,
  Close,
  Trigger,
  Title,
  Description,
});