import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { GroceryCartProvider } from "@/app/context/GroceryCartContext";
import Header from "@/app/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D2mart — Groceries & Essentials in Minutes",
  description: "Order groceries, snacks, and daily essentials delivered in under 10 minutes.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen bg-[#f0f0f5]">
        <GroceryCartProvider>
          <Header />
          <main>{children}</main>
        </GroceryCartProvider>
      </body>
    </html>
  );
}
