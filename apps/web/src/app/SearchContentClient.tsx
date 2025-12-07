"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchSearchRetrieve } from "@repo/api";
import Link from "next/link";
import type { ProductOutput } from "@repo/api";

export function SearchContentClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search query with 0.5 second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Check if we should show the hint
  const showHint = searchQuery.trim().length > 0 && searchQuery.trim().length < 3;

  // Fetch featured products (empty query or popular items)
  const { data: featuredData, isLoading: isLoadingFeatured } = useSearchSearchRetrieve(
    {
      page_size: 12,
    },
    {
      query: {
        enabled: !debouncedSearchQuery.trim(), // Only fetch when there's no search query
        refetchOnWindowFocus: false,
      } as any,
    }
  );

  // Fetch search results when user types (with debounce)
  const { data: searchData, isLoading: isLoadingSearch } = useSearchSearchRetrieve(
    {
      q: debouncedSearchQuery.trim(),
      page_size: 12,
    },
    {
      query: {
        enabled: debouncedSearchQuery.trim().length >= 3, // Only fetch when there's a search query with at least 3 characters
        refetchOnWindowFocus: false,
      } as any,
    }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 3) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const displayData = debouncedSearchQuery.trim().length >= 3 ? searchData : featuredData;
  const isLoading = debouncedSearchQuery.trim().length >= 3 ? isLoadingSearch : isLoadingFeatured;

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "2rem", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#111827", marginBottom: "1rem", textAlign: "center" }}>
            Torob
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#6b7280", marginBottom: "3rem", textAlign: "center" }}>
            Find the best prices and compare products
          </p>
          <form onSubmit={handleSearch} style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
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
                  disabled={searchQuery.trim().length < 3}
                  style={{
                    padding: "1rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    backgroundColor: searchQuery.trim().length >= 3 ? "#2563eb" : "#9ca3af",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: searchQuery.trim().length >= 3 ? "pointer" : "not-allowed",
                    opacity: searchQuery.trim().length >= 3 ? 1 : 0.6,
                  }}
                >
                  Search
                </button>
              </div>
              {showHint && (
                <p style={{ fontSize: "0.875rem", color: "#6b7280", textAlign: "center", margin: 0 }}>
                  Please enter at least 3 characters to search
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Search Results / Featured Products */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
            Loading products...
          </div>
        )}

        {!isLoading && displayData && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827", marginBottom: "1.5rem" }}>
              {debouncedSearchQuery.trim().length >= 3 ? `Search Results (${displayData.count} found)` : "Featured Products"}
            </h2>
            {displayData.results && displayData.results.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {displayData.results.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
                {debouncedSearchQuery.trim().length >= 3 ? "No products found. Try a different search term." : "No products available."}
              </div>
            )}
          </div>
        )}

        {!isLoading && !displayData && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
            Unable to load products. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
}

// Product Card Component for API ProductOutput
function ProductCard({ product }: { product: ProductOutput }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      style={{
        display: "block",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        padding: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        textDecoration: "none",
        color: "inherit",
        transition: "box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ marginBottom: "0.75rem" }}>
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "0.5rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </h3>
        {product.description && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: "0.75rem",
            }}
          >
            {product.description}
          </p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>
            ${product.min_price?.toLocaleString() || "N/A"}
          </div>
          {product.variations > 1 && (
            <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
              {product.variations} options
            </div>
          )}
        </div>
        {product.rating && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ color: "#eab308" }}>★</span>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      {product.is_available === false && (
        <div
          style={{
            marginTop: "0.75rem",
            padding: "0.25rem 0.5rem",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "0.25rem",
            fontSize: "0.75rem",
            display: "inline-block",
          }}
        >
          Out of Stock
        </div>
      )}
    </Link>
  );
}

