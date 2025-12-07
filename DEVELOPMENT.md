# Development Guide

## Quick Start

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start development servers:**

   ```bash
   pnpm dev
   ```

   This starts both web (Next.js) and mobile (Expo) dev servers.

3. **Access the apps:**
   - Web: http://localhost:3000
   - Mobile: Scan QR code with Expo Go app

## Project Structure

```
torob/
├── apps/
│   ├── web/              # Next.js 15 app
│   │   ├── src/
│   │   │   └── app/      # App Router pages
│   │   └── package.json
│   └── mobile/           # Expo SDK 52 app
│       ├── app/          # Expo Router pages
│       └── package.json
├── packages/
│   ├── ui/               # Shared Tamagui components
│   │   └── src/
│   │       └── components/
│   ├── config/           # Shared configs
│   │   └── src/
│   └── typesense/        # Typesense client & hooks
│       └── src/
└── package.json          # Root workspace config
```

## Key Features

### Shared Components

- All UI components in `packages/ui` work on both web and mobile
- Uses Tamagui for cross-platform components
- NativeWind + Tailwind for styling (same className everywhere)

### Navigation

- Web: Next.js App Router
- Mobile: Expo Router v3
- Solito ready for navigation sharing

### Data Fetching

- TanStack Query v5 for client-side data fetching
- Typesense hooks ready in `@repo/typesense`
- Server Components on web for optimal performance

### Styling

- Tailwind CSS on web
- NativeWind on mobile (same Tailwind classes)
- Dark mode support out of the box

## Environment Setup

Create `.env.local` files:

**apps/web/.env.local:**

```env
NEXT_PUBLIC_TYPESENSE_HOST=localhost
NEXT_PUBLIC_TYPESENSE_PORT=8108
NEXT_PUBLIC_TYPESENSE_PROTOCOL=http
NEXT_PUBLIC_TYPESENSE_API_KEY=your-api-key
```

**apps/mobile/.env.local:**

```env
NEXT_PUBLIC_TYPESENSE_HOST=localhost
NEXT_PUBLIC_TYPESENSE_PORT=8108
NEXT_PUBLIC_TYPESENSE_PROTOCOL=http
NEXT_PUBLIC_TYPESENSE_API_KEY=your-api-key
```

## Building

```bash
# Build all apps
pnpm build

# Build individual app
cd apps/web && pnpm build
cd apps/mobile && pnpm build
```

## Code Quality

```bash
# Lint all packages
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

## Adding New Components

1. Create component in `packages/ui/src/components/`
2. Export from `packages/ui/src/index.ts`
3. Use in both web and mobile apps with `@repo/ui`

## Adding New Pages

### Web (Next.js)

- Add files in `apps/web/src/app/`
- Use React Server Components for data fetching
- Use Suspense for loading states

### Mobile (Expo)

- Add files in `apps/mobile/app/`
- Use Expo Router file-based routing
- Use TanStack Query for data fetching

## Troubleshooting

### Metro bundler issues

```bash
cd apps/mobile
rm -rf node_modules .expo
pnpm install
```

### Next.js build issues

```bash
cd apps/web
rm -rf .next node_modules
pnpm install
```

### Type errors

```bash
pnpm type-check
```
