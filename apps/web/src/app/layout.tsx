import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";
import { TopNav } from "../components/TopNav";
import { AppFooter } from "../components/AppFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bozoro - Price Comparison & Shopping Search",
  description: "Compare the price of millions of product between thousands of vendors",
  keywords: ["price comparison", "shopping", "search", "products"],
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
          <TopNav />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}
