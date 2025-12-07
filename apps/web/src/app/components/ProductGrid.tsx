// Import web version directly to avoid Tamagui in Server Components
// Using direct path since Next.js webpack should resolve .web.tsx
import { ProductCard } from "@repo/ui/src/components/ProductCard.web";
import Link from "next/link";

export async function ProductGrid() {
  // In a real app, this would fetch from an API route or server action
  // For now, we'll use mock data to demonstrate the structure
  const mockProducts = Array.from({ length: 12 }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Product ${i + 1}`,
    description: `This is a great product ${i + 1} with amazing features`,
    price: Math.floor(Math.random() * 1000) + 10,
    originalPrice: Math.floor(Math.random() * 1200) + 100,
    image: `https://picsum.photos/400/300?random=${i + 1}`,
    rating: Math.random() * 2 + 3,
    category: "Electronics",
    brand: "Brand",
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="block"
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}

