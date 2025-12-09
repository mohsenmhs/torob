"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchBox } from "@repo/ui/search";
import type { Suggestion } from "@repo/api";

const categories = ["Phones", "Laptops", "Clothing", "Cars", "Health"];

export function TopNav() {
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === "/";
    const formRef = useRef<HTMLFormElement | null>(null);

    const {
        value,
        setValue,
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

    // Close suggestions on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (showSuggestions && formRef.current && !formRef.current.contains(target)) {
                setValue("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showSuggestions, setValue]);

    return (
        <div className="border-b border-slate-200 bg-slate-100 px-6 py-2">

            {!isHome && (
                <div className="mx-auto py-2 flex max-w-6xl items-center justify-start gap-4">
                    <div className="flex-1 flex items-center gap-4">
                        <a href="/" className="text-2xl font-bold text-rose-500">Bozoro</a>
                        <form
                            ref={formRef}
                            onSubmit={(e) => {
                                handleSubmit(e);
                                setTimeout(() => {
                                    // rely on hook state to hide suggestions after navigation
                                }, 0);
                            }}
                            className="relative flex-1 max-w-xl"
                        >
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full rounded-md border border-slate-300 px-11 py-2.5 text-sm text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                style={{
                                    backgroundImage:
                                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M21 21l-4.35-4.35m1.1-3.9a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z'/%3E%3C/svg%3E\")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "12px center",
                                    backgroundSize: "18px 18px",
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && value.trim().length >= minCharsSearch) {
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            {showSuggestions && (
                                <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-80 overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg">
                                    {isLoadingSuggestions ? (
                                        <div className="px-4 py-3 text-sm text-slate-500">Loading suggestions...</div>
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
                        </form>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-rose-500 hover:bg-slate-50"
                        >
                            Login / Register
                        </button>
                    </div>
                </div>
            )}
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
                <nav className="flex flex-wrap gap-6 text-sm text-slate-600">
                    {categories.map((cat) => (
                        <a key={cat} href="#" className="py-1 text-slate-600 no-underline hover:text-slate-800">
                            {cat}
                        </a>
                    ))}
                </nav>
                {
                    isHome ? (
                        <button
                            type="button"
                            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-rose-500 hover:bg-slate-50"
                        >
                            Login / Register
                        </button>
                    ) : null
                }
            </div>
        </div>
    );
}

