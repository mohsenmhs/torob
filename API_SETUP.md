# API Setup Guide

This project uses [Orval](https://orval.dev/) to generate React Query hooks from the Torob API Swagger schema.

## Quick Start

1. **Set up environment variables** (see below)

2. **Generate/Update API client:**
   ```bash
   pnpm update-api-schema
   ```

3. **Use generated hooks in your components:**
   ```typescript
   import { useSearchSearchRetrieve } from "@repo/api";

   function SearchResults() {
     const { data, isLoading, error } = useSearchSearchRetrieve({
       q: "laptop",
     });
     // ...
   }
   ```

## Environment Variables

### For Web App (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_BASE_URL=https://torob.kolahghermezi.link/
NEXT_PUBLIC_CF_ACCESS_CLIENT_ID=ce378788f2805b6c9fa6cc5899bfecc6.access
NEXT_PUBLIC_CF_ACCESS_CLIENT_SECRET=e07ca4bd298fff16a986ed0138fc972bf7b34beeb5eebc8ba102292d297aabe9
```

### For Mobile App (`apps/mobile/.env.local` or Expo config)

```env
EXPO_PUBLIC_API_BASE_URL=https://torob.kolahghermezi.link/
EXPO_PUBLIC_CF_ACCESS_CLIENT_ID=ce378788f2805b6c9fa6cc5899bfecc6.access
EXPO_PUBLIC_CF_ACCESS_CLIENT_SECRET=e07ca4bd298fff16a986ed0138fc972bf7b34beeb5eebc8ba102292d297aabe9
```

### For Server-side (root `.env.local`)

```env
TC_MAIN_SERVER__CF_ID=ce378788f2805b6c9fa6cc5899bfecc6.access
TC_MAIN_SERVER__CF_TOKEN=e07ca4bd298fff16a986ed0138fc972bf7b34beeb5eebc8ba102292d297aabe9
API_BASE_URL=https://torob.kolahghermezi.link/
```

## API Information

- **Base URL**: `https://torob.kolahghermezi.link/`
- **Swagger Docs**: `https://torob.kolahghermezi.link/api/docs/#/`
- **Schema Endpoint**: `https://torob.kolahghermezi.link/api/schema/?format=json`
- **Authentication**: Cloudflare Access (CF-Access-Client-Id, CF-Access-Client-Secret)

## Available Scripts

- `pnpm generate:api` - Regenerate hooks from existing `openapi.json`
- `pnpm update-api-schema` - Download latest schema and regenerate hooks

## Generated Files

- `packages/api/src/search/search.ts` - Search-related hooks
- `packages/api/src/api/api.ts` - Other API hooks (products, auth, etc.)
- `packages/api/src/models/` - TypeScript types and interfaces
- `packages/api/src/mutator/axios-instance.ts` - Axios instance with auth

## Example Usage

### Search Products

```typescript
import { useSearchSearchRetrieve } from "@repo/api";

function ProductSearch({ query }: { query: string }) {
  const { data, isLoading, error } = useSearchSearchRetrieve({
    q: query,
    page: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <p>Found {data?.count} products</p>
      {data?.results.map((product) => (
        <div key={product.slug}>{product.title}</div>
      ))}
    </div>
  );
}
```

### Infinite Scroll

```typescript
import { useSearchSearchRetrieveInfinite } from "@repo/api";

function InfiniteProductList({ query }: { query: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchSearchRetrieveInfinite(
    { q: query },
    {
      query: {
        getNextPageParam: (lastPage, allPages) => {
          // Implement pagination logic
          return allPages.length + 1;
        },
      },
    }
  );

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.results.map((product) => (
            <div key={product.slug}>{product.title}</div>
          ))}
        </div>
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
```

## Notes

- The generated hooks automatically include Cloudflare Access authentication headers
- All hooks are fully typed with TypeScript
- The API client works in both web (Next.js) and mobile (React Native) environments
- The `openapi.json` file is gitignored - regenerate it when the API schema changes

