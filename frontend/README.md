# EvoForge Revenue AI OS — Access Portal

React + TypeScript port of `login_page.html`, restyled with the design tokens
and typography from `user_ui.html` (the SalesIntel Command Center) so the portal
and the app read as one product. The architecture follows the
**SalesIntel Implementation Plan** (frontend scope only).

> Scope of this build: **login page only**, **frontend only**, mock data layer.
> No backend is included — the service layer resolves against an in-memory mock,
> but its call shape matches the planned FastAPI endpoints, so swapping in a real
> backend is a one-line change (`VITE_USE_MOCK_API=0`).

## Stack

- **Vite + React 18 + TypeScript** (replaces the Tailwind CDN single-file mockup)
- **Tailwind CSS** (local install, tree-shaken) with tokens ported from `user_ui.html`
- **React Router** (HTML5 History API) for routing + Back/Forward behavior
- **Zustand** for restorable UI state
- **TanStack React Query** for the data/mutation layer

## Getting started

```bash
npm install
cp .env.example .env      # mock API is on by default (VITE_USE_MOCK_API=1)
npm run dev               # http://localhost:5173
```

Other scripts:

```bash
npm run build       # tsc -b && vite build  → static assets in dist/
npm run preview     # serve the production build
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
```

### Demo credentials

| Scope                | Username | Password | Lands on            |
| -------------------- | -------- | -------- | ------------------- |
| RevOps Admin         | `admin`  | `admin`  | `/portal/admin`     |
| Operational Terminal | `user`   | `user`   | `/portal/operator`  |

## Folder structure (feature-first, per plan Requirement 2)

```
src/
├─ app/                      # shell, providers, router, layout
│  ├─ App.tsx
│  ├─ router.tsx             # route tree + history config
│  ├─ providers.tsx          # React Query client
│  └─ layout/                # AppLayout, SiteHeader, SiteFooter
├─ features/                 # one folder per domain feature
│  ├─ auth/                  # AuthModal, SignInForm, useLogin
│  ├─ landing/               # ported landing sections (Hero, Persona, …)
│  └─ portal/                # post-login destinations + RequireRole guard
├─ services/                 # typed API client layer (never touches a DB)
│  ├─ http.ts
│  └─ auth.api.ts
├─ store/                    # Zustand stores (auth/session, restorable UI)
├─ hooks/                    # useRestorableState, useScrollReveal
├─ lib/                      # pure utils (history serialization)
├─ config/                   # env access + route constants
├─ types/                    # shared TS types / DTOs
└─ styles/                   # tailwind entry + ported global CSS
```

## How the plan maps to this code

| Plan requirement | Where it lives |
| --- | --- |
| **R1** — React/TS port, local Tailwind, imperative JS → React | whole `src/`; `openAuthModal`/`switchCapabilityTab`/`triggerAuthWithFields` became Zustand state; `IntersectionObserver` → `useScrollReveal` |
| **R2** — enterprise folder structure | layout above |
| **R3** — per-element state, explicit loading/error | `SignInForm` renders an explicit error branch; each element reads its own store slice |
| **R4** — routing + Back restores prior in-app state | `router.tsx` (History API) + `useRestorableState` (writes the UI slice into `history.state` + `sessionStorage` per entry, rehydrates on `popstate`) |
| **R5** — updates flow frontend → service → backend, no garbage fallback | `services/http.ts` + `services/auth.api.ts`; `useLogin` surfaces a typed error instead of a placeholder session |
| **R6** — RBAC scope | `useLogin` routes by role; `RequireRole` guards portal routes (server enforces the real check in a full deployment) |

## What's intentionally out of scope

- The FastAPI + PostgreSQL backend, tool layer, and `tool_execution` audit table
  (described in plan R5/R6) are **not** implemented here — only the frontend
  contract they expose.
- The SalesIntel Command Center workspace (`user_ui.html`, four views + agent
  rail) is stubbed by `PortalView`; only its design tokens were borrowed.
