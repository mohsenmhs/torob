"use client";

import { useRouter } from "next/navigation";
import { useSearchBox } from "@repo/ui/search";
import type { Suggestion } from "@repo/api";

export function SearchContentClient() {
  const router = useRouter();
  const categories = ["Phones", "Laptops", "Clothing", "Cars", "Health"];
  const {
    value,
    setValue,
    showHint,
    suggestions,
    isLoadingSuggestions,
    showSuggestions,
    handleSubmit,
    handleSuggestionSelect,
    minCharsSearch,
  } = useSearchBox({
    onSubmit: (query: string) => router.push(`/search?q=${encodeURIComponent(query)}`),
    onSelectSuggestion: (query: string) => router.push(`/search?q=${encodeURIComponent(query)}`),
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top nav */}
      <div className="border-b border-slate-200 bg-slate-100 px-6 py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-6 text-sm text-slate-600">
            {categories.map((cat) => (
              <a key={cat} href="#" className="py-1 text-slate-600 no-underline hover:text-slate-800">
                {cat}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-rose-500 hover:bg-slate-50"
          >
            Login / Register
          </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="mx-auto max-w-6xl -mt-40">
          <div className="mx-auto max-w-3xl pt-8 pb-8 text-center">
            <h1 className="mb-5 text-5xl font-bold text-rose-500">
              Bozoro
            </h1>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="mb-8"
            >
              <div className="relative mx-auto flex max-w-2xl flex-col gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search for products..."
                    className="w-[80%] rounded-md border border-slate-200 px-12 py-2 text-base text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M21 21l-4.35-4.35m1.1-3.9a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "12px center",
                      backgroundSize: "20px 20px",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && value.trim().length >= minCharsSearch) {
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>
                {showSuggestions && (
                  <div className="absolute w-[80%] left-[10%] right-0 top-full z-10 mt-1 max-h-80 overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg">
                    {isLoadingSuggestions ? (
                      <div className="px-4 py-3 text-sm text-slate-500">
                        Loading suggestions...
                      </div>
                    ) : (
                      suggestions.map((suggestion: Suggestion) => (
                        <button
                          key={suggestion.id}
                          type="button"
                          onClick={() => handleSuggestionSelect(suggestion)}
                          className="w-full border-b border-slate-100 px-4 py-3 text-left text-sm text-slate-900 hover:bg-slate-100"
                        >
                          {suggestion.text}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </form>

            <p className="text-base text-slate-600">
              Compare the price of millions of product between thousands of vendors
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-100 px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 text-sm text-slate-600">
          {[
            "Vendor Panel",
            "Register Vendor",
            "Download App",
            "Guide",
            "Support",
            "Terms of Use",
            "About Us",
          ].map((item) => (
            <a key={item} href="#" className="text-slate-600 no-underline hover:text-slate-800">
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

