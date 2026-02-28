# FEATURE-016: Ticket Linking — Stories Breakdown

## Overview

This feature adds ticket-to-ticket linking with typed relationships (e.g., "blocks", "is blocked by", "relates to"). It covers backend endpoints for link-type administration and link CRUD, frontend models/services, a "Linked Tickets" section on the ticket detail page, and role-based access control.

## Stories

| # | Story | Scope | Description |
|---|-------|-------|-------------|
| 1 | Link types seed data & CRUD endpoints | Backend | Seed default link types in db.json, add GET/POST/DELETE endpoints for link-type administration |
| 2 | Ticket links CRUD endpoints | Backend | Add POST/GET/DELETE endpoints for creating, listing, and removing links between tickets |
| 3 | Link models & service | Frontend | Add TypeScript interfaces and ProjectService methods for link types and ticket links |
| 4 | Linked tickets section (read-only) | Frontend | Display linked tickets in the ticket detail page with link type labels and ticket references |
| 5 | Add link dialog | Frontend | Dialog to create a new link: select link type, search/select target ticket, submit |
| 6 | Remove link & role gating | Frontend | Delete button per link (with confirmation), role-based visibility for add/remove actions |

## Dependencies

- STORY-001 → STORY-002 (link types must exist before links can be created)
- STORY-003 depends on STORY-001 + STORY-002 (models mirror backend contracts)
- STORY-004 depends on STORY-002 + STORY-003 (read links from API, display in UI)
- STORY-005 depends on STORY-001 + STORY-003 + STORY-004 (needs link types list + service + section exists)
- STORY-006 depends on STORY-004 + STORY-005 (adds delete + gating on top of existing UI)

## Data Model

### Link Types (global)
```json
{
    "id": "1",
    "name": "BLOCKS",
    "inward": "is blocked by",
    "outward": "blocks",
    "scope": "GLOBAL",
    "created_at": "2025-01-01T00:00:00.000Z"
}
```

### Ticket Links
```json
{
    "id": "1",
    "projectId": "1",
    "linkTypeId": "1",
    "sourceTicketNumber": 1,
    "targetTicketNumber": 3,
    "targetProjectId": "1",
    "created_by": "1",
    "created_at": "2025-06-01T10:00:00.000Z"
}
```
