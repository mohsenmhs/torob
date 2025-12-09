import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import { useSearchBox } from "@repo/ui/search";

export default function HomeScreen() {
  const router = useRouter();
  const {
    value,
    setValue,
    showHint,
    suggestions,
    isLoadingSuggestions,
    showSuggestions,
    handleSubmit,
    handleSuggestionSelect,
    minCharsSearch,
  } = useSearchBox({
    onSubmit: (query: string) => router.push(`/search?q=${encodeURIComponent(query)}`),
    onSelectSuggestion: (query: string) => router.push(`/search?q=${encodeURIComponent(query)}`),
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bozoro</Text>
        <Text style={styles.subtitle}>Find the best prices and compare products</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={value}
          onChangeText={setValue}
          onSubmitEditing={() => handleSubmit()}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={[
            styles.searchButton,
            value.trim().length < minCharsSearch && styles.searchButtonDisabled,
          ]}
          onPress={() => handleSubmit()}
          disabled={value.trim().length < minCharsSearch}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        {showHint && (
          <Text style={styles.hint}>Please enter at least {minCharsSearch} characters to search</Text>
        )}
        {showSuggestions && (
          <View style={styles.suggestionBox}>
            {isLoadingSuggestions ? (
              <Text style={styles.suggestionLoading}>Loading suggestions...</Text>
            ) : (
              <FlatList
                data={suggestions}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    underlayColor="#f3f4f6"
                    onPress={() => handleSuggestionSelect(item)}
                  >
                    <Text style={styles.suggestionItem}>{item.text}</Text>
                  </TouchableHighlight>
                )}
                ItemSeparatorComponent={() => <View style={styles.suggestionDivider} />}
                keyboardShouldPersistTaps="handled"
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
  },
  searchContainer: {
    paddingHorizontal: 16,
    gap: 8,
    position: "relative",
  },
  searchInput: {
    backgroundColor: "#ffffff",
    padding: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonDisabled: {
    backgroundColor: "#9ca3af",
    opacity: 0.7,
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
  },
  suggestionBox: {
    marginTop: 4,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    maxHeight: 320,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111827",
  },
  suggestionDivider: {
    height: 1,
    backgroundColor: "#f3f4f6",
  },
  suggestionLoading: {
    padding: 12,
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});
