import { Suspense } from "react";
import { ProductDetail } from "./ProductDetail";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}

async function ProductPageContent({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <ProductDetail id={id} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<{
  title: string;
  description: string;
}> {
  const { id } = await params;
  // In a real app, fetch product data here
  return {
    title: `Product ${id} - Torob`,
    description: `View details for product ${id}`,
  };
}

