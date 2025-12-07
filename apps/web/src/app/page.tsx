"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "4rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#111827", marginBottom: "1rem", textAlign: "center" }}>
          Torob
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#6b7280", marginBottom: "3rem", textAlign: "center" }}>
          Find the best prices and compare products
        </p>
        <form onSubmit={handleSearch} style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", maxWidth: "600px", margin: "0 auto" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              style={{
                flex: 1,
                padding: "1rem 1.5rem",
                fontSize: "1rem",
                border: "2px solid #e5e7eb",
                borderRadius: "0.5rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
