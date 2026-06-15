# Backend Contract — FastAPI + PostgreSQL (design)

This documents the server side the frontend is built against (Requirements 5 &
6). Per the implementation plan this is a **field/relationship design**, not
runnable migration code. The frontend already speaks this contract through
`src/services/api.ts`; standing up the backend is a drop-in replacement for mock
mode (`VITE_USE_MOCK_API=false`).

## Strict layering (enforced, not by convention)

```
React element
  → services/*.api.ts        (typed fetch — the ONLY data path; no DB client)
    → FastAPI router (api/v1) validates (Pydantic) + checks auth + RBAC
      → service                orchestrates tools + repositories
        → tools/               mediated, audited (stall-detector, thread-analyzer…)
        → repositories/        the ONLY layer holding a DB session
          → PostgreSQL
```

Frontend → DB directly is impossible: there is no connection string, ORM, or DB
client in the browser bundle.

## REST endpoints (api/v1)

| Method & path | Frontend caller | Notes |
| --- | --- | --- |
| `GET /auth/me` | `sessionApi.me` | session used to scope every other query |
| `GET /dashboard/summary?userId=` | `dashboardApi.summary` | KPI stats, live activity, recent evolutions |
| `GET /skills?userId=` | `registryApi.list` | RBAC-scoped lightweight projection |
| `GET /skills/{id}` | `registryApi.profile` | full detail, loaded only on demand |
| `GET /workflows` | `workflowsApi.list` | temporal workflow list |
| `GET /workflows/{id}` | `workflowsApi.detail` | timeline steps |
| `GET /guardrails` | `guardrailsApi.config` | thresholds, controls, NeMo rails |
| `POST /skills/{id}/approve` | (Approve Candidate) | transactional, idempotency-keyed write |
| `PUT /guardrails` | (Save Changes) | persists thresholds/controls |

## Tool mediation + failure history (Requirement 5)

Tools are never called inline from a route and never write the DB directly.
Each invocation is wrapped so a row is written to `tool_execution`
before/after run (payload, tool name + version, status, result ref, error,
timestamps, correlation id). On failure the service records the failed row,
**leaves the target record unchanged** (commit only on success), and returns a
typed error — which the frontend renders as the element's error state. No
placeholder/garbage value is ever substituted.

## Tables (fields & relationships)

- **users** — `id` (PK), `email`, `display_name`, `password_hash`/SSO ref,
  `is_active`, `created_at`.
- **roles** — `id` (PK), `name` (Admin, AE, Manager…), `description`.
- **permissions** — `id` (PK), `code` (`skill.read`, `skill.approve`,
  `guardrail.write`…), `description`.
- **role_permissions** — (`role_id` FK, `permission_id` FK) — M:N.
- **user_roles** — (`user_id` FK, `role_id` FK) — M:N.
- **skills** — `id`/`skill_id` (PK), `name`, `status`, `version`,
  `owner_id` (FK→users), `total_invocations`, `created_at`, `updated_at`.
- **skill_versions** — `id` (PK), `skill_id` FK, `version`, `status`,
  `method`, `performance`, `lift`, `ancestor`, `created_at`. (Backs the version
  history / journal.)
- **user_skills** — (`user_id` FK, `skill_id` FK, `access_level`) — the mapping
  that drives RBAC visibility. A user's registry list is derived from this join.
- **workflows** — `id` (PK), `type`, `status`, `skill_id` FK, `started_at`,
  `duration`. **workflow_steps** — `id`, `workflow_id` FK, ordered timeline.
- **guardrail_config** — singleton/versioned thresholds + controls;
  **nemo_rails** — `id`, `name`, `type`, `domain`, `active`.
- **activities** — `id` (PK), `skill_id` FK, `actor_id` FK→users, `type`,
  `description`, `created_at`. (Backs the Live Activity ledger.)
- **tool_execution** — `id` (PK), `correlation_id`, `skill_id` FK (nullable),
  `user_id` FK, `tool_name`, `tool_version`, `status` (success/failed),
  `request_payload`, `result_ref`, `error_message`, `started_at`, `finished_at`.

## RBAC query path (Requirement 6)

```
authenticated request
  → RBAC dependency resolves user_id
    → join user_skills
      → skills filtered to that user
        → projected DTO
          → list element
```

Detail routes additionally check the mapping row's `access_level` before
returning the full payload; an unmapped `skill_id` is rejected (403/404).
