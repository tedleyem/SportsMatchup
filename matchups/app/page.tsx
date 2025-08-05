"use client";

import { Navbar } from "../components/main/navbar";

import { Versus } from "../components/main/versus";

export default function Home() {
  return (
    <div className="flex flex-col justify-center content-center gap-20">
      <Versus />
    </div>
  );
}
