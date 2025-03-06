"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Create a context to manage the mobile nav state
type MobileNavContextType = {
  isOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
};

const MobileNavContext = createContext<MobileNavContextType | undefined>(
  undefined,
);

// Hook to use the mobile nav context
export function useMobileNav() {
  const context = useContext(MobileNavContext);
  if (context === undefined) {
    throw new Error(
      "useMobileNav must be used within a MobileNavStateProvider",
    );
  }
  return context;
}

// Provider component that wraps the app
export function MobileNavStateProvider({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const openMobileNav = () => setMobileNavOpen(true);
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <MobileNavContext.Provider
      value={{
        isOpen: mobileNavOpen,
        openMobileNav,
        closeMobileNav,
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
}
