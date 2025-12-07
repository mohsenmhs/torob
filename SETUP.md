# Setup Checklist

## ✅ Completed Setup

- [x] Turborepo monorepo structure with pnpm workspaces
- [x] Next.js 15 app with App Router, Partial Prerendering (cacheComponents), Tailwind CSS
- [x] Expo SDK 52 app with Expo Router v3, NativeWind
- [x] Shared UI package with Tamagui components
- [x] Shared config package (Tailwind)
- [x] Typesense client package with TanStack Query hooks
- [x] ProductCard component (works on web & mobile)
- [x] Home pages (web with RSC, mobile with Expo Router)
- [x] Product detail pages (web with Partial Prerendering via cacheComponents, mobile)
- [x] Search page (web) with Typesense integration
- [x] Dark mode support
- [x] TypeScript strict mode
- [x] ESLint + Prettier + Husky configured

## 🚀 Next Steps

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up Husky (if not already done):**

   ```bash
   pnpm prepare
   ```

3. **Create environment files:**
   - Copy `.env.example` to `apps/web/.env.local`
   - Copy `.env.example` to `apps/mobile/.env.local`
   - Update Typesense connection details

4. **Add Expo assets:**
   - Add `icon.png` (1024x1024) to `apps/mobile/assets/`
   - Add `splash.png` (2048x2048) to `apps/mobile/assets/`
   - Add `adaptive-icon.png` (1024x1024) to `apps/mobile/assets/`
   - Add `favicon.png` (48x48) to `apps/mobile/assets/`

5. **Start development:**
   ```bash
   pnpm dev
   ```

## 📝 Notes

- The ProductCard component uses Tamagui and works on both platforms
- Web uses Next.js Image optimization (can be added to ProductCard later)
- Mobile uses Expo Router file-based routing
- All styling uses Tailwind classes that work on both platforms via NativeWind
- Typesense hooks are ready but require a running Typesense instance
- Mock data is used for demonstration - replace with real API calls

## 🔧 Troubleshooting

### Metro bundler cache issues

```bash
cd apps/mobile
rm -rf .expo node_modules
pnpm install
```

### Next.js build cache issues

```bash
cd apps/web
rm -rf .next node_modules
pnpm install
```

### Type errors

```bash
pnpm type-check
```

### Missing dependencies

```bash
pnpm install
```
