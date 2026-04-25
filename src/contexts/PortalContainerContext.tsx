"use client";

/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useRef, type RefObject } from "react";

interface PortalContainerContextValue {
  container: HTMLElement | null;
}

const PortalContainerContext = createContext<PortalContainerContextValue>({
  container: null,
});

interface PortalContainerProviderProps {
  container: HTMLElement | null;
  children: React.ReactNode;
}

export function PortalContainerProvider({
  container,
  children,
}: PortalContainerProviderProps) {
  return (
    <PortalContainerContext.Provider value={{ container }}>
      {children}
    </PortalContainerContext.Provider>
  );
}

export function usePortalContainer(): HTMLElement | null {
  const { container } = useContext(PortalContainerContext);
  return container;
}

export function usePortalContainerRef(): RefObject<HTMLDivElement | null> {
  return useRef<HTMLDivElement | null>(null);
}

export { PortalContainerContext };