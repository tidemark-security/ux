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
        "flex max-h-[90vh] min-w-[320px] flex-col items-start gap-2 overflow-auto rounded-md border border-solid border-neutral-border bg-default-background shadow-lg",
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  ) : null;
});

interface DialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  modal?: boolean;
}

const DialogRoot = React.forwardRef<HTMLDivElement, DialogRootProps>(function DialogRoot(
  { children, className, open, onOpenChange, modal = true, ...otherProps },
  ref,
) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const contentRef = useCallback(
    (node: HTMLDivElement | null) => {
      setPortalContainer(node);

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange} modal={modal}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay asChild>
          <div
            className={cn(
              "fixed inset-0 z-[var(--z-modal-backdrop)] flex h-full w-full flex-col items-center justify-center gap-2 bg-[#00000099]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              className,
            )}
            {...otherProps}
          >
            <RadixDialog.Content asChild>
              <div
                className={cn(
                  "z-[var(--z-modal)]",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                )}
                ref={contentRef}
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

export const Dialog = Object.assign(DialogRoot, {
  Content,
  Close,
  Trigger,
  Title,
  Description,
});