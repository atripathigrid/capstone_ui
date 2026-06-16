# Architecture Notes

## Data flow (strict layering)

```
UI component → React Query hook → services/*.api.ts → HTTP (FastAPI) → service → tool → repository → DB
```

The frontend has **no** database client, connection string, or ORM. It only ever
calls typed functions in `services/`. On failure, the service layer throws a
normalized, typed error (`ApiError`) which the affected element renders as an
explicit error state — never a placeholder/garbage value.

With `VITE_USE_MOCK_API` unset/`1`, the service layer resolves against an
in-memory mock with the same call shape, so the UI runs with no backend.

## Routing & state restoration

- All navigation uses React Router over the HTML5 History API, so Back/Forward
  walk the in-app stack and only leave to an external page once it's exhausted.
- User-mutable UI state (auth modal open, active capability tab, form drafts) is
  held in a Zustand store and serialized per history entry into `history.state`
  (mirrored to `sessionStorage` for hard-refresh durability). On `popstate` the
  store is rehydrated before paint, so Back restores the user's last state rather
  than the default render.

## RBAC

`admin/admin` → `/portal/admin`; `user/user` → `/portal/operator`. `RequireRole`
guards the routes client-side; in a full deployment the backend remains the
source of truth for authorization.
