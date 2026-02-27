# STORY-003: Frontend — Ticket Models + Service Extension

## Goal

Extend the `BacklogItem` interface with the new fields (`priority`, `assignee_id`, `epic_id`, `ticket_number`), add priority types and constants, add a `CreateTicketPayload` interface, add `createTicket()` and `getEpics()` service methods, and add i18n keys for priority labels.

## Existing Code

- `src/app/core/project/project.models.ts` — `BacklogItem` interface: `{ id, projectId, type, title, description, status, created_by, created_at }`. `TicketType`, `WorkflowStatus`, `TICKET_TYPES`, `WORKFLOW_STATUSES` exist.
- `src/app/core/project/project.service.ts` — `getBacklog(projectId, type?)` method exists. No create method.
- `src/app/core/project/index.ts` — barrel export.
- `src/assets/i18n/en.json` / `fr.json` — existing keys for `workflow.ticket-type.*` and `workflow.status.*`.

## Implementation Plan

### 1. Extend `BacklogItem` interface in `project.models.ts`

```typescript
export interface BacklogItem {
    id: string;
    projectId: string;
    type: TicketType;
    title: string;
    description: string;
    status: WorkflowStatus;
    priority: TicketPriority | null;
    assignee_id: string | null;
    epic_id: string | null;
    ticket_number: number;
    created_by: string;
    created_at: string;
}
```

### 2. Add priority type and constants

```typescript
export type TicketPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export const TICKET_PRIORITIES: TicketPriority[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

/** Ticket types that can be created by users (excludes EPIC) */
export const CREATABLE_TICKET_TYPES: TicketType[] = ['STORY', 'BUG', 'TASK'];
```

### 3. Add `CreateTicketPayload` interface

```typescript
export interface CreateTicketPayload {
    type: TicketType;
    title: string;
    description?: string;
    priority: TicketPriority;
    assignee_id?: string | null;
    epic_id?: string | null;
}
```

### 4. Add service methods in `project.service.ts`

```typescript
createTicket(projectId: string, payload: CreateTicketPayload): Observable<BacklogItem> {
    return this.http.post<BacklogItem>(`/api/projects/${projectId}/backlog`, payload);
}

getEpics(projectId: string): Observable<BacklogItem[]> {
    return this.getBacklog(projectId, 'EPIC');
}
```

### 5. Update barrel export in `index.ts`

Add: `TicketPriority`, `TICKET_PRIORITIES`, `CREATABLE_TICKET_TYPES`, `CreateTicketPayload`.

### 6. Add i18n keys

**en.json:**
```json
"ticket.priority.CRITICAL": "Critical",
"ticket.priority.HIGH": "High",
"ticket.priority.MEDIUM": "Medium",
"ticket.priority.LOW": "Low",
"ticket.priority.label": "Priority",
"ticket.field.title": "Title",
"ticket.field.description": "Description",
"ticket.field.type": "Type",
"ticket.field.assignee": "Assignee",
"ticket.field.epic": "Epic",
"ticket.field.ticket-number": "Ticket #"
```

**fr.json:**
```json
"ticket.priority.CRITICAL": "Critique",
"ticket.priority.HIGH": "Haute",
"ticket.priority.MEDIUM": "Moyenne",
"ticket.priority.LOW": "Basse",
"ticket.priority.label": "Priorité",
"ticket.field.title": "Titre",
"ticket.field.description": "Description",
"ticket.field.type": "Type",
"ticket.field.assignee": "Assigné",
"ticket.field.epic": "Epic",
"ticket.field.ticket-number": "Ticket n°"
```

### 7. Unit tests

Add to `project.service.spec.ts`:

| # | Test | Expected |
|---|------|----------|
| 1 | `createTicket()` should POST to `/api/projects/:id/backlog` | Correct URL, method, body |
| 2 | `createTicket()` should return the created BacklogItem | Response matches |
| 3 | `getEpics()` should call `getBacklog()` with type EPIC | Correct URL with `?type=EPIC` |

## Files Changed

| File | Change |
|------|--------|
| `src/app/core/project/project.models.ts` | Extend `BacklogItem`, add `TicketPriority`, `TICKET_PRIORITIES`, `CREATABLE_TICKET_TYPES`, `CreateTicketPayload` |
| `src/app/core/project/project.service.ts` | Add `createTicket()`, `getEpics()` |
| `src/app/core/project/index.ts` | Export new types and constants |
| `src/app/core/project/project.service.spec.ts` | Add 3 unit tests |
| `src/assets/i18n/en.json` | Add 11 i18n keys |
| `src/assets/i18n/fr.json` | Add 11 i18n keys |

## Acceptance Criteria

- [ ] `BacklogItem` interface includes `priority`, `assignee_id`, `epic_id`, `ticket_number`
- [ ] `TicketPriority` type and `TICKET_PRIORITIES` constant exported
- [ ] `CREATABLE_TICKET_TYPES` excludes EPIC
- [ ] `CreateTicketPayload` interface exported
- [ ] `createTicket()` sends POST to correct URL with payload
- [ ] `getEpics()` delegates to `getBacklog()` with type filter
- [ ] i18n keys added for all 4 priorities + 6 field labels (EN + FR)
- [ ] All unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
