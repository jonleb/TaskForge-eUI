# STORY-002: Frontend — Workflow Service & Models Update

## Objective

Add the `updateWorkflow()` service method and any new TypeScript models needed to support workflow editing from the frontend.

## Existing Code

- `src/app/core/project/project.service.ts` — has `getWorkflows(projectId): Observable<Workflow[]>`. No update method.
- `src/app/core/project/project.models.ts` — has `Workflow`, `WorkflowStatus`, `TicketType` interfaces. `WorkflowStatus` is a union type `'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE'`.
- `src/app/core/project/project.service.spec.ts` — existing tests for all service methods.
- `src/app/core/project/index.ts` — barrel exports.

### Current Workflow Interface

```typescript
export type WorkflowStatus = 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

export interface Workflow {
    id: string;
    projectId: string;
    ticketType: TicketType;
    statuses: WorkflowStatus[];
    transitions: Record<WorkflowStatus, WorkflowStatus[]>;
    created_at: string;
}
```

### Problem: WorkflowStatus is a fixed union

The current `WorkflowStatus` type is a hardcoded union of 4 values. With workflow management, users can add custom statuses (e.g., `TESTING`, `BLOCKED`, `READY_FOR_DEPLOY`). The type needs to become `string` for the editable workflow model while keeping the existing type for backward compatibility in ticket display.

## Implementation Plan

### 1. Add `UpdateWorkflowPayload` interface in `project.models.ts`

```typescript
export interface UpdateWorkflowPayload {
    statuses: string[];
    transitions: Record<string, string[]>;
}
```

### 2. Extend `Workflow` interface for `updated_at`

Add optional `updated_at` field to the existing `Workflow` interface:

```typescript
export interface Workflow {
    id: string;
    projectId: string;
    ticketType: TicketType;
    statuses: WorkflowStatus[];
    transitions: Record<WorkflowStatus, WorkflowStatus[]>;
    created_at: string;
    updated_at?: string;  // NEW — set after PUT update
}
```

Note: We keep `WorkflowStatus` as the type for `statuses` and `transitions` in the `Workflow` interface because the existing read paths (ticket-detail, settings) rely on it. The `UpdateWorkflowPayload` uses `string` to allow custom statuses. When reading back, custom statuses will be cast. A future refactor could widen `WorkflowStatus` to `string`, but that's out of scope — the current 4 statuses cover the MVP.

### 3. Add `updateWorkflow()` method in `project.service.ts`

```typescript
updateWorkflow(projectId: string, workflowId: string, payload: UpdateWorkflowPayload): Observable<Workflow> {
    return this.http.put<Workflow>(`/api/projects/${projectId}/workflows/${workflowId}`, payload);
}
```

### 4. Export new types in `index.ts`

Add `UpdateWorkflowPayload` to barrel exports.

### 5. Unit tests in `project.service.spec.ts`

| # | Test |
|---|------|
| 1 | `updateWorkflow` sends correct HTTP PUT with payload |
| 2 | `updateWorkflow` returns updated Workflow |

## Files Modified

| File | Modification |
|------|----|
| `src/app/core/project/project.models.ts` | Add `UpdateWorkflowPayload`, add `updated_at?` to `Workflow` |
| `src/app/core/project/project.service.ts` | Add `updateWorkflow()` method |
| `src/app/core/project/project.service.spec.ts` | Add 2 tests |
| `src/app/core/project/index.ts` | Export `UpdateWorkflowPayload` |

## Acceptance Criteria

- [ ] `UpdateWorkflowPayload` interface defined with `statuses: string[]` and `transitions: Record<string, string[]>`
- [ ] `Workflow` interface has optional `updated_at` field
- [ ] `updateWorkflow(projectId, workflowId, payload)` sends HTTP PUT to correct URL
- [ ] New types exported from barrel
- [ ] Unit tests pass for new service method
- [ ] All existing frontend tests still pass: `npm run test:ci`
- [ ] Build passes: `npx ng build --configuration=development`
