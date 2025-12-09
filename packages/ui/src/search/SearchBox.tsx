"use client";

import type { ReactNode } from "react";
import type { Suggestion } from "@repo/api";
import { useSearchBox } from "./useSearchBox";

type RenderProps = {
  value: string;
  setValue: (v: string) => void;
  showHint: boolean;
  suggestions: Suggestion[];
  isLoadingSuggestions: boolean;
  showSuggestions: boolean;
  handleSubmit: (e?: { preventDefault?: () => void }) => void;
  handleSuggestionSelect: (suggestion: Suggestion) => void;
  minCharsSearch: number;
};

type SearchBoxProps = {
  children: (props: RenderProps) => ReactNode;
  minCharsSearch?: number;
  minCharsSuggest?: number;
  debounceMs?: number;
  onSubmit?: (query: string) => void;
  onSelectSuggestion?: (query: string, suggestion: Suggestion) => void;
};

export function SearchBox(props: SearchBoxProps) {
  const box = useSearchBox({
    minCharsSearch: props.minCharsSearch,
    minCharsSuggest: props.minCharsSuggest,
    debounceMs: props.debounceMs,
    onSubmit: props.onSubmit,
    onSelectSuggestion: props.onSelectSuggestion,
  });

  return <>{props.children(box)}</>;
}

