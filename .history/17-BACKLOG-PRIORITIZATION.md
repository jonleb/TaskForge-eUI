# 17 — Backlog Prioritization

## What this branch does

Adds a position-based ordering system to the project backlog, allowing Project Admins and Super Admins to manually prioritize tickets. Each backlog item gets a `position` field, a new "Priority order" sort option becomes the default view, and authorized users can reorder items via accessible move-up/move-down buttons with a save/discard workflow. The backend exposes a bulk reorder endpoint with full validation and role gating.

## Step-by-step walkthrough

### 1. Position field & reorder endpoint (STORY-001)

- Added `position` field to all 107 existing backlog items in `mock/db/db.json`, assigned per project based on `ticket_number` order.
- Modified `POST /api/projects/:projectId/backlog` to auto-assign `position = maxPosition + 1` to new tickets.
- Added `PUT /api/projects/:projectId/backlog/reorder` endpoint with validation: empty array, missing ticket_number, non-positive position, duplicate positions, duplicate ticket_numbers, ticket not in project.
- Role gating: PROJECT_ADMIN and PRODUCT_OWNER (SUPER_ADMIN bypasses via existing middleware).
- 11 integration tests covering all validation paths and success case.

Files: `mock/db/db.json`, `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### 2. Position model & reorderBacklog service method (STORY-002)

- Added `position?: number` to `BacklogItem` interface and new `ReorderPayload` interface.
- Added `reorderBacklog(projectId, payload)` method to `ProjectService` calling `PUT /api/projects/:projectId/backlog/reorder`.
- Re-exported `ReorderPayload` from barrel index.
- 2 unit tests: correct PUT call and error propagation.

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/project.service.spec.ts`, `src/app/core/project/index.ts`

### 3. Reorder UI with move-up/move-down buttons (STORY-003)

- Added "Priority order" (sort by `position` asc) as the first and default sort option.
- Added `eui-icon-button` move-up (`arrow-up:regular`) and move-down (`arrow-down:regular`) per card, visible only in reorder mode.
- `isReorderMode` getter: true when sort=position AND `canReorder` AND no filters active.
- Position badge displayed next to each card in reorder mode.
- First item's move-up and last item's move-down are disabled via `[euiDisabled]`.
- 13 unit tests covering sort default, move operations, boundary guards, and visibility conditions.

Files: `src/app/features/projects/backlog/backlog.component.ts`, `src/app/features/projects/backlog/backlog.component.html`, `src/app/features/projects/backlog/backlog.component.scss`, `src/app/features/projects/backlog/backlog.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 4. Save/discard bar & role gating (STORY-004)

- `canReorder` permission: SUPER_ADMIN or PROJECT_ADMIN only.
- `originalPositions` Map tracks positions at load time for dirty-state comparison.
- `hasReorderChanges` getter compares current positions to originals.
- Save/discard bar with `aria-live="polite"` shown when changes exist; Save calls `reorderBacklog()` with success/error growl; Discard restores original order.
- 10 unit tests covering dirty state, discard, save success/error, role gating, and bar visibility.

Files: same as STORY-003 (implemented together since they modify the same component files)

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/17-Backlog_prioritization/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **Move buttons instead of drag-and-drop**: eUI has no built-in drag-and-drop component. Rather than adding Angular CDK DragDrop (extra dependency, complex a11y), we used `eui-icon-button` move-up/move-down which are fully keyboard-accessible out of the box.
- **Icon naming**: Used `arrow-up:regular` / `arrow-down:regular` (third-party icon set format). Bare names like `icon="arrow-up"` silently render empty containers.
- **`[euiDisabled]` not `[disabled]`**: `eui-icon-button` requires `[euiDisabled]` for disabled state; standard `[disabled]` causes build errors.
- **Fresh array copies in tests**: The `getBacklog` mock must return fresh copies of the items array (`mockItems.map(i => ({ ...i }))`) because `moveDown`/`moveUp` mutate the array in place before `updateLocalPositions` creates a new one. Without copies, module-level test data gets corrupted across tests.
- **Default sort changed to position**: The backlog now defaults to `_sort: 'position', _order: 'asc'` instead of `ticket_number desc`. The `clearAllFilters` method also resets to position sort.
- **Reorder mode gating**: Three conditions must all be true: sort=position, canReorder=true, no active filters. This prevents confusing UX where move buttons appear on filtered/sorted views.
- **Save/discard bar with `aria-live="polite"`**: Ensures screen readers announce when unsaved changes exist.

## Git history

```
3e057f4 feat(017): STORY-004 — Save/discard bar & role gating
3e91bf9 feat(017): STORY-003 — Reorder UI with move-up/move-down buttons
d7fb020 feat(017): STORY-002 — Position model & reorderBacklog service method
df553fd feat(017): STORY-001 — Position field & reorder endpoint
05f3fa8 docs(017): add stories breakdown and analysis files for Backlog Prioritization
2520f5a chore(017): create analysis folder for Backlog Prioritization
```

## Test summary

- Frontend: 513 unit tests (vitest) — all passing
- Backend: 11 new integration tests (Jest + supertest) — all passing (8 pre-existing failures are known/unrelated)
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full Backlog Prioritization feature on a fresh eUI Angular project that already has a mock backend with json-server, project/backlog CRUD, RBAC with PermissionService, and an existing backlog page with card-based layout, filters, sort, and pagination.

---

**Prompt:**

> Implement a Backlog Prioritization feature with the following 4 stories:
>
> **STORY-001 — Backend: Position field & reorder endpoint**
> - Add a `position` integer field to every backlog item in the seed data (assigned per project, ordered by ticket_number).
> - Modify the POST create-ticket endpoint to auto-assign `position = max(existing positions) + 1`.
> - Add `PUT /api/projects/:projectId/backlog/reorder` accepting `{ items: [{ ticket_number, position }] }`. Validate: non-empty array, each item has ticket_number and positive position, no duplicate positions, no duplicate ticket_numbers, all tickets belong to the project. Role-gate to PROJECT_ADMIN and PRODUCT_OWNER (SUPER_ADMIN bypasses). Return `{ updated: N }`.
> - Write integration tests (Jest + supertest) for all validation paths and success case.
>
> **STORY-002 — Frontend: Position model & service method**
> - Add `position?: number` to `BacklogItem` interface. Add `ReorderPayload` interface with `items: { ticket_number: number; position: number }[]`.
> - Add `reorderBacklog(projectId, payload): Observable<{ updated: number }>` to ProjectService calling the PUT endpoint.
> - Write 2 unit tests: correct PUT call and error propagation.
>
> **STORY-003 — Frontend: Reorder UI**
> - Add "Priority order" (sort by position asc) as the first and default sort option in the backlog page.
> - For each card, show move-up and move-down `eui-icon-button` (icons: `arrow-up:regular`, `arrow-down:regular`) when in reorder mode.
> - `isReorderMode`: true when sort=position AND canReorder AND no filters active.
> - Use `[euiDisabled]` (not `[disabled]`) on first item's move-up and last item's move-down.
> - Show a position badge per card in reorder mode.
> - Add i18n keys for EN and FR.
>
> **STORY-004 — Frontend: Save/discard bar & role gating**
> - `canReorder`: SUPER_ADMIN or PROJECT_ADMIN only.
> - Track original positions in a Map on load. `hasReorderChanges` getter compares current to original.
> - Show a save/discard bar (with `aria-live="polite"`) when changes exist. Save calls `reorderBacklog()` with growl on success/error. Discard restores original order.
> - Write unit tests for dirty state, discard, save success/error, role gating, and bar visibility.
>
> **Constraints:**
> - eUI has no drag-and-drop component — use move-up/move-down buttons for accessible reordering.
> - `eui-icon-button` uses `[euiDisabled]`, not `[disabled]`.
> - Icon names must be `arrow-up:regular` / `arrow-down:regular` (not bare names).
> - Action buttons go in `eui-page-header-action-items`, not `eui-page-content`.
> - Tests must return fresh array copies from mocks to avoid cross-test mutation.
> - Frontend tests: `npm run test:ci`. Backend tests: `npm run test:mock`. Build: `npx ng build --configuration=development`.
