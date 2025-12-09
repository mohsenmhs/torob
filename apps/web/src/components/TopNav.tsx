"use client";

const categories = ["Phones", "Laptops", "Clothing", "Cars", "Health"];

export function TopNav() {
  return (
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
  );
}

