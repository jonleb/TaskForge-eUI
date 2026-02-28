# FEATURE-015: Workflow Management — Stories Breakdown

## Overview

Enable project-scoped workflow management so authorized users (SUPER_ADMIN, PROJECT_ADMIN) can view and edit workflow definitions (statuses and transitions) per ticket type. Currently workflows are bootstrapped as read-only defaults when a project is created. This feature adds mutation endpoints and a dedicated editor UI.

## Current State

### Backend
- `GET /api/projects/:projectId/workflows` — returns all workflows for a project, sorted by ticketType (read-only)
- `bootstrapProject(db, projectId)` creates 4 default workflows (STORY, BUG, TASK, EPIC) on project creation
- Workflow shape: `{ id, projectId, ticketType, statuses[], transitions{}, created_at }`
- Workflow transitions are validated during ticket creation (POST backlog) and status updates (PATCH backlog/:ticketNumber)
- No PUT/PATCH endpoint exists for workflow mutation
- DB collection: `workflows` (4 entries per project)

### Frontend
- `SettingsComponent` at route `:projectId/settings` displays workflows read-only (status flow + transitions table)
- `TicketDetailComponent` loads workflows to compute `allowedStatuses` for status dropdown
- `ProjectService.getWorkflows(projectId)` exists — returns `Observable<Workflow[]>`
- Models: `Workflow`, `WorkflowStatus`, `TicketType` interfaces defined in `project.models.ts`
- Sidebar shows "Settings" link for all project members (no role gating on sidebar item)
- No workflow update service method exists

### What needs to change
- Backend: add PUT endpoint to update a workflow's statuses and transitions with validation
- Backend: validate workflow integrity (no orphan transitions, no duplicate statuses, status used by existing tickets cannot be removed)
- Frontend: add `updateWorkflow()` service method
- Frontend: transform the read-only settings page into an editable workflow manager for authorized roles
- Frontend: add/remove statuses, edit transitions via UI controls
- Frontend: role-gate editing (SUPER_ADMIN + PROJECT_ADMIN can edit; others see read-only)
- i18n: add workflow management keys (EN + FR)

## Stories

| # | Story | Scope | Depends on |
|---|-------|-------|------------|
| 1 | Backend — Workflow Update Endpoint | Backend | — |
| 2 | Frontend — Workflow Service & Models Update | Frontend | STORY-001 |
| 3 | Frontend — Workflow Editor Page | Frontend | STORY-002 |
| 4 | Frontend — Add/Remove Status UI | Frontend | STORY-003 |
| 5 | Frontend — Transition Editor UI | Frontend | STORY-004 |
| 6 | Frontend — Role Gating & Read-Only Mode | Frontend | STORY-005 |

---

## STORY-001: Backend — Workflow Update Endpoint

Add `PUT /api/projects/:projectId/workflows/:workflowId` to update a workflow's statuses and transitions. Validates status format, transition integrity, and prevents removal of statuses used by existing tickets (409 Conflict). Restricted to SUPER_ADMIN and PROJECT_ADMIN.

### New endpoint

- `PUT /api/projects/:projectId/workflows/:workflowId` — updates `statuses[]` and `transitions{}` with full validation

### Integration tests: ~18

### Files changed
| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Add PUT endpoint |
| `mock/app/routes/project_routes.test.js` | Add ~18 tests |

---

## STORY-002: Frontend — Workflow Service & Models Update

Add `UpdateWorkflowPayload` interface and `updateWorkflow()` service method. Extend `Workflow` interface with optional `updated_at` field.

### Unit tests: ~2

### Files changed
| File | Change |
|------|--------|
| `src/app/core/project/project.models.ts` | Add `UpdateWorkflowPayload`, add `updated_at?` to `Workflow` |
| `src/app/core/project/project.service.ts` | Add `updateWorkflow()` method |
| `src/app/core/project/project.service.spec.ts` | Add 2 tests |
| `src/app/core/project/index.ts` | Export new type |

---

## STORY-003: Frontend — Workflow Editor Page

Refactor `SettingsComponent` from a flat read-only list into a tab-based workflow editor. Add `eui-toggle-group` for ticket type selection, edit mode with Save/Cancel flow, and `updateWorkflow()` integration.

### Unit tests: ~12

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/settings/settings.component.ts` | Refactor with selection, edit mode, save/cancel |
| `src/app/features/projects/settings/settings.component.html` | Refactor template |
| `src/app/features/projects/settings/settings.component.scss` | Add styles |
| `src/app/features/projects/settings/settings.component.spec.ts` | Update + add tests |
| `src/assets/i18n/en.json` | Add `workflow-mgmt.*` keys |
| `src/assets/i18n/fr.json` | Add `workflow-mgmt.*` keys |

---

## STORY-004: Frontend — Add/Remove Status UI

In edit mode, allow adding new statuses (with format validation) and removing existing ones (with automatic transition cleanup). Minimum 1 status enforced.

### Unit tests: ~10

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/settings/settings.component.ts` | Add `addStatus()`, `removeStatus()` |
| `src/app/features/projects/settings/settings.component.html` | Add editable status section |
| `src/app/features/projects/settings/settings.component.scss` | Add styles |
| `src/app/features/projects/settings/settings.component.spec.ts` | Add tests |
| `src/assets/i18n/en.json` | Add status editing keys |
| `src/assets/i18n/fr.json` | Add status editing keys |

---

## STORY-005: Frontend — Transition Editor UI

In edit mode, display a checkbox matrix (from × to) for editing transitions. Diagonal cells (self-transitions) disabled. Checking/unchecking toggles transitions in `editTransitions`.

### Unit tests: ~8

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/settings/settings.component.ts` | Add `hasTransition()`, `toggleTransition()` |
| `src/app/features/projects/settings/settings.component.html` | Add transition matrix |
| `src/app/features/projects/settings/settings.component.scss` | Add matrix styles |
| `src/app/features/projects/settings/settings.component.spec.ts` | Add tests |
| `src/assets/i18n/en.json` | Add transition editing keys |
| `src/assets/i18n/fr.json` | Add transition editing keys |

---

## STORY-006: Frontend — Role Gating & Read-Only Mode

Gate workflow editing to SUPER_ADMIN and PROJECT_ADMIN. Other roles see read-only mode with info banner. Add confirmation dialog before saving.

### Unit tests: ~8

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/settings/settings.component.ts` | Add `determineCanManage()`, confirmation dialog |
| `src/app/features/projects/settings/settings.component.html` | Add read-only banner, gate Edit button, confirm dialog |
| `src/app/features/projects/settings/settings.component.scss` | Banner styles |
| `src/app/features/projects/settings/settings.component.spec.ts` | Add tests |
| `src/assets/i18n/en.json` | Add role gating keys |
| `src/assets/i18n/fr.json` | Add role gating keys |

---

## Files Changed (estimated, all stories)

| File | Stories |
|------|---------|
| `mock/app/routes/project_routes.js` | 1 |
| `mock/app/routes/project_routes.test.js` | 1 |
| `src/app/core/project/project.models.ts` | 2 |
| `src/app/core/project/project.service.ts` | 2 |
| `src/app/core/project/project.service.spec.ts` | 2 |
| `src/app/core/project/index.ts` | 2 |
| `src/app/features/projects/settings/settings.component.ts` | 3, 4, 5, 6 |
| `src/app/features/projects/settings/settings.component.html` | 3, 4, 5, 6 |
| `src/app/features/projects/settings/settings.component.scss` | 3, 4, 5, 6 |
| `src/app/features/projects/settings/settings.component.spec.ts` | 3, 4, 5, 6 |
| `src/assets/i18n/en.json` | 3, 4, 5, 6 |
| `src/assets/i18n/fr.json` | 3, 4, 5, 6 |
