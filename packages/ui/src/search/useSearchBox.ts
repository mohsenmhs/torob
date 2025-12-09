"use client";

import { useEffect, useState } from "react";
import { useSearchSuggestionRetrieve } from "@repo/api";
import type { Suggestion } from "@repo/api";

type UseSearchBoxOptions = {
  minCharsSearch?: number;
  minCharsSuggest?: number;
  debounceMs?: number;
  onSubmit?: (query: string) => void;
  onSelectSuggestion?: (query: string, suggestion: Suggestion) => void;
};

export function useSearchBox({
  minCharsSearch = 2,
  minCharsSuggest = 2,
  debounceMs = 500,
  onSubmit,
  onSelectSuggestion,
}: UseSearchBoxOptions = {}) {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Debounce input value
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), debounceMs);
    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  const trimmedValue = value.trim();
  const trimmedDebounced = debouncedValue.trim();

  const showHint = trimmedValue.length > 0 && trimmedValue.length < minCharsSearch;

  const { data: suggestionData, isLoading: isLoadingSuggestions } = useSearchSuggestionRetrieve(
    { q: trimmedDebounced },
    {
      query: {
        enabled: trimmedDebounced.length >= minCharsSuggest,
        refetchOnWindowFocus: false,
      } as any,
    }
  );

  const suggestions = suggestionData?.results ?? [];
  const showSuggestions = suggestions.length > 0 && trimmedDebounced.length >= minCharsSuggest;

  const handleSubmit = (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    const next = trimmedValue;
    if (next.length >= minCharsSearch) {
      onSubmit?.(next);
    }
  };

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setValue(suggestion.text);
    onSelectSuggestion?.(suggestion.text, suggestion);
  };

  return {
    value,
    setValue,
    debouncedValue: trimmedDebounced,
    showHint,
    suggestions,
    isLoadingSuggestions,
    showSuggestions,
    handleSubmit,
    handleSuggestionSelect,
    minCharsSearch,
  };
}

