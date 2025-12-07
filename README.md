# Torob Monorepo

A production-ready monorepo for a Torob.com clone (price comparison + shopping search engine) built with the latest 2025 stack.

## Tech Stack

- **Monorepo**: Turborepo with pnpm workspaces
- **Web**: Next.js 15 (App Router) with React Server Components, Partial Prerendering (via cacheComponents), Tailwind CSS
- **Mobile**: Expo SDK 52 with Expo Router v3
- **UI**: Tamagui (100% shared components between web and mobile)
- **Styling**: NativeWind + Tailwind CSS (same className on web and mobile)
- **Navigation**: Solito for perfect navigation sharing
- **Data Fetching**: TanStack Query v5 + Typesense client
- **TypeScript**: Strict mode enabled
- **Code Quality**: ESLint + Prettier + Husky

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation

```bash
pnpm install
```

### Development

Start both web and mobile apps:

```bash
pnpm dev
```

This will start:

- Web app at `http://localhost:3000`
- Expo dev server (scan QR code with Expo Go app)

### Individual Apps

Start web only:

```bash
cd apps/web
pnpm dev
```

Start mobile only:

```bash
cd apps/mobile
pnpm dev
```

### Build

Build all apps:

```bash
pnpm build
```

### Linting

```bash
pnpm lint
```

### Type Checking

```bash
pnpm type-check
```

## Project Structure

```
torob/
├── apps/
│   ├── web/          # Next.js 15 app
│   └── mobile/       # Expo SDK 52 app
├── packages/
│   ├── ui/           # Shared Tamagui components
│   ├── config/       # Shared configs (Tailwind, etc.)
│   └── typesense/    # Typesense client & hooks
├── turbo.json        # Turborepo config
└── pnpm-workspace.yaml
```

## Features

- ✅ Product listing with infinite scroll
- ✅ Product detail pages with Partial Prerendering on web
- ✅ Search functionality (Typesense ready)
- ✅ Category filters
- ✅ Dark mode support
- ✅ Shared UI components (ProductCard)
- ✅ Perfect navigation sharing with Solito

## Environment Variables

Create `.env.local` files in `apps/web` and `apps/mobile`:

```env
NEXT_PUBLIC_TYPESENSE_HOST=localhost
NEXT_PUBLIC_TYPESENSE_PORT=8108
NEXT_PUBLIC_TYPESENSE_PROTOCOL=http
NEXT_PUBLIC_TYPESENSE_API_KEY=your-api-key
```

## License

Private
