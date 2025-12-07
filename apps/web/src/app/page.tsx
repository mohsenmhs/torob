"use client";

import dynamic from "next/dynamic";

// Dynamically import the component with API hooks to ensure it only loads on client-side
// This prevents SSR issues with React Query hooks
const SearchContentClient = dynamic(
  () => import("./SearchContentClient").then((mod) => ({ default: mod.SearchContentClient })),
  {
    ssr: false, // Disable server-side rendering for this component
    loading: () => (
      <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "2rem", marginBottom: "3rem" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#111827", marginBottom: "1rem", textAlign: "center" }}>
              Torob
            </h1>
            <p style={{ fontSize: "1.25rem", color: "#6b7280", marginBottom: "3rem", textAlign: "center" }}>
              Find the best prices and compare products
            </p>
          </div>
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  return <SearchContentClient />;
}
