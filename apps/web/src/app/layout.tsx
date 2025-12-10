import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";
import { TopNav } from "../components/TopNav";
import { AppFooter } from "../components/AppFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bozoro - Price Comparison & Shopping Search",
  description: "Compare the price of millions of product between thousands of vendors",
  keywords: ["price comparison", "shopping", "search", "products"],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-slate-100`}>
        <Providers>
          <Suspense fallback={null}>
            <TopNav />
          </Suspense>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}
