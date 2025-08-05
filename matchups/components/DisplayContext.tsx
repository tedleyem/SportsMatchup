// components/DisplayContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DisplayContextValue {
  showApi: boolean;
  toggleApi: () => void;
}

const DisplayContext = createContext<DisplayContextValue | undefined>(
  undefined
);

export function DisplayProvider({ children }: { children: ReactNode }) {
  const [showApi, setShowApi] = useState(false);
  const toggleApi = () => setShowApi((prev) => !prev);

  return (
    <DisplayContext.Provider value={{ showApi, toggleApi }}>
      {children}
    </DisplayContext.Provider>
  );
}

export function useDisplay() {
  const ctx = useContext(DisplayContext);
  if (!ctx) throw new Error("useDisplay must be inside DisplayProvider");
  return ctx;
}
