# EvoForge Admin Console — React + TypeScript

A deployment-ready **React 18 + TypeScript (Vite)** port of the `admin_ui.html`
"Evolution Command Center" mockup. The UI is preserved **1:1** — same Tailwind
design tokens, fonts (Hanken Grotesk + Geist), `#050607` surface, and `#5ce0d0`
brand accent — and the architecture follows the SalesIntel implementation plan.

Everything lives under `ad_ui/`. Nothing references any prior project; this is a
fresh build.

```
ad_ui/
├─ frontend/          # the React + TypeScript application (this is what runs)
├─ README.md          # you are here
└─ docs/
   └─ backend-contract.md   # FastAPI + Postgres design (Requirements 5 & 6)
```

## Run it

```bash
cd ad_ui/frontend
npm install
npm run dev        # http://localhost:5173
```

Other scripts: `npm run build` (typecheck + prod bundle), `npm run preview`,
`npm run typecheck`. It ships in **mock mode** (`VITE_USE_MOCK_API=true`) so it
renders fully without a backend; flip the flag in `.env` and point
`VITE_API_BASE_URL` at the FastAPI service to go live.

## Folder structure (feature-first, per Requirement 2)

```
frontend/src/
├─ app/                     # shell, providers, router, layout
│  ├─ App.tsx  providers.tsx  router.tsx
│  └─ layout/  SideNav, MobileNav, MobileHeader, TopBarActions, AppShell
├─ features/                # one folder per domain view
│  ├─ dashboard/            # DashboardView + StatCard, LiveActivity, RecentEvolutions
│  ├─ registry/             # RegistryView + SkillList, tabs, overview/code/history/deps panels
│  ├─ workflows/            # WorkflowsView + WorkflowTable, WorkflowDetailAside
│  └─ guardrails/           # GuardrailsView + ThresholdSlider, ToggleRow
├─ components/              # shared primitives (Icon, ReloadButton, QueryState)
├─ hooks/                   # React Query hooks + useRestorableState + useSession
├─ services/               # typed API client layer (http.ts, api.ts) — never the DB
├─ store/                  # Zustand UI store (restorable slice)
├─ types/                  # shared TS DTO models
├─ config/                 # env access + route constants
└─ styles/                 # tailwind entry + ported global.css
```

## How the plan maps onto this code

| Plan requirement | Where it lives |
| --- | --- |
| **R1 — React/TS port, design 1:1** | `tailwind.config.ts` + `styles/global.css` are verbatim ports; every `.view-pane`/region became a component. Imperative `switchPage`/`loadSkillProfile`/`toggleRegistryTabs` became Router routes + Zustand state + React rendering. |
| **R2 — enterprise structure** | feature-first `src/` layout above; multi-stage `Dockerfile` + `nginx.conf`; `.env.example`; `infra/` compose. |
| **R3 — single-page handling logic** | `DashboardView` is a container that owns no fetching; each element binds to a field of the `dashboard/summary` query and renders explicit loading / error / empty / data states via `QueryState` (no silent defaults). |
| **R4a — per-element reload** | every element has its own React Query key (`hooks/queries.ts`); `ReloadButton` calls that query's `refetch()`, so one element reloading never remounts the others. |
| **R4b — Back returns to prior in-app location** | `BrowserRouter` (HTML5 History `pushState`); route + sub-state in the URL (`/registry/:skillId`, `/workflows/:workflowId`). Back pops the SPA stack and only exits externally when empty. |
| **R4c — restore the user's own changes** | `hooks/useRestorableState.ts` serializes the Zustand UI slice into `history.state` (mirrored to `sessionStorage`) on change, and rehydrates it **before paint** on `popstate`, keyed per route entry. |
| **R5 — frontend → backend → tool → DB** | the browser only calls `services/*` typed fetch wrappers; there is **no DB client in the bundle**. On failure `QueryState` shows an explicit error (never a garbage fallback) and offers retry. See `docs/backend-contract.md` for the tool-execution audit trail. |
| **R6 — RBAC** | `useSession()` resolves the authenticated user; every query is scoped to `session.id` (`useDashboardSummary(userId)`, `useSkillList(userId)`), so the client receives only what the user is mapped to. Table designs in `docs/backend-contract.md`. |

## UI fidelity notes

- The four views (Dashboard, Skill Registry, Workflows, Guardrails) and the
  mobile/desktop navigation match the original markup, classes, and animations.
- Mixed-color text fragments (e.g. the Candidates caption, the activity feed,
  the workflow timeline segments) are preserved exactly.
- The Registry **Eval Results** tab intentionally renders no panel — matching
  the original mockup, where that tab had no defined content.

See [`docs/backend-contract.md`](docs/backend-contract.md) for the FastAPI
routers, service/tool/repository layering, and the Postgres table designs that
Requirements 5 and 6 specify.
