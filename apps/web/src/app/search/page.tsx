"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@repo/ui";
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
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 rounded-md border-2 border-slate-200 px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        {query && (
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="w-64 flex-shrink-0">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-slate-900">Filters</h2>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
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
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange("brand", e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
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
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Price Range</label>
                  <div className="mb-2 flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
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
            <main className="flex-1">
              {isLoading && (
                <div className="py-16 text-center text-slate-500">
                  Searching...
                </div>
              )}

              {data && (
                <>
                  <div className="mb-4 text-slate-600">
                    Found {data.found} products for "{query}"
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
                    {data.hits.map((product: any) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="text-inherit no-underline"
                      >
                        <ProductCard product={product} />
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {!query && (
                <div className="py-16 text-center text-slate-500">
                  Enter a search query to find products
                </div>
              )}
            </main>
          </div>
        )}

        {!query && (
          <div className="py-16 text-center text-slate-500">
            Enter a search query to find products
          </div>
        )}
      </div>
    </div>
  );
}
