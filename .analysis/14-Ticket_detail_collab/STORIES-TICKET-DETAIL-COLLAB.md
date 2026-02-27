# FEATURE-014: Ticket Detail & Collaboration — Stories Breakdown

## Overview

Add a ticket detail page accessible from the backlog card list. The page shows all ticket fields, allows authorized users to edit them inline, supports commenting, and displays an activity history. Role-based permissions control who can edit what.

## Current State

### Backend
- `GET /api/projects/:projectId/backlog` — paginated list with filters (envelope response)
- `POST /api/projects/:projectId/backlog` — create ticket
- No single-ticket GET, no PATCH, no comments, no activity endpoints
- DB collections: `backlog-items`, `workflows`, `project-members`, `users`, `projects`
- No `ticket-comments` or `ticket-activity` collections yet

### Frontend
- `BacklogComponent` renders cards with `eui-content-card` in a two-column layout
- Routes: `:projectId` > Shell > children: `''` (Dashboard), `members`, `backlog`, `settings`
- No ticket detail route, no ticket detail component
- `ProjectService` has `getBacklog()`, `createTicket()`, `getEpics()` — no `getTicket()`, `updateTicket()`, `addComment()`, `getActivity()`
- Models: `BacklogItem`, `CreateTicketPayload` — no `UpdateTicketPayload`, `Comment`, `ActivityEntry`

### What needs to change
- Backend: add GET single ticket, PATCH ticket (with workflow transition validation), comments CRUD, activity log auto-generation
- Frontend: add ticket detail route (`backlog/:ticketNumber`), detail component, service methods, models
- Frontend: editable fields with role-based permissions, comment section, activity timeline
- Navigation: clicking a backlog card navigates to the detail page; back button returns to backlog

## Stories

| # | Story | Scope | Depends on |
|---|-------|-------|------------|
| 1 | Backend — Single Ticket GET & PATCH Endpoints | Backend | — |
| 2 | Backend — Comments & Activity Endpoints | Backend | STORY-001 |
| 3 | Frontend — Models, Service Methods & Route | Frontend | STORY-002 |
| 4 | Frontend — Ticket Detail Page Layout | Frontend | STORY-003 |
| 5 | Frontend — Inline Edit & Save | Frontend | STORY-004 |
| 6 | Frontend — Comments Section | Frontend | STORY-005 |
| 7 | Frontend — Activity Timeline & Role Permissions | Frontend | STORY-006 |

---

## STORY-001: Backend — Single Ticket GET & PATCH Endpoints

Add endpoints to retrieve and update a single ticket by ticket number within a project.

### New endpoints

**GET /api/projects/:projectId/backlog/:ticketNumber**
- Returns the single `BacklogItem` matching `projectId` + `ticketNumber`
- Protected: auth + any project role (SUPER_ADMIN bypasses)
- 404 if not found

**PATCH /api/projects/:projectId/backlog/:ticketNumber**
- Updates allowed fields: `title`, `description`, `status`, `priority`, `assignee_id`, `epic_id`
- Validates:
  - `title`: 2–200 chars if provided
  - `description`: max 2000 chars if provided
  - `status`: must be a valid transition from current status (check `workflows` collection)
  - `priority`: must be one of CRITICAL/HIGH/MEDIUM/LOW if provided
  - `assignee_id`: must be active project member if provided
  - `epic_id`: must be EPIC in same project if provided
- Protected: auth + non-VIEWER role (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER)
- REPORTER can only update tickets they created (`created_by === userId`)
- Returns updated `BacklogItem`
- Generates activity entries (stored in `ticket-activity` collection) for each changed field

### DB changes
- Add `ticket-activity` collection to `db.json` (empty array initially)
- Activity entry shape: `{ id, projectId, ticketId, ticketNumber, field, oldValue, newValue, changedBy, created_at }`

### Integration tests (~14)
| # | Test |
|---|------|
| 1 | GET returns ticket by number |
| 2 | GET returns 404 for non-existent ticket |
| 3 | GET returns 401 without token |
| 4 | GET returns 403 for non-member |
| 5 | PATCH updates title |
| 6 | PATCH updates status with valid transition |
| 7 | PATCH rejects invalid status transition |
| 8 | PATCH updates priority |
| 9 | PATCH updates assignee_id |
| 10 | PATCH validates title length |
| 11 | PATCH returns 403 for VIEWER |
| 12 | PATCH REPORTER can update own ticket |
| 13 | PATCH REPORTER cannot update others' ticket |
| 14 | PATCH generates activity entries |

### Files changed
| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Add GET + PATCH endpoints |
| `mock/app/routes/project_routes.test.js` | Add ~14 tests |
| `mock/db/db.json` | Add `ticket-activity: []` collection |

---

## STORY-002: Backend — Comments & Activity Endpoints

Add comment CRUD and activity retrieval endpoints.

### New endpoints

**GET /api/projects/:projectId/backlog/:ticketNumber/comments**
- Returns all comments for the ticket, sorted by `created_at` desc
- Protected: auth + any project role
- Comment shape: `{ id, projectId, ticketId, ticketNumber, authorId, authorName, content, created_at }`

**POST /api/projects/:projectId/backlog/:ticketNumber/comments**
- Creates a new comment
- Body: `{ content: string }` (1–2000 chars)
- Protected: auth + non-VIEWER role
- Auto-populates `authorId`, `authorName` from token user
- Returns 201 with created comment

**GET /api/projects/:projectId/backlog/:ticketNumber/activity**
- Returns all activity entries for the ticket, sorted by `created_at` desc
- Protected: auth + any project role
- Includes both field-change activities (from STORY-001 PATCH) and comment activities

### DB changes
- Add `ticket-comments` collection to `db.json` (empty array initially)

### Integration tests (~10)
| # | Test |
|---|------|
| 1 | GET comments returns empty array for new ticket |
| 2 | POST comment creates successfully |
| 3 | POST comment validates content length |
| 4 | POST comment returns 403 for VIEWER |
| 5 | GET comments returns sorted list |
| 6 | GET activity returns empty for new ticket |
| 7 | GET activity returns field changes after PATCH |
| 8 | GET comments returns 404 for non-existent ticket |
| 9 | POST comment returns 401 without token |
| 10 | POST comment returns 404 for non-existent ticket |

### Files changed
| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Add comments + activity endpoints |
| `mock/app/routes/project_routes.test.js` | Add ~10 tests |
| `mock/db/db.json` | Add `ticket-comments: []` collection |

---

## STORY-003: Frontend — Models, Service Methods & Route

Add TypeScript models, service methods, and the route for the ticket detail page.

### Changes

#### Models (`project.models.ts`)
- `UpdateTicketPayload`: `{ title?, description?, status?, priority?, assignee_id?, epic_id? }`
- `TicketComment`: `{ id, projectId, ticketId, ticketNumber, authorId, authorName, content, created_at }`
- `ActivityEntry`: `{ id, projectId, ticketId, ticketNumber, field, oldValue, newValue, changedBy, created_at }`

#### Service methods (`project.service.ts`)
- `getTicket(projectId, ticketNumber): Observable<BacklogItem>`
- `updateTicket(projectId, ticketNumber, payload): Observable<BacklogItem>`
- `getComments(projectId, ticketNumber): Observable<TicketComment[]>`
- `addComment(projectId, ticketNumber, content): Observable<TicketComment>`
- `getActivity(projectId, ticketNumber): Observable<ActivityEntry[]>`

#### Route (`projects.routes.ts`)
- Add child route under `:projectId`: `backlog/:ticketNumber` → lazy-loaded `TicketDetailComponent`

#### Barrel exports (`index.ts`)
- Export new models and types

### Unit tests (~5)
| # | Test |
|---|------|
| 1 | getTicket sends correct HTTP GET |
| 2 | updateTicket sends correct HTTP PATCH |
| 3 | getComments sends correct HTTP GET |
| 4 | addComment sends correct HTTP POST |
| 5 | getActivity sends correct HTTP GET |

### Files changed
| File | Change |
|------|--------|
| `src/app/core/project/project.models.ts` | Add new interfaces |
| `src/app/core/project/project.service.ts` | Add 5 new methods |
| `src/app/core/project/project.service.spec.ts` | Add 5 tests |
| `src/app/core/project/index.ts` | Export new types |
| `src/app/features/projects/projects.routes.ts` | Add ticket detail route |

---

## STORY-004: Frontend — Ticket Detail Page Layout

Create the `TicketDetailComponent` with a read-only detail layout showing all ticket fields.

### Changes

#### Component structure
- New component: `src/app/features/projects/ticket-detail/ticket-detail.component.ts`
- Reads `ticketNumber` from `ActivatedRoute` params
- Gets `projectId` from `ProjectContextService`
- Loads ticket via `ProjectService.getTicket()`
- Loads project members for assignee display
- Uses `eui-page` > `eui-page-header` (with back button + ticket key as label) > `eui-page-content`
- Two-column layout using `eui-page-columns`: left column for ticket fields, right column for comments/activity (placeholder for STORY-006/007)

#### Ticket fields display (left column)
- Title (h2)
- Type chip, Status chip, Priority chip
- Description (read-only paragraph)
- Assignee name
- Epic name (if linked)
- Created by + created date
- Ticket number display (e.g., "API-42")

#### Navigation
- Back button in page header navigates to `../` (backlog list)
- Backlog card click navigates to `backlog/:ticketNumber`

#### i18n keys (EN + FR)
- `ticket-detail.page-title`: "{{key}}-{{number}} {{title}}" / same
- `ticket-detail.back`: "Back to backlog" / "Retour au backlog"
- `ticket-detail.field.status`: "Status" / "Statut"
- `ticket-detail.field.priority`: "Priority" / "Priorité"
- `ticket-detail.field.type`: "Type" / "Type"
- `ticket-detail.field.assignee`: "Assignee" / "Assigné"
- `ticket-detail.field.epic`: "Epic" / "Epic"
- `ticket-detail.field.created-by`: "Created by" / "Créé par"
- `ticket-detail.field.created-at`: "Created" / "Créé le"
- `ticket-detail.field.description`: "Description" / "Description"
- `ticket-detail.no-description`: "No description provided." / "Aucune description fournie."
- `ticket-detail.not-found`: "Ticket not found." / "Ticket introuvable."
- `ticket-detail.load-error`: "Failed to load ticket." / "Impossible de charger le ticket."

### Unit tests (~10)
| # | Test |
|---|------|
| 1 | Should load ticket on init |
| 2 | Should display ticket key and number |
| 3 | Should display title |
| 4 | Should display type chip |
| 5 | Should display status chip |
| 6 | Should display priority chip |
| 7 | Should display assignee name |
| 8 | Should display description |
| 9 | Should show "No description" when empty |
| 10 | Should navigate back on back button click |

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/ticket-detail/ticket-detail.component.ts` | New component |
| `src/app/features/projects/ticket-detail/ticket-detail.component.html` | New template |
| `src/app/features/projects/ticket-detail/ticket-detail.component.scss` | New styles |
| `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts` | New tests |
| `src/app/features/projects/backlog/backlog.component.html` | Add routerLink on cards |
| `src/app/features/projects/backlog/backlog.component.ts` | Add Router import |
| `src/assets/i18n/en.json` | Add ticket-detail i18n keys |
| `src/assets/i18n/fr.json` | Add ticket-detail i18n keys |

---

## STORY-005: Frontend — Inline Edit & Save

Make ticket fields editable for authorized users with save functionality.

### Changes

#### Edit mode
- `canEdit` flag determined by role: PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER can edit any ticket; REPORTER can edit only own tickets; VIEWER cannot edit
- Editable fields: title, description, status, priority, assignee, epic
- Each field has an edit toggle (pencil icon button) that switches to edit mode
- Status field: dropdown with only valid transitions from current status (loaded from `WorkflowService`)
- Save button per field or a global "Save changes" button that PATCHes all modified fields
- On save success: growl notification, reload ticket
- On save error: growl error, revert field

#### Workflow transitions
- Load workflows via `ProjectService.getWorkflows(projectId)`
- For the current ticket type + status, show only allowed next statuses in the dropdown

#### i18n keys (EN + FR)
- `ticket-detail.edit`: "Edit" / "Modifier"
- `ticket-detail.save`: "Save" / "Enregistrer"
- `ticket-detail.cancel`: "Cancel" / "Annuler"
- `ticket-detail.growl.updated-summary`: "Ticket updated" / "Ticket mis à jour"
- `ticket-detail.growl.updated-detail`: "Changes saved successfully." / "Modifications enregistrées."
- `ticket-detail.growl.update-failed`: "Failed to save changes." / "Échec de la sauvegarde."
- `ticket-detail.read-only`: "You have read-only access to this ticket." / "Vous avez un accès en lecture seule à ce ticket."

### Unit tests (~10)
| # | Test |
|---|------|
| 1 | Should show edit buttons when canEdit is true |
| 2 | Should hide edit buttons when canEdit is false |
| 3 | Should switch to edit mode on edit click |
| 4 | Should show status dropdown with valid transitions |
| 5 | Should call updateTicket on save |
| 6 | Should show growl on save success |
| 7 | Should show growl on save error |
| 8 | Should revert on cancel |
| 9 | Should determine canEdit for DEVELOPER |
| 10 | Should determine canEdit for VIEWER (false) |

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/ticket-detail/ticket-detail.component.ts` | Add edit logic, canEdit, save |
| `src/app/features/projects/ticket-detail/ticket-detail.component.html` | Add edit mode templates |
| `src/app/features/projects/ticket-detail/ticket-detail.component.scss` | Edit mode styles |
| `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts` | Add ~10 tests |
| `src/assets/i18n/en.json` | Add edit i18n keys |
| `src/assets/i18n/fr.json` | Add edit i18n keys |

---

## STORY-006: Frontend — Comments Section

Add a comments section to the ticket detail page.

### Changes

#### Comments panel (right column)
- Load comments via `ProjectService.getComments()`
- Display list of comments sorted by newest first
- Each comment shows: author name, date, content
- "Add comment" textarea + submit button (visible only if `canComment`)
- `canComment`: same roles as `canEdit` (non-VIEWER)
- On submit: call `ProjectService.addComment()`, reload comments, clear textarea
- Growl on success/error

#### i18n keys (EN + FR)
- `ticket-detail.comments.title`: "Comments" / "Commentaires"
- `ticket-detail.comments.add-placeholder`: "Write a comment..." / "Écrire un commentaire..."
- `ticket-detail.comments.submit`: "Add comment" / "Ajouter un commentaire"
- `ticket-detail.comments.empty`: "No comments yet." / "Aucun commentaire."
- `ticket-detail.comments.growl.added`: "Comment added" / "Commentaire ajouté"
- `ticket-detail.comments.growl.failed`: "Failed to add comment." / "Échec de l'ajout du commentaire."

### Unit tests (~8)
| # | Test |
|---|------|
| 1 | Should load comments on init |
| 2 | Should display comment list |
| 3 | Should display author name and date |
| 4 | Should show empty state when no comments |
| 5 | Should show add comment form when canComment |
| 6 | Should hide add comment form when cannot comment |
| 7 | Should call addComment on submit |
| 8 | Should clear textarea after successful submit |

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/ticket-detail/ticket-detail.component.ts` | Add comments logic |
| `src/app/features/projects/ticket-detail/ticket-detail.component.html` | Add comments section |
| `src/app/features/projects/ticket-detail/ticket-detail.component.scss` | Comments styles |
| `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts` | Add ~8 tests |
| `src/assets/i18n/en.json` | Add comment i18n keys |
| `src/assets/i18n/fr.json` | Add comment i18n keys |

---

## STORY-007: Frontend — Activity Timeline & Role Permissions

Add activity timeline and finalize role-based permission display.

### Changes

#### Activity timeline (right column, below comments)
- Load activity via `ProjectService.getActivity()`
- Display chronological list of field changes
- Each entry shows: field name, old value → new value, changed by, date
- Translate field values where applicable (status, priority, type)

#### Role-based UI polish
- VIEWER sees read-only banner at top
- REPORTER sees edit buttons only on own tickets
- All roles see comments and activity

#### i18n keys (EN + FR)
- `ticket-detail.activity.title`: "Activity" / "Activité"
- `ticket-detail.activity.empty`: "No activity yet." / "Aucune activité."
- `ticket-detail.activity.changed`: "{{user}} changed {{field}} from {{oldValue}} to {{newValue}}" / "{{user}} a modifié {{field}} de {{oldValue}} à {{newValue}}"

### Unit tests (~6)
| # | Test |
|---|------|
| 1 | Should load activity on init |
| 2 | Should display activity entries |
| 3 | Should show empty state when no activity |
| 4 | Should show read-only banner for VIEWER |
| 5 | Should show edit buttons for DEVELOPER |
| 6 | Should hide edit buttons for REPORTER on others' tickets |

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/ticket-detail/ticket-detail.component.ts` | Add activity logic, role refinement |
| `src/app/features/projects/ticket-detail/ticket-detail.component.html` | Add activity timeline, role banner |
| `src/app/features/projects/ticket-detail/ticket-detail.component.scss` | Activity styles |
| `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts` | Add ~6 tests |
| `src/assets/i18n/en.json` | Add activity i18n keys |
| `src/assets/i18n/fr.json` | Add activity i18n keys |

---

## Files Changed (estimated, all stories)

| File | Stories |
|------|---------|
| `mock/app/routes/project_routes.js` | 1, 2 |
| `mock/app/routes/project_routes.test.js` | 1, 2 |
| `mock/db/db.json` | 1, 2 |
| `src/app/core/project/project.models.ts` | 3 |
| `src/app/core/project/project.service.ts` | 3 |
| `src/app/core/project/project.service.spec.ts` | 3 |
| `src/app/core/project/index.ts` | 3 |
| `src/app/features/projects/projects.routes.ts` | 3 |
| `src/app/features/projects/ticket-detail/ticket-detail.component.ts` | 4, 5, 6, 7 |
| `src/app/features/projects/ticket-detail/ticket-detail.component.html` | 4, 5, 6, 7 |
| `src/app/features/projects/ticket-detail/ticket-detail.component.scss` | 4, 5, 6, 7 |
| `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts` | 4, 5, 6, 7 |
| `src/app/features/projects/backlog/backlog.component.html` | 4 |
| `src/app/features/projects/backlog/backlog.component.ts` | 4 |
| `src/assets/i18n/en.json` | 4, 5, 6, 7 |
| `src/assets/i18n/fr.json` | 4, 5, 6, 7 |
