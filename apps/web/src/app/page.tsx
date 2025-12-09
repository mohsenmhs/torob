"use client";

import dynamic from "next/dynamic";

// Dynamically import the component with API hooks to ensure it only loads on client-side
// This prevents SSR issues with React Query hooks
const SearchContentClient = dynamic(
  () => import("./SearchContentClient").then((mod) => ({ default: mod.SearchContentClient })),
  {
    ssr: false, // Disable server-side rendering for this component
    loading: () => (
      <></>
    ),
  }
);

export default function HomePage() {
  return <SearchContentClient />;
}
