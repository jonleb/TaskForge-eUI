# STORY-004: Frontend — Workflow and Backlog Models + Service

## Goal

Create TypeScript interfaces and service methods to consume the workflow and backlog endpoints.

## Existing Code

- `src/app/core/project/project.models.ts` — has `Project`, `ProjectMember`, `CreateProjectPayload`, etc.
- `src/app/core/project/project.service.ts` — has `getProjects()`, `getProject()`, `createProject()`, etc.
- `src/app/core/project/index.ts` — barrel export.

## Implementation Plan

### 1. Add interfaces to `project.models.ts`

```typescript
export type TicketType = 'STORY' | 'BUG' | 'TASK' | 'EPIC';
export type WorkflowStatus = 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

export interface Workflow {
    id: string;
    projectId: string;
    ticketType: TicketType;
    statuses: WorkflowStatus[];
    transitions: Record<WorkflowStatus, WorkflowStatus[]>;
    created_at: string;
}

export interface BacklogItem {
    id: string;
    projectId: string;
    type: TicketType;
    title: string;
    description: string;
    status: WorkflowStatus;
    created_by: string;
    created_at: string;
}

export const TICKET_TYPES: TicketType[] = ['STORY', 'BUG', 'TASK', 'EPIC'];
export const WORKFLOW_STATUSES: WorkflowStatus[] = ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
```

### 2. Add service methods to `project.service.ts`

```typescript
getWorkflows(projectId: string): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`/api/projects/${projectId}/workflows`);
}

getBacklog(projectId: string, type?: TicketType): Observable<BacklogItem[]> {
    let params = new HttpParams();
    if (type) {
        params = params.set('type', type);
    }
    return this.http.get<BacklogItem[]>(`/api/projects/${projectId}/backlog`, { params });
}
```

### 3. Update barrel export

Add `Workflow`, `BacklogItem`, `TicketType`, `WorkflowStatus`, `TICKET_TYPES`, `WORKFLOW_STATUSES` to `index.ts`.

### 4. Add i18n keys

Add to `en.json` and `fr.json`:

```json
"workflow.ticket-type.STORY": "Story" / "User Story",
"workflow.ticket-type.BUG": "Bug" / "Bug",
"workflow.ticket-type.TASK": "Task" / "Tâche",
"workflow.ticket-type.EPIC": "Epic" / "Épique",
"workflow.status.TO_DO": "To Do" / "À faire",
"workflow.status.IN_PROGRESS": "In Progress" / "En cours",
"workflow.status.IN_REVIEW": "In Review" / "En revue",
"workflow.status.DONE": "Done" / "Terminé"
```

### 5. Unit tests

Add to `project.service.spec.ts`:

| # | Test | Expected |
|---|------|----------|
| 1 | `getWorkflows()` calls `GET /api/projects/:id/workflows` | Correct URL, returns array |
| 2 | `getBacklog()` calls `GET /api/projects/:id/backlog` | Correct URL, returns array |
| 3 | `getBacklog()` with type filter appends `?type=EPIC` | Correct query param |

## Files Changed

| File | Change |
|------|--------|
| `src/app/core/project/project.models.ts` | Add `Workflow`, `BacklogItem`, type aliases, constants |
| `src/app/core/project/project.service.ts` | Add `getWorkflows()`, `getBacklog()` |
| `src/app/core/project/index.ts` | Update barrel export |
| `src/assets/i18n/en.json` | Add workflow/status i18n keys |
| `src/assets/i18n/fr.json` | Add workflow/status i18n keys |
| `src/app/core/project/project.service.spec.ts` | Add 3 tests |

## Acceptance Criteria

- [ ] `Workflow` and `BacklogItem` interfaces created with correct fields
- [ ] `TicketType` and `WorkflowStatus` type aliases exported
- [ ] `getWorkflows()` calls correct endpoint
- [ ] `getBacklog()` calls correct endpoint with optional type filter
- [ ] i18n keys added for ticket types and workflow statuses (EN + FR)
- [ ] Unit tests pass
- [ ] Build passes (`npx ng build --configuration=development`)
