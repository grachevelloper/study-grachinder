# Project: Grachinder

## Tech Stack
- React 19 + TypeScript
- Vite 7
- Ant Design 6
- TanStack Query
- i18next
- Session Storage for auth

## Project Structure
src/
├── entry/
├── pages/
├── components/
├── shared/
│ ├── config/
│ ├── hooks/
│ ├── providers/
│ ├── events/
│ ├── typings/
│ └── constants.ts
├── locales/
└── assets/

## Commands

```bash
pnpm dev          # Start Vite dev server
pnpm build        # TypeScript check + Vite production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix ESLint issues (with cache)
pnpm preview      # Preview production build locally
```

There are no tests — the project has no test suite.

## Architecture

**Entry point:** `src/main.tsx` → `src/entry/App.tsx` (providers) → `src/entry/routes.tsx` (routing)

**Provider order in App.tsx:** `ThemeProvider` → `QueryClientProvider` → `AuthProvider` → Routes

**Path aliases** (configured in both `tsconfig.app.json` and `vite.config.ts`):
- `~components/*`, `~pages/*`, `~shared/*`, `~locales/*`, `~assets/*`

**Key shared modules:**
- `shared/config/api.ts` — Axios instance with base URL `/api`, 3s timeout, automatic token refresh on 401
- `shared/config/i18n.ts` — i18next setup (Russian default, English supported)
- `shared/config/styles.ts` — Ant Design light/dark theme tokens (~470 lines, burgundy/gold color scheme)
- `shared/events/` — EventEmitter3-based events for auth and onboarding flows

**Responsive pattern:** The `Carousel` page renders `SiderUserInfo` (desktop sidebar) or `BottomSheetUserInfo` (mobile bottom sheet) depending on viewport.

**Authentication:** 401 responses trigger automatic token refresh via Axios interceptor in `shared/config/api.ts`. Auth state lives in `AuthProvider`.

**i18n namespaces:** `auth`, `carousel`, `common` — translations in `src/locales/en/` and `src/locales/ru/`.

## Environment

Copy `.env.example` to `.env`. The only variable is:
```
VITE_API_URL=localhost:3000
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on push to `main`/`develop` and on PRs to `main`: install → lint → tsc → build. Dist artifacts are uploaded for 7 days.