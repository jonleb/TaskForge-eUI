# STORY-002: Frontend — Position Model & Service Method

## Objective

Add `position` field to the `BacklogItem` interface and add a `reorderBacklog()` method to `ProjectService`.

## Model Changes

Add to `BacklogItem` interface:
```typescript
position?: number;
```

Add new interface:
```typescript
interface ReorderPayload {
    items: { ticket_number: number; position: number }[];
}
```

## Service Method

```typescript
reorderBacklog(projectId: string, payload: ReorderPayload): Observable<{ updated: number }>
```

Calls `PUT /api/projects/:projectId/backlog/reorder`.

## Unit Tests (~2)

| # | Test |
|---|------|
| 1 | reorderBacklog calls PUT with correct URL and payload |
| 2 | reorderBacklog propagates error |

## Files Modified

| File | Modification |
|------|-------------|
| `src/app/core/project/project.models.ts` | Add `position` to BacklogItem, add ReorderPayload |
| `src/app/core/project/project.service.ts` | Add `reorderBacklog()` method |
| `src/app/core/project/project.service.spec.ts` | Add 2 unit tests |
| `src/app/core/project/index.ts` | Re-export ReorderPayload |
