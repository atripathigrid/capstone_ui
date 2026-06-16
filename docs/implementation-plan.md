# Implementation Plan — EvoForge Access Portal

This portal is the login/entry surface for the SalesIntel Revenue AI OS. It was
built by applying the SalesIntel Implementation Plan (frontend scope) to the
`login_page.html` mockup.

## Requirement → code mapping

| Plan requirement | Where it lives |
| --- | --- |
| **R1** — React/TS port, local Tailwind, imperative JS → React | `frontend/src/`; `openAuthModal` / `switchCapabilityTab` / `triggerAuthWithFields` became Zustand state; `IntersectionObserver` → `useScrollReveal` |
| **R2** — enterprise folder structure | feature-first `frontend/src/` (`app/`, `features/`, `services/`, `store/`, `hooks/`, `lib/`, `config/`, `types/`, `styles/`) |
| **R3** — per-element state, explicit loading/error | `SignInForm` renders an explicit error branch — no silent defaults |
| **R4** — routing + Back restores prior in-app state | `app/router.tsx` (History API) + `hooks/useRestorableState` (writes the UI slice into `history.state` + `sessionStorage` per entry, rehydrates on `popstate`) |
| **R5** — updates flow frontend → service → backend, no garbage fallback | `services/http.ts` + `services/auth.api.ts`; `useLogin` surfaces a typed error instead of a placeholder session |
| **R6** — RBAC scope | `useLogin` routes by role; `RequireRole` guards portal routes |

## Out of scope (documented, not implemented)

The plan's backend (FastAPI + PostgreSQL), mediated tool layer, `tool_execution`
audit table, and RBAC tables (`users`, `roles`, `permissions`, `opportunities`,
`user_opportunities`, `activities`, …) are part of the full system design but are
**not** built in this repo. Only the frontend contract they expose is present:
typed service functions whose shape matches the planned REST endpoints.

When a backend is added, point the frontend at it with:

```bash
# frontend/.env
VITE_API_BASE_URL=https://api.example.com/api/v1
VITE_USE_MOCK_API=0
```
