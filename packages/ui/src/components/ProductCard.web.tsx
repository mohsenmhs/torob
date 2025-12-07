import type { Product } from "@repo/typesense";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <div
      onClick={onPress}
      className="overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-800"
    >
      <div className="p-4">
        <div className="space-y-2">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex justify-between items-center">
          <div>
            {product.price && (
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${product.price.toLocaleString()}
              </h3>
            )}
            {product.originalPrice &&
              product.originalPrice > product.price && (
                <p className="text-gray-400 dark:text-gray-500 line-through text-xs">
                  ${product.originalPrice.toLocaleString()}
                </p>
              )}
          </div>
          {product.rating && (
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

