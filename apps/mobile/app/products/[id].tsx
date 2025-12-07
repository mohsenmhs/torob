import { useLocalSearchParams } from "expo-router";
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, StyleSheet } from "react-native";
import type { Product } from "@repo/typesense";

// Mock function - in a real app, this would fetch from your API
function getProduct(id: string): Product {
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

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProduct(id as string);

  const handlePress = () => {
    if (product.url) {
      Linking.openURL(product.url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          {product.image && (
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <Text style={styles.title}>{product.name}</Text>
          {product.description && (
            <Text style={styles.description}>{product.description}</Text>
          )}
          <View style={styles.priceContainer}>
            {product.price && (
              <Text style={styles.price}>${product.price.toLocaleString()}</Text>
            )}
            {product.originalPrice &&
              product.originalPrice > product.price && (
                <Text style={styles.originalPrice}>
                  ${product.originalPrice.toLocaleString()}
                </Text>
              )}
          </View>
          {product.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.ratingText}>
                {product.rating.toFixed(1)} / 5.0
              </Text>
            </View>
          )}
          {product.brand && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Brand: <Text style={styles.infoValue}>{product.brand}</Text>
              </Text>
            </View>
          )}
          {product.category && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Category: <Text style={styles.infoValue}>{product.category}</Text>
              </Text>
            </View>
          )}
          {product.url && (
            <TouchableOpacity onPress={handlePress} style={styles.button}>
              <Text style={styles.buttonText}>
                View on {product.merchant || "Merchant"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 256,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 16,
  },
  priceContainer: {
    marginBottom: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 20,
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  star: {
    fontSize: 20,
    color: "#eab308",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: "#4b5563",
  },
  infoRow: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  infoValue: {
    color: "#111827",
    fontWeight: "600",
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#2563eb",
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

