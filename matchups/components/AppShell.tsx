// components/AppShell.tsx
"use client";

import { useState } from "react";
import { Navbar } from "../components/main/navbar";
import { Footer } from "../components/main/footer";
// import { BasketballCanvas } from "../components/main/basketballBackground";
import ApiDisplay from "../components/sub/NbaApiDisplay";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [showApi, setShowApi] = useState(false);

  return (
    <>
      <Navbar showApi={showApi} setShowApi={setShowApi} />
      <main className="flex-grow mt-[65px] p-6">
        {showApi ? <ApiDisplay /> : children}
      </main>
      <Footer />
    </>

    );
};
