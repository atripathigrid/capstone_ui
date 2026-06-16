# EvoForge Revenue AI OS — Access Portal

Monorepo for the **EvoForge** access portal: a React + TypeScript port of the
`login_page.html` mockup, styled with the SalesIntel design system (`user_ui.html`
tokens + Hanken Grotesk / Geist) so the portal and the app read as one product.

The structure follows the **SalesIntel Implementation Plan** — three independently
deployable concerns living side by side.

## Layout

```
.
├─ frontend/   # Vite + React 18 + TypeScript app (the portal UI)
├─ docs/       # implementation plan, architecture notes, design decisions
└─ infra/      # docker-compose + CI pipeline for local/dev parity
```

## Quick start

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173 — runs mock-first, no .env needed
```

See [`frontend/README.md`](frontend/README.md) for app details, scripts, demo
credentials, and how the implementation plan maps to the code.

## Scope

- **Frontend only**, **login page only**, mock data layer. No backend is included
  yet — the service layer resolves against an in-memory mock, but its call shape
  matches the planned FastAPI endpoints, so a real backend is a one-line switch
  (`VITE_USE_MOCK_API=0`).
- The FastAPI + PostgreSQL backend, tool layer, and RBAC tables described in the
  plan are documented in [`docs/`](docs/) but not implemented here.
