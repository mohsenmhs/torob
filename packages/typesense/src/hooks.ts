import { useQuery } from "@tanstack/react-query";
import { client } from "./client";
import type { Product, SearchParams, SearchResponse } from "./types";

const COLLECTION_NAME = "products";

export function useProductSearch(params: SearchParams) {
  return useQuery({
    queryKey: ["products", "search", params],
    queryFn: async (): Promise<SearchResponse> => {
      const searchParameters = {
        q: params.q,
        query_by: params.query_by || "name,description",
        filter_by: params.filter_by,
        sort_by: params.sort_by || "_text_match:desc,price:asc",
        per_page: params.per_page || 20,
        page: params.page || 1,
      };

      const results = await client
        .collections(COLLECTION_NAME)
        .documents()
        .search(searchParameters);

      return {
        hits: results.hits?.map((hit) => hit.document as Product) || [],
        found: results.found || 0,
        page: results.page || 1,
        search_time_ms: results.search_time_ms || 0,
      };
    },
    enabled: !!params.q && params.q.length > 0,
  });
}

export function useProducts(params?: Omit<SearchParams, "q">) {
  return useQuery({
    queryKey: ["products", "list", params],
    queryFn: async (): Promise<SearchResponse> => {
      const searchParameters = {
        q: "*",
        query_by: "name",
        filter_by: params?.filter_by,
        sort_by: params?.sort_by || "price:asc",
        per_page: params?.per_page || 20,
        page: params?.page || 1,
      };

      const results = await client
        .collections(COLLECTION_NAME)
        .documents()
        .search(searchParameters);

      return {
        hits: results.hits?.map((hit) => hit.document as Product) || [],
        found: results.found || 0,
        page: results.page || 1,
        search_time_ms: results.search_time_ms || 0,
      };
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async (): Promise<Product> => {
      const result = await client
        .collections(COLLECTION_NAME)
        .documents(id)
        .retrieve();
      return result as Product;
    },
    enabled: !!id,
  });
}

