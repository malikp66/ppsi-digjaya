import type { Metadata } from "next";
import { Poppins, Noto_Serif_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const notoSerif = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "PPSI Digjaya | Digitalisasi Pencak Silat Jawa Barat",
  description:
    "Platform digital PPSI untuk budaya, pendidikan, dan pemberdayaan komunitas pencak silat Jawa Barat.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${poppins.variable} ${notoSerif.variable}`}>{children}</body>
    </html>
  );
}
