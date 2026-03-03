# FEATURE-011 Agile Bootstrap — Story Breakdown

## Context

This feature automatically provisions a usable agile baseline when a new project is created, so teams can start delivery work immediately without manual setup.

The application currently has:
- Backend: `POST /api/projects` (SUPER_ADMIN only) creates a project with key generation, timestamps, and `is_active: true`. No post-creation side effects.
- Backend: `mock/db/db.json` has 4 collections: `user-details`, `users`, `projects`, `project-members`. No workflow, epic, or ticket collections exist.
- Frontend: `PortfolioComponent` handles project creation via a dialog, calls `ProjectService.createProject()`, navigates to the new project on success.
- Frontend: `DashboardComponent` displays project details (name, key, description, created by, members).
- Existing models: `Project`, `ProjectMember`, `CreateProjectPayload` in `project.models.ts`.

## Data Model Design

### `workflows` collection (new in db.json)

```json
{
  "id": "1",
  "projectId": "1",
  "ticketType": "STORY",
  "statuses": ["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"],
  "transitions": {
    "TO_DO": ["IN_PROGRESS"],
    "IN_PROGRESS": ["IN_REVIEW", "TO_DO"],
    "IN_REVIEW": ["DONE", "IN_PROGRESS"],
    "DONE": []
  },
  "created_at": "2026-02-27T..."
}
```

Ticket types: `STORY`, `BUG`, `TASK`, `EPIC`.

- STORY/BUG/TASK share the same 4-status workflow: TO_DO → IN_PROGRESS → IN_REVIEW → DONE.
- EPIC uses a 3-status workflow: TO_DO → IN_PROGRESS → DONE.

### `backlog-items` collection (new in db.json)

```json
{
  "id": "1",
  "projectId": "1",
  "type": "EPIC",
  "title": "Maintenance",
  "description": "Default epic for maintenance and operational tasks",
  "status": "TO_DO",
  "created_by": "system",
  "created_at": "2026-02-27T..."
}
```

## eUI Components Used

| Component | Import | Usage |
|-----------|--------|-------|
| `eui-table` | `EUI_TABLE` from `@eui/components/eui-table` | Workflow display on settings page |
| `eui-chip` | `EUI_CHIP` from `@eui/components/eui-chip` | Status badges |
| `eui-page` | `EUI_PAGE` from `@eui/components/eui-page` | Settings page structure |
| `EuiGrowlService` | from `@eui/core` | Bootstrap status notifications |

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one unless stated otherwise.

---

## STORY-001: Backend — Workflow and Backlog Data Model + Seed Data

### Objective
Add `workflows` and `backlog-items` collections to the mock database with seed data for existing projects.

### Details → [STORY-001-workflow-seed-data.md](STORY-001-workflow-seed-data.md)

---

## STORY-002: Backend — Bootstrap Service (post-creation hook)

### Objective
Create a reusable bootstrap function that provisions default workflows and a maintenance epic for a given project, and integrate it into `POST /api/projects`.

### Details → [STORY-002-bootstrap-service.md](STORY-002-bootstrap-service.md)

---

## STORY-003: Backend — Workflow and Backlog Read Endpoints

### Objective
Expose `GET /api/projects/:projectId/workflows` and `GET /api/projects/:projectId/backlog` endpoints so the frontend can display bootstrapped data.

### Details → [STORY-003-read-endpoints.md](STORY-003-read-endpoints.md)

---

## STORY-004: Frontend — Workflow and Backlog Models + Service

### Objective
Create TypeScript interfaces and service methods to consume the new workflow and backlog endpoints.

### Details → [STORY-004-frontend-models-service.md](STORY-004-frontend-models-service.md)

---

## STORY-005: Frontend — Project Settings Page (workflow display)

### Objective
Create a Settings page under the project shell that displays the project's workflows per ticket type, showing statuses and transitions.

### Details → [STORY-005-settings-page.md](STORY-005-settings-page.md)

---

## STORY-006: Frontend — Dashboard Enhancement (backlog summary)

### Objective
Add a backlog summary card to the project dashboard showing the count of backlog items and the default maintenance epic.

### Details → [STORY-006-dashboard-backlog-summary.md](STORY-006-dashboard-backlog-summary.md)

---

## Dependency Graph

```
STORY-001 (Backend — Seed data + collections)
    └── STORY-002 (Backend — Bootstrap service in POST /api/projects)
            └── STORY-003 (Backend — Read endpoints)
                    └── STORY-004 (Frontend — Models + service)
                            ├── STORY-005 (Frontend — Settings page)
                            └── STORY-006 (Frontend — Dashboard backlog summary)
```

## Technical Notes

- Bootstrap runs synchronously inside `POST /api/projects` after the project is written. If bootstrap fails, the project is still returned (201) but a `bootstrapWarning` field is included in the response to signal partial failure.
- The bootstrap function is idempotent: if workflows/backlog already exist for the project, it skips creation (safe for retries).
- Seed data must be added for all 14 existing projects to keep the DB consistent.
- The `backlog-items` collection uses `type: "EPIC"` for the maintenance epic. Future ticket types (STORY, BUG, TASK) will also live here.
- The Settings page is the existing sidebar entry that currently has no implementation. This story gives it content.
- All i18n keys must be added to both `en.json` and `fr.json`.
