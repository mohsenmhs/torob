type ProductDetailData = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  image?: string | null;
  rating?: number;
  category?: string;
  brand?: string;
  merchant?: string;
  url?: string;
};

async function getProduct(id: string): Promise<ProductDetailData> {
  const endpoint = `https://torob.kolahghermezi.link/api/catalogue/product/${id}`;

  const res = await fetch(endpoint, {
    // Revalidate periodically to keep data reasonably fresh without blocking
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }

  const data = await res.json();

  return {
    id: String(data.id ?? id),
    name: data.name ?? data.title ?? `Product ${id}`,
    description: data.description ?? data.desc ?? undefined,
    price: data.price ?? data.min_price ?? data.price_min ?? undefined,
    originalPrice: data.originalPrice ?? data.max_price ?? data.price_max ?? undefined,
    image: data.image ?? data.main_image ?? data.image_url ?? null,
    rating: typeof data.rating === "number" ? data.rating : undefined,
    category: data.category ?? data.category_name ?? undefined,
    brand: data.brand ?? data.brand_name ?? undefined,
    merchant: data.merchant ?? data.seller ?? data.vendor ?? undefined,
    url: data.url ?? data.product_url ?? data.link ?? undefined,
  };
}

export async function ProductDetail({ id }: { id: string }) {
  const product = await getProduct(id);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}
              />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#111827" }}>
              {product.name}
            </h1>
            {product.description && (
              <p style={{ fontSize: "1rem", color: "#4b5563", lineHeight: "1.5" }}>
                {product.description}
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {product.price && (
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2563eb" }}>
                  ${product.price.toLocaleString()}
                </div>
              )}
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <div style={{ fontSize: "1.25rem", color: "#9ca3af", textDecoration: "line-through" }}>
                    ${product.originalPrice.toLocaleString()}
                  </div>
                )}
            </div>
            {product.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.25rem", color: "#eab308" }}>★</span>
                <span style={{ fontSize: "1rem", color: "#4b5563" }}>
                  {product.rating.toFixed(1)} / 5.0
                </span>
              </div>
            )}
            {product.brand && (
              <div>
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  Brand:{" "}
                </span>
                <span style={{ fontSize: "0.875rem", color: "#111827", fontWeight: "600" }}>
                  {product.brand}
                </span>
              </div>
            )}
            {product.category && (
              <div>
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  Category:{" "}
                </span>
                <span style={{ fontSize: "0.875rem", color: "#111827", fontWeight: "600" }}>
                  {product.category}
                </span>
              </div>
            )}
            {product.url && (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "background-color 0.2s",
                }}
                // onMouseEnter={(e) => {
                //   e.currentTarget.style.backgroundColor = "#1d4ed8";
                // }}
                // onMouseLeave={(e) => {
                //   e.currentTarget.style.backgroundColor = "#2563eb";
                // }}
              >
                View on {product.merchant || "Merchant"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
