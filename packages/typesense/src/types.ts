export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  category?: string;
  brand?: string;
  url?: string;
  merchant?: string;
}

export interface SearchParams {
  q: string;
  query_by?: string;
  filter_by?: string;
  sort_by?: string;
  per_page?: number;
  page?: number;
}

export interface SearchResponse {
  hits: Product[];
  found: number;
  page: number;
  search_time_ms: number;
}

