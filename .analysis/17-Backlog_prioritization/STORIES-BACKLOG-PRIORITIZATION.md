# FEATURE-017: Backlog Prioritization — Stories Breakdown

## Overview

This feature adds explicit position-based ordering to backlog items so teams can prioritize work for sprint planning. It covers a backend reorder endpoint, frontend model/service updates, a drag-and-drop reorder UI on the backlog page, and role-based access control for reorder operations.

## Stories

| # | Story | Scope | Description |
|---|-------|-------|-------------|
| 1 | Position field & reorder endpoint | Backend | Add `position` field to backlog items, seed positions, add PUT reorder endpoint |
| 2 | Position model & service method | Frontend | Add `position` to BacklogItem interface, add `reorderBacklog()` service method |
| 3 | Priority sort & drag-and-drop reorder | Frontend | Add sort-by-position option (default), implement drag-and-drop reorder with keyboard support |
| 4 | Save/discard bar & role gating | Frontend | Dirty-state tracking, save/discard bar, role gating for reorder actions |

## Dependencies

- STORY-001 → STORY-002 (backend contract must exist before frontend models)
- STORY-002 → STORY-003 (models/service needed for UI)
- STORY-003 → STORY-004 (reorder UI must exist before save/discard bar)

## Data Model Changes

### BacklogItem — new field
```json
{
    "position": 1
}
```

### Reorder Endpoint
```
PUT /api/projects/:projectId/backlog/reorder
Body: { items: [{ ticket_number: number, position: number }] }
```
