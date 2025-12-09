import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { TopNav } from "../components/TopNav";
import { AppFooter } from "../components/AppFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Torob - Price Comparison & Shopping Search",
  description: "Find the best prices and compare products across multiple merchants",
  keywords: ["price comparison", "shopping", "search", "products"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <TopNav />
        <Providers>{children}</Providers>
        <AppFooter />
      </body>
    </html>
  );
}
