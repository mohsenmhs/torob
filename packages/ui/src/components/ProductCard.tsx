import { Card, H3, Image, Paragraph, XStack, YStack } from "tamagui";
import type { Product } from "@repo/typesense";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Card
      elevate
      size="$4"
      bordered
      animation="bouncy"
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      {...(onPress ? { onPress } : {})}
      className="overflow-hidden bg-white dark:bg-gray-900 cursor-pointer"
    >
      <Card.Header padded>
        <YStack space="$2">
          {product.image && (
            <Image
              source={{ uri: product.image }}
              width="100%"
              height={200}
              resizeMode="cover"
              className="rounded-lg"
            />
          )}
          <H3 numberOfLines={2} className="text-gray-900 dark:text-white">
            {product.name}
          </H3>
          {product.description && (
            <Paragraph
              numberOfLines={2}
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              {product.description}
            </Paragraph>
          )}
        </YStack>
      </Card.Header>
      <Card.Footer padded>
        <XStack justifyContent="space-between" alignItems="center" width="100%">
          <YStack>
            {product.price && (
              <H3 className="text-blue-600 dark:text-blue-400">
                ${product.price.toLocaleString()}
              </H3>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <Paragraph
                className="text-gray-400 dark:text-gray-500 line-through text-xs"
              >
                ${product.originalPrice.toLocaleString()}
              </Paragraph>
            )}
          </YStack>
          {product.rating && (
            <XStack space="$1" alignItems="center">
              <Paragraph className="text-yellow-500">★</Paragraph>
              <Paragraph className="text-gray-600 dark:text-gray-400 text-sm">
                {product.rating.toFixed(1)}
              </Paragraph>
            </XStack>
          )}
        </XStack>
      </Card.Footer>
    </Card>
  );
}

