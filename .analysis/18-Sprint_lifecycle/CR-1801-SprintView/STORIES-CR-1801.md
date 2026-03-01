# CR-1801 — Stories Breakdown

## Overview

Three stories derived from CR-1801-SprintView: inline issue list, drag & drop reorder, and quick-edit modal.

---

## STORY-001 — Inline Issue List per Sprint

Display the full list of `BacklogItem` records inside each sprint item on the sprint list page, replacing the ticket-count-only view.

**Scope**: Frontend only (existing `GET /api/projects/:projectId/backlog?sprint_id=` endpoint already returns the data).

**Files**:
- `src/app/features/projects/sprints/sprints.component.html`
- `src/app/features/projects/sprints/sprints.component.ts`
- `src/app/features/projects/sprints/sprints.component.scss`
- `src/app/features/projects/sprints/sprints.component.spec.ts`
- `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

---

## STORY-002 — Drag & Drop Reorder within Sprint

Allow privileged users to reorder issues within a sprint via drag & drop using Angular CDK `DragDropModule`. Persist order via the existing reorder endpoint.

**Scope**: Frontend + dependency install (`@angular/cdk`). No backend changes.

**Files**:
- `package.json` (add `@angular/cdk`)
- `src/app/features/projects/sprints/sprints.component.html`
- `src/app/features/projects/sprints/sprints.component.ts`
- `src/app/features/projects/sprints/sprints.component.scss`
- `src/app/features/projects/sprints/sprints.component.spec.ts`
- `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

---

## STORY-003 — Quick-Edit Modal on Issue Click

Open an `eui-dialog` with the ticket edit form when a user clicks an issue row. Save changes via the existing PATCH endpoint.

**Scope**: Frontend only.

**Files**:
- `src/app/features/projects/sprints/sprints.component.html`
- `src/app/features/projects/sprints/sprints.component.ts`
- `src/app/features/projects/sprints/sprints.component.scss`
- `src/app/features/projects/sprints/sprints.component.spec.ts`
- `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

---

## Execution Order

1. STORY-001 (inline list) — foundation, other stories build on it
2. STORY-002 (drag & drop) — requires the list from STORY-001
3. STORY-003 (quick-edit modal) — requires clickable items from STORY-001
