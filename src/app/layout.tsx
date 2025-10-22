import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MaintenancePage } from "@/components/maintenance/maintenance-page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PPSI Digjaya",
  description: "Situs resmi PPSI Digjaya",
};

const maintenanceEnabled =
  process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true" ||
  process.env.MAINTENANCE_MODE === "true";

const MAINTENANCE_DEADLINE = "2025-11-16T00:00:00+07:00";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {maintenanceEnabled ? (
          <MaintenancePage deadline={MAINTENANCE_DEADLINE} />
        ) : (
          children
        )}
      </body>
    </html>
  );
}
