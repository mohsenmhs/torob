import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal } from "react-native";
import { Link } from "expo-router";
import type { Product } from "@repo/typesense";

// Mock search function
function useMockSearch(query: string, filters: any) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setData(null);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockProducts = Array.from({ length: 20 }, (_, i) => ({
        id: `product-${i + 1}`,
        name: `${query} Product ${i + 1}`,
        description: `This is a great ${query} product ${i + 1} with amazing features`,
        price: Math.floor(Math.random() * 1000) + 10,
        originalPrice: Math.floor(Math.random() * 1200) + 100,
        image: `https://picsum.photos/400/300?random=${i + 1}`,
        rating: Math.random() * 2 + 3,
        category: filters.category || "Electronics",
        brand: filters.brand || "Brand",
      }));

      setData({
        hits: mockProducts,
        found: mockProducts.length,
      });
      setIsLoading(false);
    }, 500);
  }, [query, filters]);

  return { data, isLoading };
}

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string }>();
  const router = useRouter();
  const query = params.q || "";
  const [searchInput, setSearchInput] = useState(query);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "relevance",
  });

  const { data, isLoading } = useMockSearch(query, filters);

  const handleSearch = () => {
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"];
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {isLoading && (
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}

      {data && (
        <ScrollView style={styles.resultsContainer}>
          <Text style={styles.resultsCount}>
            Found {data.found} products for "{query}"
          </Text>
          <View style={styles.grid}>
            {data.hits.map((product: Product) => (
              <Link key={product.id} href={`/products/${product.id}`} asChild>
                <TouchableOpacity style={styles.card}>
                  {product.image && (
                    <Image source={{ uri: product.image }} style={styles.image} />
                  )}
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  {product.description && (
                    <Text style={styles.description} numberOfLines={2}>
                      {product.description}
                    </Text>
                  )}
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>${product.price.toLocaleString()}</Text>
                    {product.rating && (
                      <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </ScrollView>
      )}

      {!query && (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>Enter a search query to find products</Text>
        </View>
      )}

      {/* Filters Modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filtersContent}>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Category</Text>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.filterOption,
                      filters.category === cat && styles.filterOptionActive,
                    ]}
                    onPress={() => setFilters({ ...filters, category: cat })}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.category === cat && styles.filterOptionTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Brand</Text>
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    style={[
                      styles.filterOption,
                      filters.brand === brand && styles.filterOptionActive,
                    ]}
                    onPress={() => setFilters({ ...filters, brand: brand })}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.brand === brand && styles.filterOptionTextActive,
                      ]}
                    >
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Price Range</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChangeText={(text) => setFilters({ ...filters, minPrice: text })}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.priceInput}
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChangeText={(text) => setFilters({ ...filters, maxPrice: text })}
                  keyboardType="numeric"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  searchBar: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  filterButton: {
    backgroundColor: "#6b7280",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  filterButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#e5e7eb",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
  },
  rating: {
    fontSize: 14,
    color: "#4b5563",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  modalClose: {
    fontSize: 16,
    color: "#2563eb",
    fontWeight: "600",
  },
  filtersContent: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  filterOption: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  filterOptionActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#2563eb",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#374151",
  },
  filterOptionTextActive: {
    color: "#2563eb",
    fontWeight: "600",
  },
  priceInput: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 14,
  },
});

