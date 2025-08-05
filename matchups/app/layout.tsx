import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google"; // Use @next/font/google
import type { PropsWithChildren } from "react";
import { siteConfig } from "../config";
import { AppShell } from "../components/AppShell";
import "./globals.css";

// Configure Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
  style: "normal",
});

// Configure Fira Code
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = siteConfig;
export const viewport: Viewport = {
  themeColor: "#030014",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`bg-[#030014] overflow-y-scroll overflow-x-hidden min-h-screen flex flex-col ${inter.variable} ${firaCode.variable}`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
