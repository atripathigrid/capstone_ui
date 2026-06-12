# SalesIntel — Command Center (React + TypeScript)

The static `index.html` mockup rebuilt as a deployment-ready React + TypeScript
app, with the implementation plan applied. **The UI is preserved 1:1** — same
markup, same Tailwind tokens, same styles, same charts — now component-driven,
type-safe, and wired through a proper data/architecture layer.

> Built fresh with no carry-over code. Color tokens, the inline `<style>` block,
> the canvas chart maths, and every DOM region were ported verbatim into
> components.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc typecheck + production build (static assets in dist/)
npm run typecheck  # tsc --noEmit
```

The app runs **standalone**: `VITE_USE_MOCKS=true` (default) makes the typed
`services/*.api.ts` layer resolve mock payloads instead of issuing network
calls, so no backend is required to see the UI. Point `VITE_API_BASE_URL` at a
real FastAPI backend and set `VITE_USE_MOCKS=false` to go live.

## How the plan maps to the code

| Requirement | Where |
| --- | --- |
| **1 — React/TS port** | Vite + React 18 + TS. Tailwind tokens in [tailwind.config.ts](tailwind.config.ts), ported styles in [src/styles/global.css](src/styles/global.css), DOM regions → components under `src/app/layout` + `src/features`. Imperative `switchView`/`switchToDeal` → React Router; `filterUserDeals`/`insertPrompt` → Zustand state; `<canvas>` helpers → [useCanvasChart](src/hooks/useCanvasChart.ts). |
| **2 — Folder structure** | Feature-first `src/`: `app/` (shell, router, providers, layout), `features/` (dashboard, opportunities, activity, agent), `components/`, `hooks/`, `services/`, `store/`, `types/`, `lib/`, `config/`, `styles/`. |
| **3 — Dashboard logic** | [DashboardView](src/features/dashboard/DashboardView.tsx) is a layout-only container; each element owns its own React Query hook and renders explicit loading / error / empty / data via [ElementState](src/components/ElementState.tsx) — no silent defaults. |
| **4a — Per-element reload** | Per-element query keys + a [ReloadButton](src/components/ReloadButton.tsx) calling that query's `refetch()`. One element reloads without remounting the others. |
| **4b — Back walks in-app stack** | All navigation through React Router (HTML5 History API) — see [router.tsx](src/app/router.tsx). |
| **4c — Restore user changes** | [useRestorableState](src/hooks/useRestorableState.ts): the [UI store](src/store/uiStore.ts) slice (deal expansion, chat draft, scroll) is written into `history.state` per entry (mirrored to `sessionStorage`) and rehydrated **before paint** on Back/Forward. |
| **5 — frontend → backend → tool → DB** | Frontend only ever calls [services/*.api.ts](src/services) over the [typed http client](src/services/http.ts). No DB client/ORM/connection string in the bundle. Error branch surfaces typed failures with no garbage fallback. |
| **6 — RBAC / fetch only what's needed** | Queries are scoped to the session user id (from the [auth store](src/store/authStore.ts)); list endpoints return lightweight projections; full detail loads only on a `/opportunities/:opportunityId` route. |

## Backend (out of scope here)

This package is the **frontend**. The plan's `backend/` (FastAPI + SQLAlchemy +
Alembic, the mediated tool layer, the `tool_execution` audit table) and `infra/`
(docker-compose, CI) are the server side — the frontend is already written
against that contract: swap mocks for the real REST endpoints and nothing in the
UI changes.

## Source map

```
src/
├─ app/            App shell, router, providers, layout (SideNav, TopBar, AgentRail)
├─ features/       dashboard · opportunities (list + detail) · activity · agent
├─ components/     shared primitives (Icon, ElementState, ReloadButton)
├─ hooks/          useCanvasChart, useRestorableState
├─ services/       typed API client (http.ts + <domain>.api.ts) — never the DB
├─ store/          Zustand stores (auth/session, restorable UI)
├─ types/          shared API DTO models
├─ lib/            pure utils (charts, history serialization)
├─ config/         env access, route constants
└─ styles/         tailwind entry + ported global css
```
