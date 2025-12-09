"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSearchSearchRetrieve } from "@repo/api";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const initialCategories = searchParams.getAll("category");
  const initialBrands = searchParams.getAll("brand");
  const [filters, setFilters] = useState({
    categories: initialCategories.length ? initialCategories : [],
    brands: initialBrands.length ? initialBrands : [],
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: searchParams.get("sortBy") || "relevance",
  });

  const parseNumber = (value: string) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  };

  const { data, isLoading, error } = useSearchSearchRetrieve(
    {
      q: query || undefined,
      category: filters.categories.length ? filters.categories : undefined,
      brand: filters.brands.length ? filters.brands : undefined,
      price_min: parseNumber(filters.minPrice),
      price_max: parseNumber(filters.maxPrice),
      page_size: 20,
    },
    {
      query: {
        enabled: !!query.trim(),
        refetchOnWindowFocus: false,
      } as any,
    }
  );

  const toggleValue = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const handleCategoryToggle = (value: string) => {
    setFilters((prev) => ({ ...prev, categories: toggleValue(prev.categories, value) }));
  };

  const handleBrandToggle = (value: string) => {
    setFilters((prev) => ({ ...prev, brands: toggleValue(prev.brands, value) }));
  };

  const handleFieldChange = (key: "minPrice" | "maxPrice" | "sortBy", value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    filters.categories.forEach((c) => params.append("category", c));
    filters.brands.forEach((b) => params.append("brand", b));
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    router.push(`/search?${params.toString()}`);
  };

  const categories = [];
  const brands = [];

  // Derive dynamic facets from API response
  const facetCategoryValues =
    (data?.facets as any)?.category?.values?.map((v: any) => v) ?? null;
  const facetBrandValues =
    (data?.facets as any)?.brand_attr?.values?.map((v: any) => v) ?? null;
  const priceFacet = (data?.facets as any)?.price;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 py-16 text-center text-slate-500">
          Loading...
        </div>
      }
    >
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl py-8">
          {query && (
            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <aside className="w-64 flex-shrink-0">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-xl font-bold text-slate-900">Filters</h2>

                  {/* Sort By */}
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFieldChange("sortBy", e.target.value)}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-semibold text-slate-700">Category</label>
                    <div className="flex flex-col gap-2 text-sm text-slate-700">
                      {(facetCategoryValues || categories).map((cat: any) => {
                        const label = typeof cat === "string" ? cat : cat.value;
                        const count = typeof cat === "string" ? undefined : cat.count;
                        const checked = filters.categories.includes(label);
                        return (
                          <label key={label} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleCategoryToggle(label)}
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>
                              {label}
                              {count !== undefined ? ` (${count})` : ""}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-semibold text-slate-700">Brand</label>
                    <div className="flex flex-col gap-2 text-sm text-slate-700">
                      {(facetBrandValues || brands).map((brand: any) => {
                        const label = typeof brand === "string" ? brand : brand.value;
                        const count = typeof brand === "string" ? undefined : brand.count;
                        const checked = filters.brands.includes(label);
                        return (
                          <label key={label} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleBrandToggle(label)}
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>
                              {label}
                              {count !== undefined ? ` (${count})` : ""}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Price Range</label>
                    {priceFacet && (
                      <div className="mb-2 text-xs text-slate-500">
                        {`Min: ${priceFacet.min ?? "N/A"}  Max: ${priceFacet.max ?? "N/A"}`}
                      </div>
                    )}
                    <div className="mb-2 flex flex-col gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => handleFieldChange("minPrice", e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => handleFieldChange("maxPrice", e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={applyFilters}
                    className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!query}
                  >
                    Apply
                  </button>
                </div>
              </aside>

              {/* Products Grid */}
              <main className="flex-1">
                {!!error && (
                  <div className="py-16 text-center text-red-500">
                    Failed to load results. Please try again.
                  </div>
                )}

                {isLoading && (
                  <div className="py-16 text-center text-slate-500">
                    Searching...
                  </div>
                )}

                {data && !error && (
                  <>
                    <div className="mb-4 text-slate-600">
                      Found {data.count} products for "{query}"
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
                      {data.results?.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          className="text-inherit no-underline"
                        >
                          <div className="h-full rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
                            <div className="mb-2 line-clamp-2 text-base font-semibold text-slate-900">
                              {product.title}
                            </div>
                            {product.description && (
                              <div className="mb-3 line-clamp-2 text-sm text-slate-600">
                                {product.description}
                              </div>
                            )}
                            <div className="text-lg font-bold text-blue-600">
                              {product.min_price ? `$${product.min_price.toLocaleString()}` : "N/A"}
                            </div>
                            {product.rating !== undefined && (
                              <div className="mt-1 text-sm text-amber-500">
                                ★ {product.rating.toFixed(1)}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
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
    </Suspense>
  );
}
