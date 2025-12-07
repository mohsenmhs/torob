"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@repo/ui/src/components/ProductCard.web";
import Link from "next/link";

// Mock search function - replace with actual Typesense hook
function useMockSearch(query: string, filters: any) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setData(null);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockProducts = Array.from({ length: 20 }, (_, i) => ({
        id: `product-${i + 1}`,
        name: `${query} Product ${i + 1}`,
        description: `This is a great ${query} product ${i + 1} with amazing features`,
        price: Math.floor(Math.random() * 1000) + 10,
        originalPrice: Math.floor(Math.random() * 1200) + 100,
        image: `https://picsum.photos/400/300?random=${i + 1}`,
        rating: Math.random() * 2 + 3,
        category: filters.category || "Electronics",
        brand: filters.brand || "Brand",
      }));

      setData({
        hits: mockProducts,
        found: mockProducts.length,
        page: 1,
        search_time_ms: 50,
      });
      setIsLoading(false);
    }, 500);
  }, [query, filters]);

  return { data, isLoading, error: null };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: searchParams.get("sortBy") || "relevance",
  });

  const { data, isLoading } = useMockSearch(query, filters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    router.push(`/search?${params.toString()}`);
  };

  const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"];
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for products..."
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                border: "2px solid #e5e7eb",
                borderRadius: "0.5rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.75rem 2rem",
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

        {query && (
          <div style={{ display: "flex", gap: "2rem" }}>
            {/* Filters Sidebar */}
            <aside style={{ width: "250px", flexShrink: 0 }}>
              <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#111827" }}>
                  Filters
                </h2>

                {/* Category Filter */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                    Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange("brand", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                    Price Range
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                      }}
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main style={{ flex: 1 }}>
              {isLoading && (
                <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
                  Searching...
                </div>
              )}

              {data && (
                <>
                  <div style={{ marginBottom: "1.5rem", color: "#6b7280" }}>
                    Found {data.found} products for "{query}"
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
                    {data.hits.map((product: any) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ProductCard product={product} />
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {!query && (
                <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
                  Enter a search query to find products
                </div>
              )}
            </main>
          </div>
        )}

        {!query && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
            Enter a search query to find products
          </div>
        )}
      </div>
    </div>
  );
}
