"use client";

const footerLinks = [
  "Vendor Panel",
  "Register Vendor",
  "Download App",
  "Guide",
  "Support",
  "Terms of Use",
  "About Us",
];

export function AppFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 px-6 py-4">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 text-sm text-slate-600">
        {footerLinks.map((item) => (
          <a key={item} href="#" className="text-slate-600 no-underline hover:text-slate-800">
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
}

