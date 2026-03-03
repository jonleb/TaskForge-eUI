# 16 — Ticket Linking

## What this branch does

Adds ticket-to-ticket linking with typed relationships (blocks, relates to, duplicates, parent/child). Covers backend endpoints for link-type administration and ticket link CRUD, frontend TypeScript models and service methods, a "Linked Tickets" section on the ticket detail page with add/remove dialogs, and role-based access control for link mutations.

## Step-by-step walkthrough

### 1. Link types seed data & CRUD endpoints (STORY-001)

- Seeded 4 default link types (BLOCKS, RELATES_TO, DUPLICATES, PARENT_OF) and an empty `ticket_links` collection in `mock/db/db.json`.
- Created `mock/app/routes/link_type_routes.js` with GET (all), POST (create, SUPER_ADMIN only), DELETE (remove, SUPER_ADMIN only with in-use check).
- POST validates name format `/^[A-Z][A-Z0-9_]{0,29}$/`, uniqueness, required inward/outward labels.
- DELETE returns 409 if existing ticket links reference the type.
- 13 integration tests covering all validation paths.

Files: `mock/db/db.json`, `mock/app/routes/link_type_routes.js`, `mock/app/routes/link_type_routes.test.js`, `mock/app/routes/index.js`

### 2. Ticket links CRUD endpoints (STORY-002)

- Added GET/POST/DELETE endpoints under `/api/projects/:projectId/backlog/:ticketNumber/links` in `mock/app/routes/project_routes.js`.
- GET enriches links with link type labels (`linkTypeName`, `linkLabel`).
- POST validates: link type exists, target ticket exists, no self-link, no duplicate. Returns 201.
- DELETE checks link ownership or admin role. Returns 204.
- 11 integration tests.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### 3. Link models & service methods (STORY-003)

- Added `LinkType`, `TicketLink`, `CreateTicketLinkPayload` interfaces to `project.models.ts`.
- Added `getLinkTypes()`, `getTicketLinks()`, `createTicketLink()`, `deleteTicketLink()` to `ProjectService`.
- 4 unit tests for HTTP calls.

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/project.service.spec.ts`, `src/app/core/project/index.ts`

### 4. Linked tickets read-only section (STORY-004)

- Added "Linked Tickets" section to ticket detail page between the save bar and comments section.
- Loads links via `getTicketLinks()` after ticket loads; loads link types via `getLinkTypes()` in `loadSupportData()`.
- Displays each link as a list item with link label and ticket key (e.g. "blocks TF-3").
- Empty state message when no links exist.

Files: `ticket-detail.component.ts`, `ticket-detail.component.html`, `ticket-detail.component.scss`

### 5. Add link dialog (STORY-005)

- "Add Link" button in the linked tickets section header, visible only when `canEdit` is true.
- `eui-dialog` with `euiSelect` for link type dropdown and `euiInputText` for target ticket number.
- On submit: calls `createTicketLink()`, refreshes links list, shows success/error growl.
- Uses `dismissLabel` (not `cancelLabel`) per eUI dialog API.

Files: `ticket-detail.component.ts`, `ticket-detail.component.html`

### 6. Remove link & role gating (STORY-006)

- `eui-icon-button` with `eui-trash` icon per link row, visible when `canDeleteLink()` returns true.
- Confirmation `eui-dialog` before deletion; calls `deleteTicketLink()` on accept.
- Role gating: SUPER_ADMIN and users with `canEdit` (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER) can delete any link.
- 17 i18n keys added to both `en.json` and `fr.json` under `ticket-detail.links.*` namespace.

Files: `ticket-detail.component.ts`, `ticket-detail.component.html`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/16-Ticket_linking/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story (stories 004–006 combined since they modify the same files).

## Key technical decisions

- **Separate link_type_routes.js file**: Link types are a global resource (not project-scoped), so they got their own route file rather than being added to `project_routes.js`.
- **Link enrichment on GET**: The GET links endpoint enriches each link with `linkTypeName` and `linkLabel` from the link types collection, avoiding extra client-side lookups.
- **No self-link validation**: Backend rejects links where source and target ticket numbers are the same within the same project.
- **Duplicate link detection**: Backend checks for existing links with the same source, target, and link type to prevent duplicates (409).
- **Combined commit for stories 004–006**: All three stories modify the same `TicketDetailComponent` files, making separate commits impractical.
- **`dismissLabel` not `cancelLabel`**: `eui-dialog` uses `dismissLabel` for the cancel button — `cancelLabel` is not a valid input and causes template errors.
- **Dialog fieldset with sr-only legend**: The add link dialog groups its inputs in a `<fieldset>` with a screen-reader-only `<legend>` for a11y compliance.

## Git history

```
aa981d3 feat(016): STORY-004/005/006 — Linked tickets section, add link dialog, remove link & role gating
06a1646 feat(016): STORY-003 — Link models & service methods
95b78d4 feat(016): STORY-002 — Ticket links CRUD endpoints
355c11b feat(016): STORY-001 — Link types seed data & CRUD endpoints
```

## Test summary

- Frontend: 488 unit tests (vitest) — all passing
- Backend: 24 new integration tests (13 link types + 11 ticket links, Jest + supertest) — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full ticket linking feature on a fresh eUI Angular project that already has: project CRUD, project membership with roles (SUPER_ADMIN, PROJECT_ADMIN, DEVELOPER, REPORTER, VIEWER), a mock Express/json-server backend with backlog items, a `PermissionService` with `isSuperAdmin()` and `hasProjectRole()`, a `ProjectService` with `getTicket()`, and a `TicketDetailComponent` at `:projectId/backlog/:ticketNumber` showing ticket details with inline editing, comments, and activity.

---

**Prompt:**

> Implement a ticket linking feature that lets users create typed relationships between tickets (blocks, relates to, duplicates, parent/child).
>
> **Backend — Link types (new route file):**
> 1. Seed 4 link types in db.json: BLOCKS (blocks / is blocked by), RELATES_TO (relates to / relates to), DUPLICATES (duplicates / is duplicated by), PARENT_OF (is parent of / is child of). Add empty `ticket_links` collection.
> 2. `GET /api/link-types` — returns all link types, no auth required.
> 3. `POST /api/link-types` — SUPER_ADMIN only. Validates name format `/^[A-Z][A-Z0-9_]{0,29}$/`, uniqueness, required inward/outward. Returns 201. Errors: 400, 409.
> 4. `DELETE /api/link-types/:id` — SUPER_ADMIN only. Returns 409 if link type is referenced by existing ticket links. Returns 204 on success, 404 if not found.
> 5. Write ~13 integration tests (Jest + supertest).
>
> **Backend — Ticket links (add to project routes):**
> 1. `GET /api/projects/:projectId/backlog/:ticketNumber/links` — returns links enriched with linkTypeName and linkLabel from link types collection.
> 2. `POST /api/projects/:projectId/backlog/:ticketNumber/links` — body: `{ linkTypeId, targetTicketNumber, targetProjectId? }`. Validates: link type exists, target ticket exists, no self-link, no duplicate. Returns 201.
> 3. `DELETE /api/projects/:projectId/backlog/:ticketNumber/links/:linkId` — checks link ownership or admin role. Returns 204.
> 4. Write ~11 integration tests.
>
> **Frontend service:**
> 1. Add `LinkType`, `TicketLink`, `CreateTicketLinkPayload` interfaces.
> 2. Add `getLinkTypes()`, `getTicketLinks(projectId, ticketNumber)`, `createTicketLink(projectId, ticketNumber, payload)`, `deleteTicketLink(projectId, ticketNumber, linkId)` to ProjectService.
> 3. Write 4 unit tests.
>
> **Frontend UI (modify TicketDetailComponent):**
> 1. Add "Linked Tickets" section between save bar and comments. Load links via `getTicketLinks()` after ticket loads. Load link types in `loadSupportData()`.
> 2. Display each link as list item: link label + ticket key (e.g. "blocks TF-3"). Show empty state when no links.
> 3. "Add Link" button visible when `canEdit`. Opens `eui-dialog` with `euiSelect` for link type and `euiInputText` for target ticket number. Use `dismissLabel` (NOT `cancelLabel`). Group inputs in `<fieldset>` with sr-only `<legend>`.
> 4. Delete `eui-icon-button` (icon `eui-trash`) per link, visible when `canDeleteLink()`. Confirmation `eui-dialog` before deletion.
> 5. Role gating: SUPER_ADMIN and canEdit users can add/remove links.
> 6. Add 17 i18n keys under `ticket-detail.links.*` for EN and FR.
> 7. Write ~20 unit tests covering: links loading, display, empty state, add dialog, create success/error, delete button visibility, delete success/error, role gating.
> 8. All tests pass (`npm run test:ci`), build passes (`npx ng build --configuration=development`).
>
> **eUI gotchas to follow:**
> - `eui-dialog` uses `dismissLabel` not `cancelLabel`
> - `eui-icon-button` uses `[euiDisabled]` not `[disabled]`
> - Icon names: `eui-trash`, `eui-edit` (never bare names)
> - Dialog: call `closeDialog()` before async operations
> - Form inputs use eUI directives (`euiInputText`, `euiSelect`)
> - Group form inputs in `<fieldset>` with `<legend>` (not `<div role="group">`)
> - All interactive elements need `aria-label` when icon-only
