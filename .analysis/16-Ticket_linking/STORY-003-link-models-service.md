# STORY-003: Frontend — Link Models & Service

## Objective

Add TypeScript interfaces for `LinkType` and `TicketLink`, and service methods in `ProjectService` for link types and ticket links CRUD.

## Interfaces

### LinkType
```typescript
interface LinkType {
    id: string;
    name: string;
    inward: string;
    outward: string;
    scope: string;
    created_at: string;
}
```

### TicketLink
```typescript
interface TicketLink {
    id: string;
    projectId: string;
    linkTypeId: string;
    sourceTicketNumber: number;
    targetTicketNumber: number;
    targetProjectId: string;
    created_by: string;
    created_at: string;
    linkTypeName?: string;
    linkLabel?: string;
}
```

### CreateTicketLinkPayload
```typescript
interface CreateTicketLinkPayload {
    linkTypeId: string;
    targetTicketNumber: number;
    targetProjectId?: string;
}
```

## Service Methods

- `getLinkTypes(): Observable<LinkType[]>`
- `getTicketLinks(projectId, ticketNumber): Observable<TicketLink[]>`
- `createTicketLink(projectId, ticketNumber, payload): Observable<TicketLink>`
- `deleteTicketLink(projectId, ticketNumber, linkId): Observable<void>`

## Unit Tests (~4)

| # | Test |
|---|------|
| 1 | getLinkTypes calls GET /api/link-types |
| 2 | getTicketLinks calls GET /api/projects/:id/backlog/:num/links |
| 3 | createTicketLink calls POST |
| 4 | deleteTicketLink calls DELETE |

## Files Modified

| File | Modification |
|------|-------------|
| `src/app/core/project/project.models.ts` | Add LinkType, TicketLink, CreateTicketLinkPayload |
| `src/app/core/project/project.service.ts` | Add 4 service methods |
| `src/app/core/project/project.service.spec.ts` | Add 4 unit tests |
| `src/app/core/project/index.ts` | Re-export new types |
