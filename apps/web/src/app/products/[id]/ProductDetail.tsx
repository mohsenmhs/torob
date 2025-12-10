import type { Product } from "@repo/typesense";

async function getProduct(id: string): Promise<Product> {
  // In a real app, this would fetch from Typesense or your API
  // This is mock data for demonstration
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

  return {
    id,
    name: `Product ${id}`,
    description: `This is a detailed description of product ${id}. It has amazing features and great value for money.`,
    price: Math.floor(Math.random() * 1000) + 10,
    originalPrice: Math.floor(Math.random() * 1200) + 100,
    image: `https://picsum.photos/800/600?random=${id}`,
    rating: Math.random() * 2 + 3,
    category: "Electronics",
    brand: "Brand",
    merchant: "Merchant Name",
    url: "https://example.com",
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
