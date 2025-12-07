"use client";

import type { ReactNode } from "react";
import { ApiQueryProvider } from "@repo/api";

export function Providers({ children }: { children: ReactNode }) {
  return <ApiQueryProvider>{children}</ApiQueryProvider>;
}
