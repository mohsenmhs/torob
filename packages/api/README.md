# API Client Package

This package contains auto-generated React Query hooks and TypeScript types from the Torob API Swagger schema.

## Setup

### Environment Variables

Create `.env.local` files in your apps with the following variables:

**For Web (`apps/web/.env.local`):**
```env
NEXT_PUBLIC_API_BASE_URL=https://torob.kolahghermezi.link/
NEXT_PUBLIC_CF_ACCESS_CLIENT_ID=ce378788f2805b6c9fa6cc5899bfecc6.access
NEXT_PUBLIC_CF_ACCESS_CLIENT_SECRET=e07ca4bd298fff16a986ed0138fc972bf7b34beeb5eebc8ba102292d297aabe9
```

**For Mobile (`apps/mobile/.env.local` or use Expo config):**
```env
EXPO_PUBLIC_API_BASE_URL=https://torob.kolahghermezi.link/
EXPO_PUBLIC_CF_ACCESS_CLIENT_ID=ce378788f2805b6c9fa6cc5899bfecc6.access
EXPO_PUBLIC_CF_ACCESS_CLIENT_SECRET=e07ca4bd298fff16a986ed0138fc972bf7b34beeb5eebc8ba102292d297aabe9
```

**For Server-side (root `.env.local`):**
```env
TC_MAIN_SERVER__CF_ID=ce378788f2805b6c9fa6cc5899bfecc6.access
TC_MAIN_SERVER__CF_TOKEN=e07ca4bd298fff16a986ed0138fc972bf7b34beeb5eebc8ba102292d297aabe9
API_BASE_URL=https://torob.kolahghermezi.link/
```

## Usage

### Generate/Update API Client

```bash
# Update schema and regenerate hooks
pnpm update-api-schema

# Or just regenerate from existing schema
pnpm generate:api
```

### Using Generated Hooks

```typescript
import { useSearchSearchRetrieve } from "@repo/api";

function SearchResults() {
  const { data, isLoading, error } = useSearchSearchRetrieve({
    q: "laptop",
    page: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.results.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## Available Hooks

The generated hooks are organized by API tags. Check the generated files in `src/search/` and `src/api/` for all available hooks.

Common hooks:
- `useSearchSearchRetrieve` - Search for products
- `useSearchSearchSuggestionRetrieve` - Get search suggestions
- `useApiProductsRetrieve` - Get product details
- And more...

## Files

- `src/mutator/axios-instance.ts` - Axios instance with Cloudflare Access authentication
- `src/search/search.ts` - Search-related hooks
- `src/api/api.ts` - Other API hooks
- `src/models/` - TypeScript types and interfaces
- `openapi.json` - Current API schema (downloaded from server)

